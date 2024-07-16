const productContainer = document.querySelector(".product-list");
const categories = document.querySelectorAll("#categories a");
const cartPage = document.getElementById("cart");
const mainPage = document.getElementById("main-page");
const userLink = document.getElementById("user-link");
const jsonUrl = "/products.json";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const username = urlParams.get("username");

//randeaza produs
const renderProduct = (product) => {
  const productItem = `
  <li class="product-card">
  <div class="product-details">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <span>$${product.price.toFixed(2)}</span>
  </div>
  <button class="product-card__button" data-product-id="${
    product.id
  }">Adauga in cos</button>
</li>
  `;
  productContainer.insertAdjacentHTML("beforeend", productItem);
};

//categorie produs
const renderCategory = (category) => {
  productContainer.innerHTML = "";
  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products.filter(
        (product) => product.category === category
      );
      products.forEach((product) => renderProduct(product));
    })
    .catch((error) => console.log(error));
};

categories.forEach((category) => {
  category.addEventListener("click", (event) => {
    const categoryValue = event.target.dataset.category;
    renderCategory(categoryValue);
  });
});

//adaugare produs in cos
productContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("product-card__button")) {
    const productId = target.dataset.productId;
    const quantity = 1;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
    if (cart[productId]) {
      cart[productId] += quantity;
    } else {
      cart[productId] = quantity;
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
});

//navigare pagini
mainPage.addEventListener("click", function () {
  window.location.href =
    "/MainPage/mainpage.html?id=" + userId + "&username=" + username;
});

userLink.addEventListener("click", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    userLink.href = "/Profile/profil.html?id=" + userId + "&username=" + username;
  } else {
    userLink.href = "/Login/login.html";
  }
});


cartPage.addEventListener("click", function () {
  window.location.href =
    "/ShoppingKart/shoppingkart.html?id=" + userId + "&username=" + username;
});

// function getCookie(name) {
//   const cookieString = document.cookie;
//   const cookies = cookieString.split("; ");
//   for (let cookie of cookies) {
//     const parts = cookie.split("=");
//     if (parts[0] === name) {
//       return parts[1];
//     }
//   }
//   return undefined;
// }
