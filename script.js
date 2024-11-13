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

    
    // document.getElementById('AddItem').addEventListener('click', AddItemView);

    let products=[];
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
            products = data;
            createCards(data);
        })
        .catch(error => console.error('Error fetching JSON file:', error));
    }
    loadDataAndCreateCards();
    // function Login()
    // {
    //     navbar.style.display = 'none';
    //     logDiv.innerHTML = `
    //     <div class="form-container">
    //         <h2>Login</h2>
    //         <form id="Details">
    //             <div class="form-group">
    //                 <label for="uname">User Name:</label>
    //                 <input type="text" id="uname" name="itemName" placeholder="Enter user name" required>
    //             </div>
    //             <div class="form-group">
    //                 <label for="password">Password:</label>
    //                 <input type="password" id="password" name="itemDescription" rows="4" placeholder="Enter password" required>
    //             </div>
    //             <div class="form-group">
    //                 <button type="submit" id="login">Submit</button>
    //             </div>
    //         </form>
    //     </div>`;

    //     const loginForm = document.getElementById('Log');
    //         loginForm.addEventListener('submit', (event) => 
    //         {
    //             event.preventDefault(); 

    //             uname = document.getElementById('uname').value;
    //             password = document.getElementById('password').value;
    //             if (uname === "" || password === "") 
    //             {
    //                 alert("Enter Details");
    //             } 
    //             else if (uname === "Admin" && password === "admin") 
    //             {
    //                 cardContainer.innerHTML = '';
    //                 createCards(); 
    //                 navbar.style.display = 'block';
    //                 document.getElementById('AddItem').style.display = 'block';
    //             } 
    //             else 
    //             {
    //                 cardContainer.innerHTML = '';
    //                 createCards(); 
    //                 navbar.style.display = 'block';
    //                 document.getElementById('AddItem').style.display = 'none';
                    
    //             }
    //         });
    // }

    //Login();

    $('#filterButton').on('click',()=>{
        const value = document.getElementById("filterInput").value.toLowerCase();
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const datas = data.filter(card => 
                card.location.toLowerCase().includes(value.toLowerCase())
            );
            createCards(datas);
        })
        
    });
       

    //createCards(data);

    $('#sort-price').on('change',()=>{
        const sortOrder = document.getElementById('sort-price').value;
        const sortedProducts = [...products].sort((a, b) => {
            return sortOrder === 'low-high' ? a.price - b.price : b.price - a.price;
        });
        createCards(sortedProducts);

    });

    $('#select-type').on('change',()=>
    {
        const type = document.getElementById('select-type').value;;
        const sortedProducts = products.filter(product=> 
            type === 'To Sell' ? product.category === 'To Sell' : product.category === 'To Let'
        );
        createCards(sortedProducts);

    });


    
    function createCards(data) {
        
        logDiv.style.display = 'none';
        detailView.style.display = 'none';
        cardContainer.innerHTML='';
        cardContainer.style.display = 'flex';
        data.forEach(card => {
            console.log(card.price);
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <img src="${card.featuredImage}" alt="${card.name}">
                <div class="details">
                    <p>${card.name}</p>
                    <p>${card.location}--${card.price}</p>
                    

                </div>
            `;

            
            cardElement.addEventListener('click', () => {
                showDetailView(card);
            });

            cardContainer.appendChild(cardElement);
        });
    }

    function showDetailView(card) {
        
        let images = card.otherMedia.map(images=>`<img src="${images.src}" alt="Additional Image">`).join('');
        detailContent.innerHTML = `
            <section class="property-details">
            <div class="container" >
                <div class="image-container">
                    <img id="desc_img" src="${card.featuredImage}" alt="${card.name}" class="featured-image">
                    <div class="additional-images">
                        ${images}
                    </div>
                </div>
                <div class="details-container">
                    <h2 style="text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);color: #333333;text-transform: uppercase;border-radius: 50px;">${card.name}</h2><br>
                    <h3>Location: ${card.location}</h3>
                    <h3>Price: ${card.price}</h3>
                    <p>Bedrooms: ${card.bedrooms}</p>
                    <p>Bathrooms: ${card.bathrooms}</p>
                    <p>Type: ${card.type}</p>
                    <p>Category: ${card.category}</p>
                    <p>BER Rating: ${card.berRating}</p>
                    <p class="description">${card.description}</p>
                    
                </div>
            </div>
        </section>
        `;
        // document.getElementById('img').style.display='none';
        document.getElementById("imgdiv").style.display='none';
        detailContent.style.display = 'block';
        heading.style.display='none';
        filter.style.display='none';
        logDiv.style.display = 'none';
        cardContainer.style.display = 'none';
        detailView.style.display = 'block';
        adding.style.display='none';
        document.getElementById('btns').style.display='block';
    }

    // btnlogout.addEventListener('click',()=>{
    //     logDiv.style.display = 'block';
    //     cardContainer.style.display = 'none';
    //     detailView.style.display='none';
    //     detailContent.style.display = 'none';
    //     adding.style.display ='none';
    //     navbar.style.display = 'none';
    // });

    
    $('#Home').on('click',()=>{
        logDiv.style.display = 'none';
        cardContainer.style.display = 'flex';
        detailView.style.display='none';
        detailContent.style.display = 'none';
        adding.style.display ='none';
        heading.style.display='block';
        document.getElementById("imgdiv").style.display='block';
        filter.style.display='block';
        // document.getElementById('img').style.display='block';
        document.getElementById('btns').style.display='none';
    });

    $('#btncancel').on('click',()=>{
        logDiv.style.display = 'none';
        cardContainer.style.display = 'flex';
        detailView.style.display='none';
        detailContent.style.display = 'none';
        adding.style.display ='none';
        document.getElementById("imgdiv").style.display='block';
        heading.style.display='block';
        filter.style.display='block';
        // document.getElementById('img').style.display='block';
        document.getElementById('btns').style.display='none';
    });
    
    // backBtn.addEventListener('click', () => {
    //     logDiv.style.display = 'none';
    //     cardContainer.style.display = 'flex';
    //     detailView.style.display = 'none';
    //     detailContent.style.display = 'block';
    //     adding.style.display ='none';
    // });

    $('#submitDateTime').on('click',()=>{
        const date = document.getElementById("dateInput").value;
        const time1 = document.getElementById("timeInput").value;
        const name = document.getElementById("name").value;
        const email =document.getElementById("email").value;
        const mobile = document.getElementById("mob").value;
        document.getElementById("content1").style.display = 'none';
        document.getElementById("name1").innerHTML = name;
        document.getElementById("email1").innerHTML = email;
        document.getElementById("mobile1").innerHTML = mobile;
        document.getElementById("datelabel").innerHTML= date;
        document.getElementById("timelable").innerHTML = time1;
        document.getElementById("content2").style.display = 'block';
    });

    $('#btnview').on('click',()=>{
        document.getElementById("dateTimeModal").style.display='block';
    });
    
    $('#close').on('click',()=>{
        document.getElementById("dateTimeModal").style.display='none';
    });

    $('#close1').on('click',()=>{
        document.getElementById("dateTimeModal").style.display='none';
    });

    // function AddItemView()
    // {
    //     logDiv.style.display = 'none';
    //     cardContainer.style.display = 'none';
    //     detailContent.style.display = 'none';
    //     detailView.style.display='block';
    //     adding.style.display='block';
    //     adding.innerHTML=`
    //     <div class="form-container">
    //         <h2>Enter Details</h2>
    //         <form id="Details">
    //             <div class="form-group">
    //                 <label for="itemName">Property Name:</label>
    //                 <input type="text" id="itemName" name="itemName" placeholder="Enter property name" required>
    //             </div>
    //             <div class="form-group">
    //                 <label for="itemImage">Upload Image:</label>
    //                 <input type="file" id="itemImage" name="itemImage" accept="image/*" required>
    //             </div>
    //             <div class="form-group">
    //                 <label for="itemDescription">Description:</label>
    //                 <textarea id="itemDescription" name="itemDescription" rows="4" placeholder="Enter property description" required></textarea>
    //             </div>
    //             <div class="form-group">
    //                 <button type="submit" id="btn">Submit</button>
    //             </div>
    //         </form>
    //     </div>`;
    // }
});


