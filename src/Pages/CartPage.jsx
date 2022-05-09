import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const DecHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };

  if (!cart.length) {
    return (
      <Layout>
        <center style={{ marginTop: "1.5rem" }}>
          <h2>No Item In Cart !</h2>
          <Link to="/">Go to Home Page</Link>
        </center>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => (
              <div className="cartItem" key={item.id}>
                <div className="itemImg">
                  <img src={item.image} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div>{item.offPrice * item.quantity}$</div>
                <div className="buttonGroup">
                  <button onClick={() => DecHandler(item)}>-</button>
                  <button>{item.quantity}</button>
                  <button onClick={() => incHandler(item)}>+</button>
                </div>
              </div>
            ))}
          </section>
          <CartSummary />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = () => {
  const { total, cart } = useCart();
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className="cartSummery">
      <h2 style={{ marginBottom: "30px" }}>Cart Summary</h2>
      <div className="summaryItem">
        <p>Cart Total</p>
        <p>{originalTotalPrice}$</p>
      </div>
      <div className="summaryItem">
        <p>Cart Discount</p>
        <p>{originalTotalPrice - total}$</p>
      </div>
      <div className="summaryItem net">
        <p>Net Price</p>
        <p>{total}$</p>
      </div>
      <Link to="/signup/?redirect=/checkout">
        <button className="btn primary">Go To Checkout</button>
      </Link>
    </section>
  );
};
