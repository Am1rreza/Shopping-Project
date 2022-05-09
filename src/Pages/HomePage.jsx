import Layout from "../Layout/Layout";
import * as data from "../data";
import { useCart, useCartActions } from "../Providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispatch = useCartActions();
  const { cart } = useCart();

  const addProductHandler = (product) => {
    toast.success(`${product.name} Added To Cart`)
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((p) => {
            return (
              <section className="product" key={p.id}>
                <div className="productImg">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="productDesc">
                  <p>{p.name}</p>
                  <p>{p.price}$</p>
                  <button
                    className="btn primary"
                    onClick={() => addProductHandler(p)}
                  >
                    {checkInCart(cart, p) ? "In Cart" : "Add To Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
