import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import ThemeContext from "./context/ThemeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
console.log("CLIENT ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <BrowserRouter>
      <ThemeContext>
        < GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
          </GoogleOAuthProvider>
      </ThemeContext>
    </BrowserRouter>
  </Provider>


);
