document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([locations[0].lat, locations[0].lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    locations.forEach(function(location) {
        L.marker([location.lat, location.lon]).addTo(map)
            .bindPopup(`<b>${location.name}</b><br>${location.description}`)
            .openPopup();
    });

    document.getElementById('location-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const cep = document.getElementById('cep').value;
        const location = await fetchLocationByCep(cep);

        if (location) {
            const smallMap = L.map('small-map', {
                center: [location.lat, location.lon],
                zoom: 14
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(smallMap);

            L.marker([location.lat, location.lon])
                .bindPopup('Sua Localização')
                .addTo(smallMap);

            const closestStore = getClosestStore(location.lat, location.lon);
            L.marker([closestStore.lat, closestStore.lon])
                .bindPopup(`Loja mais próxima: ${closestStore.name}`)
                .addTo(smallMap);

            // Exibe a div do mapa
            document.getElementById('small-map').style.display = 'block';
        }
    });

    async function fetchLocationByCep(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data && data.localidade) {
                const address = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
                const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
                const geoData = await geoResponse.json();
                if (geoData.length > 0) {
                    return {
                        lat: parseFloat(geoData[0].lat),
                        lon: parseFloat(geoData[0].lon)
                    };
                }
            }
        } catch (error) {
            console.error('Erro ao buscar localização:', error);
        }
        return null;
    }

    function getClosestStore(lat, lon) {
        let closest = stores[0];
        let minDistance = Infinity;

        stores.forEach(store => {
            const distance = getDistance(lat, lon, store.lat, store.lon);
            if (distance < minDistance) {
                minDistance = distance;
                closest = store;
            }
        });

        return closest;
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distância em km
    }

    function toRad(deg) {
        return deg * (Math.PI / 180);
    }
});

