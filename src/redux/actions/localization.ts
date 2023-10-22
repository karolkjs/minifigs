import { SET_LANGUAGE } from "../types";

export const setLanguage = (payload: string) => ({
  type: SET_LANGUAGE,
  payload,
});
