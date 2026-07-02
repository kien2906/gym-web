import "./App.css";
import store from "./app/store";
import CartContext from "./context/CartContext";
import ThemeContext from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
function App() {
  return (
    <ThemeContext>
      {" "}
      <CartContext>
        {" "}
        <Provider store={store}>
          {" "}
          <AppRoutes />
        </Provider>
      </CartContext>
    </ThemeContext>
  );
}

export default App;
