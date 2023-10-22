import { combineReducers } from "redux";

import cartReducer from "./cart";
import localizationReducer from "./localization";

export default combineReducers({
  cart: cartReducer,
  localization: localizationReducer,
});
