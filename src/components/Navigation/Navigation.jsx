import "./navigation.css";
import { NavLink } from "react-router-dom";
import { useCart } from "../../Providers/CartProvider";
import { useAuth } from "../../Providers/AuthProvider";

const Navigation = () => {
  const userData = useAuth();
  const { cart } = useCart();

  return (
    <header>
      <nav>
        <div>
          <h3>Online Shop</h3>
        </div>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "activeLink" : "";
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "activeLink" : "";
              }}
              to="/cart"
            >
              Cart
              <span> {cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "activeLink" : "";
              }}
              to={userData ? "/profile" : "/login"}
            >
              {userData ? "Profile" : "Login"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
