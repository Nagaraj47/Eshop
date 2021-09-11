import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../constants/actionTypes";

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
