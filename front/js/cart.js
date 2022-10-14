const cartItems = document.querySelector("#cart__items");
const totalPrice = document.querySelector("#totalPrice");
const totalQuantity = document.querySelector("#totalQuantity");

const form = document.querySelector(".cart__order__form");

const firstNameId = document.querySelector("#firstName");
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

const lastNameId = document.querySelector("#lastName");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

const addressId = document.querySelector("#address");
const addressErrorMsg = document.querySelector("#addressErrorMsg");

const cityId = document.querySelector("#city");
const cityErrorMsg = document.querySelector("#cityErrorMsg");

const emailId = document.querySelector("#email");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

const orderBtn = document.querySelector("#order");
let contact = new Object();

/* ===============================
Get the cart from the localStorage
================================ */
function getCart() {
    let cart = [];
    if (localStorage.getItem("cartStorage") != null) {
        cart = JSON.parse(localStorage.getItem("cartStorage"));
    }
    return cart;
}

/* ==========================================
Display the items in localStorage on the page
=========================================== */
function displayCart() {
    let cart = getCart();
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
}
//===================================================================================

/* ================================================
Change the quantity of each product that was picked
================================================= */
function changeProductQuantity() {
    const allItems = document.querySelectorAll(`.cart__item`);
    let cart = getCart();
        
    Array.from(allItems) //Node list => array conversion
    //For each item in cart Page, get the right input and add it a 'change' event
    .forEach ( item => {
        itemQuantity = item.querySelector('input[name = "itemQuantity"]');
        itemQuantity.addEventListener("change", (product) => {
            const article = product.target.closest(".cart__item");
            // For each product in cartStorage, if the targeted product is the same item as the one displayed on the page, then if we change its quantity, it's updated in the cartStorage
            cart.forEach(storedProduct => {
                if(storedProduct.id == article.dataset.id && storedProduct.color == article.dataset.color){
                    storedProduct.quantity = product.target.value;
                }
            })
            localStorage.setItem("cartStorage",JSON.stringify(cart));
            window.location.reload();      
        })
    })
}

/* =====================
Delete article from cart
====================== */
function deleteProduct () {
    const allItems = document.querySelectorAll(`.cart__item`);

    Array.from(allItems) //Node list => array conversion
    //For each item in cart Page, get the right input and add it a 'change' event
    .forEach ( item => {
        deleteBtn = item.querySelector('.deleteItem');
        deleteBtn.addEventListener("click", (product) => {
            const article = product.target.closest(".cart__item");
            // For each product in cartStorage, if the targeted product is the same item as the one displayed on the page,then if we change its quantity, it's updated in the cartStorage
            cart = getCart();
            cart.forEach(storedProduct => {
                if(storedProduct.id == article.dataset.id && storedProduct.color == article.dataset.color){
                    cart.splice(cart.indexOf(storedProduct),1)
                    localStorage.setItem("cartStorage",JSON.stringify(cart));
                    window.location.reload();
                }  
            })
        })
    })
}

/* ===============
Total price to pay
=============== */
function totalCost () {
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
        cart = getCart();
        let quantity = 0;
        let cost = 0;
        cart.forEach ( item => {
            // For security reasons, we use the price given from the API and not the localStorage
            quantity +=  Number(item.quantity);
            product.forEach (product => { 
                if (product._id == item.id) {
                    cost += Number(item.quantity) * Number(product.price);
                }
            })
        })
        totalQuantity.textContent = `${quantity}`
        totalPrice.textContent = `${cost}`
    })
    .catch((err) => console.log(err));
}
/* =============================================================================================================
=======================================================FORM=====================================================
============================================================================================================== */


/* =========================================
Test if the given input in the form is valid
========================================== */
function validationForm(stringId, regex, idErrorMsg, errorMsg) {
    let stringToTest = stringId.value;
        if (regex.test(stringToTest) == false){
            idErrorMsg.textContent = errorMsg;
        } else {
            idErrorMsg.textContent = "";
            return true;
        }
}

