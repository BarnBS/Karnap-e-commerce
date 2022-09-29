const productsDisplay = document.querySelector(".items");

/* ===========================================================
Request the API's datas and display the products in Index.html
============================================================ */

function displayProducts() {

    //Request the API's data
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((product) => {
            //Display the products in the section id #items in index.html
            for (let i = 0; i < 8; i++){
                productsDisplay.innerHTML += `
                <a href="./product.html?id=${product[i]._id}">
                    <article>
                    <img src=${product[i].imageUrl} alt=${product[i].altTxt}>
                    <h3 class="productName">${product[i].name}</h3>
                    <p class="productDescription">${product[i].description}</p>
                    </article>
                </a>
                `
            }
        })
        .catch((err) => console.log(err));
}

displayProducts();

