const pageTitle = document.querySelector(".pageTitle");

const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productImage = document.querySelector(".item__img");
const productDescription = document.querySelector("#description");
const productColors = document.querySelector("#colors");

const addButton = document.querySelector("#addToCart")

let currentUrl;
let urlProduct;

let storageString;
let productStorage = [];

let stringFromStorage;
let productParsed;
let cartStorage = [];

let cartToParse;

let cart = [];

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


/* ===========================================
Save the right product in the local storage
============================================ */

function saveProducts () {

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {

        for (let i = 0 ; i < 8 ; i++) {

            if (productName.textContent == product[i].name) {
                productStorage.push(product[i]);
                storageString = JSON.stringify(productStorage);
            }
        }
        localStorage.setItem("storageString", storageString);
    })          
    .catch((err) => console.log(err));
}

/* ======================================================================================
Get the selected products to add it to the cart array then store that cart array in local
====================================================================================== */

function getProducts () {

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
        // If "cartStorage" already exists, then get it back.
        // If product A is stored, then get it so that we add new product to the storage.
        if(localStorage.getItem("cartStorage")){
            cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
        }

        stringFromStorage = localStorage.getItem("storageString");
        productParsed = JSON.parse(stringFromStorage);
        cartStorage.push(productParsed);
        localStorage.setItem("cartStorage", JSON.stringify(cartStorage));
        productStorage = [];
    })
    .catch((err) => console.log(err));
}

/* ===================================================================================================================

===================================================================================================================== */

function addToCart() {
    
    saveProducts();
    getProducts();

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {
        cartToParse = localStorage.getItem("cartStorage");
        cart = JSON.parse(cartToParse);
        // localStorage.setItem("cart", JSON.stringify(cart));
    })
    .catch((err) => console.log(err));
}




getProductPage()

addButton.addEventListener("click",addToCart)