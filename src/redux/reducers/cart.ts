import { SET_CART, CLEAR_CART, UPDATE_CART } from "../types";

import { MiniFig } from "../../types";

const initialState: MiniFig | {} = {};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CART:
      return action.payload;
    case UPDATE_CART:
      return { ...state, ...action.payload };
    case CLEAR_CART:
      return {};
    default:
      return state;
  }
};

export default cartReducer;
