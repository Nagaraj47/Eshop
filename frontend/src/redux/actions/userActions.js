import { REMOVE_USER, SET_USER } from "../constants/actionTypes";

export const setUser = (userDetails) => {
  return {
    type: SET_USER,
    payload: userDetails,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
