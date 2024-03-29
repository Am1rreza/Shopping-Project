import { productsData } from "./products.js";
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");
const clearCart = document.querySelector(".cart-item-clear");

let cart = [];
let buttonsDOM = [];

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
          Add To Cart
          </button>
          </section>`;
      productsDOM.innerHTML = result;
    });
  }

  getAddToCartBtns() {
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
    buttonsDOM = [...addToCartBtn];
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
      <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
      </div>
      <i class="fas fa-trash-alt" data-id=${cartItem.id}></i>
    `;
    cartContent.appendChild(div);
  }

  setupApp() {
    // get cart from storage
    cart = Storage.getCart();
    // add cart item
    cart.forEach((item) => this.addCartItem(item));
    // set value : total price and cart items
    this.setCartValue(cart);
  }

  cartLogic() {
    // clear cart
    clearCart.addEventListener("click", () => this.clearCart());
    // cart functionality
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-chevron-up")) {
        const addQuantity = e.target;
        // get item from cart
        const addedItem = cart.find(
          (cartItem) => cartItem.id == addQuantity.dataset.id
        );
        addedItem.quantity++;
        // save cart
        Storage.saveCart(cart);
        // update cart value
        this.setCartValue(cart);
        // update cart item in UI
        addQuantity.nextElementSibling.innerText = addedItem.quantity;
      } else if (e.target.classList.contains("fa-trash-alt")) {
        // find item from cart
        const removedItem = cart.find((c) => c.id == e.target.dataset.id);
        // call removeItem function
        this.removeItem(removedItem.id);
        // update storage
        Storage.saveCart(cart);
        // remove item from DOM
        cartContent.removeChild(e.target.parentElement);
      } else if (e.target.classList.contains("fa-chevron-down")) {
        const subQuantity = e.target;
        // get item from cart
        const substractedItem = cart.find(
          (c) => c.id == subQuantity.dataset.id
        );
        if (substractedItem.quantity === 1) {
          this.removeItem(substractedItem.id);
          cartContent.removeChild(subQuantity.parentElement.parentElement);
          return;
        }
        substractedItem.quantity--;
        // save cart
        Storage.saveCart(cart);
        // update cart value
        this.setCartValue(cart);
        // update cart item in UI
        subQuantity.previousElementSibling.innerText = substractedItem.quantity;
      }
    });
  }

  clearCart() {
    //remove
    cart.forEach((cartItem) => this.removeItem(cartItem.id));
    // remove cart content children
    while (cartContent.children.length) {
      cartContent.removeChild(cartContent.children[0]);
    }
    // close modal
    closeModalFunction();
  }

  removeItem(id) {
    // update cart
    cart = cart.filter((cartItem) => cartItem.id !== id);
    // update total price and cart items
    this.setCartValue(cart);
    // update storage
    Storage.saveCart(cart);
    // get "add to cart" buttons => update their text and disable
    const button = buttonsDOM.find((btn) => parseInt(btn.dataset.id) === id);
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>
    Add To Cart`;
    button.disabled = false;
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
    return JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
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
  ui.cartLogic();
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
