import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { store } from "./store";
import { ThemeProvider } from "./ThemeContext";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          {children}
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default Providers;