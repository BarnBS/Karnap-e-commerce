const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productImage = document.querySelector(".item__img");
const productDescription = document.querySelector("#description");
const productColors = document.querySelector("#colors");

function getProductPage(){

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((product) => {

            let actualUrl = window.location.href;

            for (let i = 0 ; i < 8 ; i++) {

                let urlProduct = `file:///C:/Users/barna/Desktop/P5-Dev-Web-Kanap/front/html/product.html?id=${product[i]._id}`;

                if (actualUrl == urlProduct){

                    productName.innerHTML=`${product[i].name}`;
                    productPrice.innerHTML=`${product[i].price}`;
                    productImage.innerHTML =`<img src="${product[i].imageUrl}" alt=${product[i].altTxt}>`;
                    productDescription.innerHTML =`${product[i].description}`;
                    for (let j = 0; j<3 ; j++){
                        productColors.innerHTML += `<option value="${product[i].colors[j]}">${product[i].colors[j]}</option>`
                    }
                }
            }
        })
        .catch((err) => console.log(err));

}

getProductPage()