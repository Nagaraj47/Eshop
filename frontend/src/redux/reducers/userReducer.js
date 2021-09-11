import { REMOVE_USER, SET_USER } from "../constants/actionTypes";
import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || {
  name: "",
  email: "",
  userId: "",
  isAdmin: false,
  isLogged: false,
};

const intialState = userInfo;

export const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        name: action.payload.name,
        email: action.payload.email,
        userId: action.payload._id,
        isAdmin: action.payload.isAdmin,
        isLogged: true,
      };
    case REMOVE_USER:
      Cookie.remove("userInfo");
      state = {
        name: "",
        email: "",
        userId: "",
        isAdmin: false,
        isLogged: false,
      };
      return state;

    default:
      return state;
  }
};
