import { productsData } from "./products.js";
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");

const cart = [];

// get products
class Products {
  // get from API
  getProducts() {
    return productsData;
  }
}

// display products
class UI {
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
      const isInCart = cart.find((p) => p.id === id);
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      // add event listener to btn
      btn.addEventListener("click", (e) => {
        // get product from products
        // add product to cart
        // save cart to local storage
      });
    });
  }
}

// storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
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

  // save products
  Storage.saveProducts(productsData);
});

// cart items modal
function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "35%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);
