async function carregarLojas() {
    try {
        const response = await fetch('/lojas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const lojas = await response.json();
        return lojas;
    } catch (error) {
        console.error('Erro ao carregar lojas:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const lojas = await carregarLojas();
    
    let center = [lojas[0].location.coordinates[1], lojas[0].location.coordinates[0]];

    var map = L.map('map').setView(center, 10);
    
    let marker = L.marker(center).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    const storeSelect = document.getElementById('store');

    lojas.forEach(loja => {
        const option = document.createElement('option');
        const marker = L.marker([loja.location.coordinates[1], loja.location.coordinates[0]])
        .addTo(map)
        .bindPopup(`<b>${loja.name}</b><br>${loja.description}`)
        .openPopup();
        
        marker.on('click', () => {
            storeSelect.innerHTML = '';
            option.value = loja.name;
            option.textContent = loja.name;
            storeSelect.appendChild(option);
        });
    });    
});
