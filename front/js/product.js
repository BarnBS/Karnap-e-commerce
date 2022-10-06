const pageTitle = document.querySelector(".pageTitle");

const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productImage = document.querySelector(".item__img");
const productDescription = document.querySelector("#description");
const productColors = document.querySelector("#colors");
const quantitySelector = document.querySelector("#quantity");

const addButton = document.querySelector("#addToCart")

let currentUrl;
let urlProduct;

let cartStorage = [];

/* ===================================================================================================================
Request the API's datas and display the right product in the product page thanks to the product's id and the page's id
===================================================================================================================== */
function getProductPage(){

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((product) => {

            //Get the url of the current page.
            currentUrl = window.location.href;

            //Generate url that each product page should have.
            for (let i = 0 ; i < 8 ; i++) {        

                urlProduct = `file:///C:/Users/barna/Desktop/P5-Dev-Web-Kanap/front/html/product.html?id=${product[i]._id}`;

                // Compare current url with the url that each product page should have.
                // If current page's url = url of product page, then display the right data.
                if (currentUrl == urlProduct){     

                    pageTitle.innerHTML = `${product[i].name}`;
                    productName.innerHTML=`${product[i].name}`;
                    productPrice.innerHTML=`${product[i].price}`;
                    productImage.innerHTML =`<img src="${product[i].imageUrl}" alt=${product[i].altTxt}>`;
                    productDescription.innerHTML =`${product[i].description}`;

                    // product[i].colors is an array and has to be browsed so each color is in a separated choice option
                    for (let j = 0; j<3 ; j++){    //
                        productColors.innerHTML += `<option value="${product[i].colors[j]}">${product[i].colors[j]}</option>`
                    }
                }
            }
        })
        .catch((err) => console.log(err));

}


/* ============================================
Add selected product in the cart which is an array
================================================ */

function addToCart() {

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
        // We browse the list of products
        for (let i = 0 ; i < 8 ; i++) {
            // If a product of the list is displayed on the page, then we can add it to the cart.
            if (productName.textContent == product[i].name) {
                
                let productPicked = {
                    name : product[i].name,
                    id : product[i]._id,
                    color : productColors.value,
                    quantity : quantitySelector.value,
                    price : product[i].price,
                    img : product[i].imageUrl,
                    alt : product[i].altTxt
                }

                //If we have not selected a color OR a quantity, then we cannot add the item to the cart. 
                if (productColors.value == "" || productColors.value == "undefined" || quantitySelector.value == 0){
                    return alert("Veuillez saisir une couleur et une quantité avant d'ajouter au panier.")
                } else{ 
                    //If the local storage is empty, then add the selected product to the cart and store is in localStorage.
                    if (!localStorage.getItem("cartStorage")) {
                        cartStorage.push(productPicked);
                        cartString = JSON.stringify(cartStorage);
                        localStorage.setItem("cartStorage",cartString);
                    // Else we get back what's in local storage then add the new item.
                    }else {     
                        cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
                        let foundProductId = cartStorage.find(p => p.id == productPicked.id)
                        let foundProductColor = cartStorage.find(p => p.color == productPicked.color)
                            //If an item is already in the cart, then we update the quantity.
                            if (foundProductId && foundProductColor){
                                for (let j = 0; j < cartStorage.length; j++) {
                                    if (cartStorage[j].id == productPicked.id && cartStorage[j].color == productPicked.color){
                                        cartStorage[j].quantity = Number(cartStorage[j].quantity)
                                        cartStorage[j].quantity += Number(productPicked.quantity);
                                    }
                                }
                            //If it's a new item, then we add it simply to the cart.
                            }else {
                                cartStorage.push(productPicked);
                            }
                        //Finally, the whole cart is stored in localStorage.
                        cartString = JSON.stringify(cartStorage);
                        localStorage.setItem("cartStorage",cartString);
                        cartStorage = [];
                    }
                }
            }
        }
    })     
    .catch((err) => console.log(err));
}


getProductPage()
addButton.addEventListener("click",addToCart)








// for (let j = 0; j < cartStorage.length; j++) {
//     cartStorage[j][2] = Number(cartStorage[j][2]);
//     // console.log(cartStorage);
//     // console.log(cartStorage[j]);
//     if (cartStorage[j][0]!=product[i]._id || cartStorage[j][1]  != productColors.value) {
//         cartStorage.push(productPicked);
//         // console.log(`cartStorage si push du nouveau produit = ${cartStorage}`);
//    }
//    else{
//         cartStorage[j][2] += Number(quantitySelector.value);
//         // console.log(`cartStorage si concat quantité = ${cartStorage}`);
//     }