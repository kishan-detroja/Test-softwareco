import { BrowserRouter } from "react-router-dom";
import store from "../src/store";
import "./App.css";

import RouteFile from "./RouteFile";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <RouteFile />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
          style={{ minWidth: "350px" }}
        />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
