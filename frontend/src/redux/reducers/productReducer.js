import Cookie from "js-cookie";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SET_PRODUCTS,
} from "../constants/actionTypes";

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {
  products: [],
  cart: cartItems,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };

    case ADD_TO_CART:
      const id = action.payload;
      const item = state.products.find((p) => p._id === id);
      const product = state.cart.find((item) => item._id === id);
      if (!product) {
        Cookie.set("cartItems", JSON.stringify([...state.cart, item]));
        return {
          ...state,
          cart: [...state.cart, item],
        };
      } else {
        alert("Product is already exist in cart...!");
        return state;
      }

    case REMOVE_FROM_CART:
      const removeId = action.payload;
      Cookie.set(
        "cartItems",
        JSON.stringify(state.cart.filter((item) => item._id !== removeId))
      );
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== removeId),
      };

    case EMPTY_CART:
      Cookie.remove("cartItems");
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