/* ======================
Test if each item is valid
======================= */
function userValidation () {
    validationForm(firstNameId,
       /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,firstNameErrorMsg,
       `Le prénom doit contenir uniquement des lettres, des espaces ou '.`);

    validationForm(lastNameId,
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        lastNameErrorMsg,
        `Le nom doit contenir uniquement des lettres, des espaces ou '.`);

    validationForm(addressId,
        /^[rR]ue.+[a-zA-Zéè'-].+[0-9]{5}|[cC]hemin.+[a-zA-Zéè'-].+[0-9]{5}|[aA]venue.+[a-zA-Zéè'-].+[0-9]{5}$/gmu,
        addressErrorMsg,
        `L'adress doit contenir rue/avenue/chemin + nom de la rue + code Postal complet de 5 chiffres.`);

    validationForm(cityId,
        /^.+[a-zA-Zéèëê'-]$/gmu,
        cityErrorMsg,
        `Le nom de la ville ne nécessite pas de majuscules. Accents, ', - et espaces sont autorisés.`);

    validationForm(emailId,
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gmu,
        emailErrorMsg,
        `L'adresse email doit être de la forme "nomDeService@adresseDuServeur". Exemples: nomPrenom@gmail.com ou bonjour@orange.fr`);
}


/* ======================================================================
Allow the user to write his informations in the form and see its validity
====================================================================== */
function changeForm () {
    const formElements = document.querySelectorAll(".cart__order__form__question")
    formElements.forEach ( input => {
        formInput = input.querySelector("input")
        formInput.addEventListener ("change", () => {
            userValidation();
        })
    })
}

/* ============================================================
If the whole form application is correct then allow to place an order
============================================================= */
function placeAnOrder () {
    if (
        validationForm(firstNameId,
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,firstNameErrorMsg,
            `Le prénom doit contenir uniquement des lettres, des espaces ou '.`) 
            &&
         validationForm(lastNameId,
             /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
             lastNameErrorMsg,
             `Le nom doit contenir uniquement des lettres, des espaces ou '.`) 
             &&
         validationForm(addressId,
             /^[rR]ue.+[a-zA-Zéè'-].+[0-9]{5}|[cC]hemin.+[a-zA-Zéè'-].+[0-9]{5}|[aA]venue.+[a-zA-Zéè'-].+[0-9]{5}$/gmu,
             addressErrorMsg,
             `L'adress doit contenir rue/avenue/chemin + nom de la rue + code Postal complet de 5 chiffres.`)
             &&
         validationForm(cityId,
             /^.+[a-zA-Zéèëê'-]$/gmu,
             cityErrorMsg,
             `Le nom de la ville ne nécessite pas de majuscules. Accents, ', - et espaces sont autorisés.`)
             &&
         validationForm(emailId,
             /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gmu,
             emailErrorMsg,
             `L'adresse email doit être de la forme "nomDeService@adresseDuServeur". Exemples: nomPrenom@gmail.com ou bonjour@orange.fr`)
    ) {
        let cart = getCart();
        let arrayProducts = [];
        cart.forEach (element => {arrayProducts.push(element.id)});

        let fetchOptions = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            }, 
            body: JSON.stringify({
                contact : {
                    firstName : `${firstNameId.value}`,
                    lastName : `${lastNameId.value}`,
                    address : `${addressId.value}`,
                    city : `${cityId.value}`,
                    email : `${emailId.value}`,
                },
                products : arrayProducts
            }),
        }

        fetch("http://localhost:3000/api/products/order", fetchOptions)
            .then((res) => res.json())
            .then((contact) => {location.href = `../html/confirmation.html?id=${contact.orderId}`})

    } else{
        alert("Veuillez remplir tous les champs du formulaire sans erreur.")
    }
}
        
displayCart()
changeProductQuantity()
deleteProduct ()
totalCost ()

changeForm ();

orderBtn.addEventListener("click", (event) => {
    event.preventDefault();
    placeAnOrder ();
})