import { productsData } from "./products.js";
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");

let cart = [];

// get products
class Products {
  // get from API
  getProducts() {
    return productsData;
  }
}

// display products
class UI {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<section class="product">
      <div class="img-container">
      <img
      class="product-img"
      src="${item.imageUrl}"
          alt="p-1"
          />
          </div>
          <div class="products-desc">
          <p class="products-title">${item.title}</p>
          <p class="products-price">${item.price}$</p>
          </div>
          <button class="add-to-cart btn" data-id=${item.id}>
          <i class="fas fa-shopping-cart"></i>
          Add to cart
          </button>
          </section>`;
      productsDOM.innerHTML = result;
    });
  }

  getAddToCartBtns() {
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
    const buttons = [...addToCartBtn];

    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      // check if this product id is in cart or not
      const isInCart = this.cart.find((item) => item.id === parseInt(id));
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      // add an event listener to btn
      btn.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;

        // get product from products
        const addedProduct = { ...Storage.getProducts(id), quantity: 1 };
        // add product to cart
        cart = [...cart, addedProduct];
        // save cart to local storage
        Storage.saveCart(cart);
        // update cart value
        this.setCartValue(cart);
        // add to cart item
        this.addCartItem(addedProduct);
      });
    });
  }

  setCartValue(cart) {
    let tempCartItem = 0;

    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItem += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);

    cartTotal.innerText = `Total Price : ${totalPrice}$`;
    cartItems.innerText = tempCartItem;
  }

  addCartItem(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img class="cart-item-img" src="${cartItem.imageUrl}" />
    <div class="cart-item-desc">
      <h4>${cartItem.title}</h4>
      <h5>${cartItem.price}$</h5>
    </div>
    <div class="cart-item-conteoller">
      <i class="fas fa-chevron-up"></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down"></i>
      </div>
      <i class="fas fa-trash-alt"></i>
    `;
    cartContent.appendChild(div);
  }

  setupApp() {
    // get cart from storage
    cart = Storage.getCart() || [];
    // add cart item
    cart.forEach((item) => this.addCartItem(item));
    // set value : total price and cart items
    this.setCartValue(cart);
  }
}

// storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProducts(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
  }
}

// add an event listeners to DOM
document.addEventListener("DOMContentLoaded", () => {
  // get products
  const products = new Products();
  const productsData = products.getProducts();

  //display products
  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  // get cart and setup app
  ui.setupApp();

  // save products
  Storage.saveProducts(productsData);
});

// cart items modal
function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "10%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);
