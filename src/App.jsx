import "./App.css";
import store from "./app/store";
import CartContext from "./context/CartContext";
import ThemeContext from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
    <ThemeContext>
      {" "}
      <CartContext>
        {" "}
        
          {" "}
          <AppRoutes />
     
      </CartContext>
    </ThemeContext>
       </Provider>
  );
}

export default App;
