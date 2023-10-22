import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store.ts";
import Layout from "./components/Layout/index.tsx";
import { router } from "./routes/routes.tsx";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  );
};

export default App;
