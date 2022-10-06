function saveProducts () {

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((product) => {

        let productPicked = {
            id : product[i]._id,
            color : productColors.value,
            quantity : quantitySelector.value,
        }

        for (let i = 0 ; i < 8 ; i++) {

            if (productName.textContent == product[i].name) {

                if (productPicked.color == "" || productPicked.quantity == 0){
                    return alert("Veuillez saisir une couleur et une quantité avant d'ajouter au panier.")

                } else{

                    if (localStorage.getItem("cartStorage")) {
                        cartStorage = JSON.parse(localStorage.getItem("cartStorage"));

                        for (let i = 0; i < cartStorage.length; i++){
                            let element = cartStorage[i];
                            // Element[0] = id ; Element[1] = color ; Element[2] = quantity ; 
                            element[2]=Number(element[2]);
                            if (element[0] == productPicked.id && element[1] == productPicked.color){
                                element[2] += Number(productPicked.quantity);
                                let newStorageString = JSON.stringify(cartStorage);
                                localStorage.setItem("cartStorage", newStorageString);
                            }
                        }
                    }else if (!(localStorage.getItem("cartStorage"))){
                        productStorage.push(productPicked.id, productPicked.color, productPicked.quantity);
                        storageString = JSON.stringify(productStorage);
                        localStorage.setItem("storageString", storageString);
                    }
                }
            }
        }
    })     
    .catch((err) => console.log(err));
}