document.addEventListener("DOMContentLoaded", () => {
    //let cardsData = JSON.parse(localStorage.getItem('cardsData')) || [];
    const cardContainer = document.getElementById('cardContainer');
    const detailView = document.getElementById('detailView');
    const detailContent = document.getElementById('detailContent');
    const backBtn = document.getElementById('backBtn');
    const btnhome = document.getElementById('Home');
    const adding = document.getElementById('Additem');
    const logDiv = document.getElementById('Log');
    const btnlogout = document.getElementById('Logout');
    const navbar = document.getElementById('nav');
    const filter = document.getElementById('filter');
    const heading = document.getElementById('heading');
    var uname = "";
    var password = "";

    const data = [
        {
            "id": 1,
            "name": "Item 1",
            "image": "image1.jpg",
            "description": "This is the description for Item 1. It's a more detailed explanation of what the item is."
        },
        {
            "id": 2,
            "name": "Item 2",
            "image": "image2.jpg",
            "description": "This is the description for Item 2. Learn more about the features and characteristics."
        },
        {
            "id": 3,
            "name": "Item 3",
            "image": "image3.jpg",
            "description": "This is the description for Item 3. It provides further insights and details."
        },
        {
            "id": 4,
            "name": "Item 1",
            "image": "image1.jpg",
            "description": "This is the description for Item 1. It's a more detailed explanation of what the item is."
        },
        {
            "id": 5,
            "name": "Item 2",
            "image": "image2.jpg",
            "description": "This is the description for Item 2. Learn more about the features and characteristics."
        },
        {
            "id": 6,
            "name": "Item 3",
            "image": "image3.jpg",
            "description": "This is the description for Item 3. It provides further insights and details."
        }
          
    ]

    
    document.getElementById('AddItem').addEventListener('click', AddItemView);
    function loadDataAndCreateCards()
    {
        fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createCards(data);
        })
        .catch(error => console.error('Error fetching JSON file:', error));
    }
    //loadDataAndCreateCards();
    function Login()
    {
        navbar.style.display = 'none';
        logDiv.innerHTML = `
        <div class="form-container">
            <h2>Login</h2>
            <form id="Details">
                <div class="form-group">
                    <label for="uname">User Name:</label>
                    <input type="text" id="uname" name="itemName" placeholder="Enter user name" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="itemDescription" rows="4" placeholder="Enter password" required>
                </div>
                <div class="form-group">
                    <button type="submit" id="login">Submit</button>
                </div>
            </form>
        </div>`;

        const loginForm = document.getElementById('Log');
            loginForm.addEventListener('submit', (event) => 
            {
                event.preventDefault(); 

                uname = document.getElementById('uname').value;
                password = document.getElementById('password').value;
                if (uname === "" || password === "") 
                {
                    alert("Enter Details");
                } 
                else if (uname === "Admin" && password === "admin") 
                {
                    cardContainer.innerHTML = '';
                    createCards(); 
                    navbar.style.display = 'block';
                    document.getElementById('AddItem').style.display = 'block';
                } 
                else 
                {
                    cardContainer.innerHTML = '';
                    createCards(); 
                    navbar.style.display = 'block';
                    document.getElementById('AddItem').style.display = 'none';
                    
                }
            });
    }

    //Login();

    document.getElementById("filterButton").addEventListener('click',()=>{
        const value = document.getElementById("filterInput").value.toLowerCase();
        const datas = data.filter(card=>card.name.toLowerCase().includes(value))
        createCards(datas);
        });
       

    createCards(data);


    
    function createCards(data) {
        logDiv.style.display = 'none';
        detailView.style.display = 'none';
        cardContainer.innerHTML='';
        cardContainer.style.display = 'flex';
        data.forEach(card => {
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
            <button id="delete">Delete</button>
        `;
        if(uname=="Admin"&&password=="admin")
        {
            document.getElementById('delete').style.display = 'block';
        }
        else
        {
            document.getElementById('delete').style.display = 'none';
        }
        detailContent.style.display = 'block';
        heading.style.display='none';
        filter.style.display='none';
        logDiv.style.display = 'none';
        cardContainer.style.display = 'none';
        detailView.style.display = 'block';
        adding.style.display='none';
        document.getElementById('btns').style.display='block';
    }

    btnlogout.addEventListener('click',()=>{
        logDiv.style.display = 'block';
        cardContainer.style.display = 'none';
        detailView.style.display='none';
        detailContent.style.display = 'none';
        adding.style.display ='none';
        navbar.style.display = 'none';
    });

    
    btnhome.addEventListener('click',()=>{
        logDiv.style.display = 'none';
        cardContainer.style.display = 'flex';
        detailView.style.display='none';
        detailContent.style.display = 'none';
        adding.style.display ='none';
        heading.style.display='block';
        filter.style.display='block';
        document.getElementById('btns').style.display='none';
    });

    document.getElementById('btncancel').addEventListener('click',()=>{
        logDiv.style.display = 'none';
        cardContainer.style.display = 'flex';
        detailView.style.display='none';
        detailContent.style.display = 'none';
        adding.style.display ='none';
        heading.style.display='block';
        filter.style.display='block';
        document.getElementById('btns').style.display='none';
    });
    
    // backBtn.addEventListener('click', () => {
    //     logDiv.style.display = 'none';
    //     cardContainer.style.display = 'flex';
    //     detailView.style.display = 'none';
    //     detailContent.style.display = 'block';
    //     adding.style.display ='none';
    // });

    document.getElementById("submitDateTime").addEventListener('click',()=>{
        const date = document.getElementById("dateInput").value;
        const time1 = document.getElementById("timeInput").value;
        document.getElementById("content1").style.display = 'none';
        document.getElementById("datelabel").innerHTML= date;
        document.getElementById("timelable").innerHTML = time1;
        document.getElementById("content2").style.display = 'block';
    });

    document.getElementById("btnview").addEventListener('click',()=>{
        document.getElementById("dateTimeModal").style.display='block';
    });
    
    document.getElementById("close").addEventListener('click',()=>{
        document.getElementById("dateTimeModal").style.display='none';
    });

    document.getElementById("close1").addEventListener('click',()=>{
        document.getElementById("dateTimeModal").style.display='none';
    });

    function AddItemView()
    {
        logDiv.style.display = 'none';
        cardContainer.style.display = 'none';
        detailContent.style.display = 'none';
        detailView.style.display='block';
        adding.style.display='block';
        adding.innerHTML=`
        <div class="form-container">
            <h2>Enter Details</h2>
            <form id="Details">
                <div class="form-group">
                    <label for="itemName">Property Name:</label>
                    <input type="text" id="itemName" name="itemName" placeholder="Enter property name" required>
                </div>
                <div class="form-group">
                    <label for="itemImage">Upload Image:</label>
                    <input type="file" id="itemImage" name="itemImage" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label for="itemDescription">Description:</label>
                    <textarea id="itemDescription" name="itemDescription" rows="4" placeholder="Enter property description" required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" id="btn">Submit</button>
                </div>
            </form>
        </div>`;
    }
});


