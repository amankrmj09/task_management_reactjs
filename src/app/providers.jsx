import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { store } from "./store";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default Providers;