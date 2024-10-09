document.addEventListener("DOMContentLoaded", () => {
    let cardsData = JSON.parse(localStorage.getItem('cardsData')) || [];
    const cardContainer = document.getElementById('cardContainer');
    const detailView = document.getElementById('detailView');
    const detailContent = document.getElementById('detailContent');
    const backBtn = document.getElementById('backBtn');

    
    function createCards() {
        cardsData.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <div class="details">
                    <h3>${card.name}</h3>
                </div>
            `;

            
            cardElement.addEventListener('click', () => {
                showDetailView(card);
            });

            cardContainer.appendChild(cardElement);
        });
    }

    function showDetailView(card) {
        detailContent.innerHTML = `
            <h2>${card.name}</h2>
            <img src="${card.image}" alt="${card.name}">
            <p>${card.description}</p>
        `;
        cardContainer.style.display = 'none';
        detailView.style.display = 'block';
    }

    
    backBtn.addEventListener('click', () => {
        cardContainer.style.display = 'flex';
        detailView.style.display = 'none';
    });

    createCards();
});


