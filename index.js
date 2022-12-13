const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");

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