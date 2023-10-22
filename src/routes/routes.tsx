import { createBrowserRouter } from "react-router-dom";

import Home from "./Home";
import Choose from "./Choose";
import Cart from "./Cart";
import PATHS from "./paths";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME_PATH,
    element: <Home />,
  },
  {
    path: PATHS.CHOOSE_PATH,
    element: <Choose />,
  },
  {
    path: PATHS.CART_PATH,
    element: <Cart />,
  },
]);
