
function addDetails(details) {
    let cardsData = JSON.parse(localStorage.getItem('cardsData')) || [];
    const newId = cardsData.length > 0 ? Math.max(...cardsData.map(p => p.id)) + 1 : 1;
    details.id = newId;
    cardsData.push(details);
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Details').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('itemName').value;
        const desc = document.getElementById('itemDescription').value;
        const itemImageInput = document.getElementById('itemImage');

        if (itemImageInput.files.length === 0) {
            alert("Please select an image!");
            return;
        }

        const file = itemImageInput.files[0]; 

        const reader = new FileReader();

        reader.onload = function() {
            const detail = {
                name: name,
                image: reader.result, 
                description: desc

            };

            addDetails(detail);

            document.getElementById('Details').reset();
        };

        reader.readAsDataURL(file);
    });
});
