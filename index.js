import { productsData } from "./products.js";
const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");

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

  // save products
  Storage.saveProducts(productsData);
});

// cart items modal
function showModalFunction() {
  backDrop.style.display = "block";
  cart.style.opacity = "1";
  cart.style.top = "35%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cart.style.opacity = "0";
  cart.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);
