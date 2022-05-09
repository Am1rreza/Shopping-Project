import { Link } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import "./checkout.css";

const Checkout = () => {
  const userData = useAuth();
  const { cart, total } = useCart();

  return (
    <div>
      {userData ? (
        <main className="container">
          <section className="cartCenter">
            <section className="cartItemList check">
              <h3 style={{ marginBottom: "15px" }}>Checkout Detail</h3>
              <p>Name : {userData.name}</p>
              <p>Email : {userData.email}</p>
              <p>Number : {userData.phoneNumber}</p>
            </section>
            <section className="cartSummery">
              {cart &&
                cart.map((c) => {
                  return (
                    <div key={c.id}>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}$
                    </div>
                  );
                })}
              <hr style={{ marginTop: "5px", marginBottom: "5px" }} />
              <div>Total : {total}</div>
            </section>
          </section>
        </main>
      ) : (
        <center>
          <h2 style={{ marginTop: "1.5rem" }}>Please Login !</h2>
          <Link to="/login">Go to Login Page</Link>
        </center>
      )}
    </div>
  );
};

export default Checkout;
