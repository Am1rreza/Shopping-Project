const addProductToCart = (state, action) => {
  const product = action.payload;
  const updatedCart = [...state.cart];
  const itemIndex = updatedCart.findIndex((item) => item.id === product.id);
  if (itemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItemIndex = { ...updatedCart[itemIndex] };
    updatedItemIndex.quantity++;
    updatedCart[itemIndex] = updatedItemIndex;
  }
  return {
    ...state,
    cart: updatedCart,
    total: state.total + product.offPrice,
  };
};
const removeProductFromCart = (state, action) => {
  const product = action.payload;
  const updatedCart = [...state.cart];
  const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

  const updatedItemIndex = { ...updatedCart[itemIndex] };
  if (updatedItemIndex.quantity === 1) {
    const filteredCart = updatedCart.filter((item) => item.id !== product.id);
    return {
      ...state,
      cart: filteredCart,
      total: state.total - product.offPrice,
    };
  } else {
    updatedItemIndex.quantity--;
    updatedCart[itemIndex] = updatedItemIndex;
    return {
      ...state,
      cart: updatedCart,
      total: state.total - product.offPrice,
    };
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addProductToCart(state, action);
    case "REMOVE_PRODUCT":
      return removeProductFromCart(state, action);
    default:
      return state;
  }
};

export default cartReducer;
