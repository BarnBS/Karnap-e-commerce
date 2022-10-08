const cartItems = document.querySelector("#cart__items");

/* ==========================================
Display the items in localStorage on the page
=========================================== */
function displayCart() {
    
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {

        let cart = JSON.parse(localStorage.getItem("cartStorage"));
        //For each product in the cart, display according to the html model.
        for (let i = 0; i < cart.length; i++) {
            cartItems.innerHTML += `
            <article class="cart__item" data-id=${cart[i].id} data-color=${cart[i].color}>
                <div class="cart__item__img">
                    <img src=${cart[i].img} alt=${cart[i].altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${cart[i].name}</h2>
                        <p class="itemColor">${cart[i].color}</p>
                        <p>${cart[i].price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[i].quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`
        }
    })
    .catch((err) => console.log(err));
}
//===================================================================================

/* ================================================
Change the quantity of each product that was picked
================================================= */
function changeProductQuantity() {

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {

        const allItems = document.querySelectorAll(`.cart__item`);
        let cart = JSON.parse(localStorage.getItem("cartStorage"));
        
        Array.from(allItems) //Node list => array conversion
        //For each item in cart Page, get the right input and add it a 'change' event
        .forEach ( item => {
            itemQuantity = item.querySelector('input[name = "itemQuantity"]');
            itemQuantity.addEventListener("change", (event) => {
                const article = event.target.closest(".cart__item");
                // For each product in cartStorage, if the targeted product is the same item as the one displayed on the page, then if we change its quantity, it's updated in the cartStorage
                cart.forEach(storedProduct => {
                    if(storedProduct.id == article.dataset.id && storedProduct.color == article.dataset.color){
                        storedProduct.quantity = event.target.value;
                    }
                });
                localStorage.setItem("cartStorage",JSON.stringify(cart));        
            })
        })
    })
    .catch((err) => console.log(err));
}

displayCart()
changeProductQuantity()