const pageTitle = document.querySelector(".pageTitle");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productImage = document.querySelector(".item__img");
const productDescription = document.querySelector("#description");
const productColors = document.querySelector("#colors");

/* ===================================================================================================================
Request the API's datas and display the right product in the product page thanks to the product's id and the page's id
===================================================================================================================== */
function getProductPage(){

    fetch("http://localhost:3000/api/products")

        .then((res) => res.json())
        .then((product) => {

             //Get the url of the current page.
            let currentUrl = window.location.href;

            //Generate url that each product page should have.
            for (let i = 0 ; i < 8 ; i++) {        

                let urlProduct = `file:///C:/Users/barna/Desktop/P5-Dev-Web-Kanap/front/html/product.html?id=${product[i]._id}`;

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

getProductPage()