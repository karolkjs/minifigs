import { SET_LANGUAGE } from "../types";

const initialState: string = "en";

const localizationReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

export default localizationReducer;
