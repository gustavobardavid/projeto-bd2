

async function fetchretiradas() {
    try {
        const response = await fetch('/retiradas');
        const retiradas = await response.json();
    
        const tableBody = document.querySelector('#orders-table tbody');
        retiradas.forEach(retirada => {
            const row = document.createElement('tr');
            
            const idCell = document.createElement('td');
            const id = retirada.id;
            idCell.textContent = id;
            row.appendChild(idCell)

            const nomeClienteCell = document.createElement('td');
            nomeClienteCell.textContent = retirada.nomeCliente;
            row.appendChild(nomeClienteCell);

            const cpfClienteCell = document.createElement('td');
            cpfClienteCell.textContent = retirada.cpfCliente;
            row.appendChild(cpfClienteCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = retirada.email;
            row.appendChild(emailCell);

            // const localizacaoCell = document.createElement('td');
            // localizacaoCell.textContent = `Latitude: ${retirada.localizacaoLoja.coordinates[1]}, Longitude: ${retirada.localizacaoLoja.coordinates[0]}`;
            // row.appendChild(localizacaoCell);
            const mapCell = document.createElement('td');
const mapButton = document.createElement('button');
mapButton.textContent = 'Ver no Mapa';
mapButton.classList.add('map-btn');
mapButton.setAttribute('data-lat', retirada.localizacaoLoja.coordinates[1]);
mapButton.setAttribute('data-lng', retirada.localizacaoLoja.coordinates[0]);

// Adicionar evento de clique ao botão de mapa
mapButton.addEventListener('click', () => {
    const lat = mapButton.getAttribute('data-lat');
    const lng = mapButton.getAttribute('data-lng');
    
    // Função para mostrar o mapa em um popup
    showMapPopup(lat, lng);
});

// Adicionar o botão à célula e a célula à linha
mapCell.appendChild(mapButton);
row.appendChild(mapCell);
            
            const itemCell = document.createElement('td');
            itemCell.textContent = retirada.item;
            row.appendChild(itemCell);

            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Ok';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', async () => {
                
                try {
                    const response = await fetch(`/retiradas/${id}/concluir`, {
                        method: 'PATCH',
                    });
            
                    if (response.ok) {
                        alert('Retirada marcada como concluída com sucesso!');
                        row.style.backgroundColor = 'lightgreen'; 
                    } else {
                        alert('Erro ao marcar retirada como concluída.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao marcar retirada como concluída.');
                }
            });
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-btn');
            
            deleteButton.addEventListener('click', async () => {
                try {
                    const response = await fetch(`/retiradas/${id}`, {
                        method: 'DELETE',
                    });
            
                    if (response.ok) {
                        row.remove();
                        alert('Retirada excluída com sucesso.');
                    } else {
                        alert('Erro ao excluir a retirada.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao excluir a retirada.');
                }
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar retiradas:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchretiradas);

function showMapPopup(lat, lng) {
    const popup = document.getElementById('map-popup');
    popup.style.display = 'block';

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    L.marker([lat, lng]).addTo(map).bindPopup(`<b>Sua Retirada será aqui</b>`)
    .openPopup();


    const closeButton = document.getElementById('close-map-popup');
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        map.remove();
    });
}
