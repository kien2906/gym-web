import "./App.css";
import CartContext from "./context/CartContext";
import ThemeContext from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <ThemeContext>
      {" "}
      <CartContext>
        {" "}
        <AppRoutes />
      </CartContext>
    </ThemeContext>
  );
}

export default App;
