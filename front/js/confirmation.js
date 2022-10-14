const orderIdSelector = document.querySelector("#orderId");

let currentUrl = window.location;
let currentUrlSearch = new URLSearchParams(currentUrl.search)
let idFromUrl = currentUrlSearch.get("id");

orderIdSelector.innerHTML = `<br> ${idFromUrl}`