import { SET_CART, UPDATE_CART, CLEAR_CART } from "../types";

import { MiniFig } from "../../types";

export const setCart = (payload: MiniFig) => ({
  type: SET_CART,
  payload,
});

export const updateCart = (payload: MiniFig) => ({
  type: UPDATE_CART,
  payload,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
