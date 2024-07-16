const cashRadioBtn = document.getElementById("cash");
const cardRadioBtn = document.getElementById("card");
const cardForm = document.getElementById("card-form");
const cardNumberInput = document.getElementById("card-number");
const expiryDateInput = document.getElementById("expiry-date");
const cvvInput = document.getElementById("cvv");
const placeOrderBtn = document.getElementById("place-order-btn");
const cartItems = JSON.parse(sessionStorage.getItem("cart"));
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const username = urlParams.get("username");
const returBtn = document.getElementById("cos-returbtn");

fetch("/products.json")
  .then((response) => response.json())
  .then((data) => {
    const productsInCart = data.products.filter((product) =>
      Object.keys(cartItems).includes(product.id)
    );
    // preluare obiectelor din cos
    const cart = Object.keys(cartItems).map((productId) => {
      const product = productsInCart.find((p) => p.id === productId);
      return {
        id: productId,
        name: product.name,
        price: product.price,
        quantity: cartItems[productId],
      };
    });
    //formarea elementelor cu produsele
    const cartList = document.getElementById("items");
    cart.forEach((item) => {
      const li = document.createElement("li");
      const addButton = document.createElement("button");
      const minusButton = document.createElement("button");

      li.textContent = `${item.name} x ${item.quantity}`;
      addButton.textContent = "+";
      minusButton.textContent = "-";

      //functionalitatea butonului de adaugare cantitate produs
      addButton.addEventListener("click", () => {
        const updatedQuantity = cartItems[item.id] + 1;
        cartItems[item.id] = updatedQuantity;

        const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (itemIndex >= 0) {
          cart[itemIndex].quantity = updatedQuantity;
        }

        li.textContent = `${item.name} x ${updatedQuantity}`;
        li.appendChild(addButton);
        li.appendChild(minusButton);
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
        console.log(cartItems, cart);
        totalAmountEl.textContent = `$${calculateTotal(cart).toFixed(2)}`;
      });
      //functionalitatea butonului de scadere cantitate produs
      minusButton.addEventListener("click", () => {
        const updatedQuantity = cartItems[item.id] - 1;
        if (updatedQuantity >= 0) {
          cartItems[item.id] = updatedQuantity;
          const itemIndex = cart.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          if (itemIndex >= 0) {
            cart[itemIndex].quantity = updatedQuantity;
          }
          li.textContent = `${item.name} x ${updatedQuantity}`;
          li.appendChild(addButton);
          li.appendChild(minusButton);
          sessionStorage.setItem("cart", JSON.stringify(cartItems));
          totalAmountEl.textContent = `$${calculateTotal(cart).toFixed(2)}`;
          console.log(cart);
          console.log(calculateTotal(cart));
        }
      });
      li.appendChild(addButton);
      li.appendChild(minusButton);
      cartList.appendChild(li);
    });

    //calcularea totalului
    function calculateTotal(cart) {
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return totalAmount;
    }

    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalAmountEl = document.getElementById("total-amount");
    totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
  });

//verificarea metodei de plata
function toggleCardForm() {
  if (cardRadioBtn.checked) {
    cardForm.style.display = "block";
  } else {
    cardForm.style.display = "none";
  }
}

cashRadioBtn.addEventListener("change", toggleCardForm);
cardRadioBtn.addEventListener("change", toggleCardForm);

//validarea cardului
cardNumberInput.addEventListener("input", () => {
  if (!cardNumberInput.checkValidity()) {
    cardNumberInput.classList.add("invalid");
  } else {
    cardNumberInput.classList.remove("invalid");
  }
});
expiryDateInput.addEventListener("input", () => {
  if (!expiryDateInput.checkValidity()) {
    expiryDateInput.classList.add("invalid");
  } else {
    expiryDateInput.classList.remove("invalid");
  }
});
cvvInput.addEventListener("input", () => {
  if (!cvvInput.checkValidity()) {
    cvvInput.classList.add("invalid");
  } else {
    cvvInput.classList.remove("invalid");
  }
});

//functionalitatea butonului de plasare a comenzii
placeOrderBtn.addEventListener("click", () => {
  if (cardRadioBtn.checked) {
    if (cardForm.checkValidity()) {
      sessionStorage.clear();
      window.location.href =
        "/MainPage/mainpage.html?id=" + userId + "&username=" + username;
    } else {
      cardNumberInput.reportValidity();
      expiryDateInput.reportValidity();
      cvvInput.reportValidity();
    }
  } else if (cashRadioBtn.checked) {
    sessionStorage.clear();
    window.location.href =
      "/MainPage/mainpage.html?id=" + userId + "&username=" + username;
  } else {
    alert("Selectati modalitatea de plata");
  }
});

returBtn.addEventListener("click", () => {
  window.location.href=  "/MenuPage/menupage.html?id=" + userId + "&username=" + username;
  })