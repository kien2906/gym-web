import { createContext, useState } from "react";

export const Cartproduct = createContext();
function CartContext({ children }) {
  const [addCart, setAddCart] = useState([]);

  const handAddCart = (product) => {
    const exit = addCart.find((p) => p.id === product.id);

    if (exit) {
      setAddCart(
        addCart.map((t) =>
          t.id === product.id ? { ...t, quantity: t.quantity + 1 } : t,
        ),
      );
    } else {
      setAddCart([...addCart, { ...product, quantity: 1 }]);
    }
  };
  const clearCart = () => {
    setAddCart([]);
  };
  const clearProduct = (id) => {
    setAddCart((pre) => pre.filter((p) => p.id !== id));
  };

  const increase = (id) => {
    setAddCart(
      addCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const descrease = (id) => {
    setAddCart(
      addCart.map((t) =>
        t.id === id ? { ...t, quantity: t.quantity - 1 } : t,
      ),
    );
  };
  return (
    <Cartproduct.Provider
      value={{
        handAddCart,
        addCart,
        clearCart,
        clearProduct,
        increase,
        descrease,
      }}
    >
      {children}
    </Cartproduct.Provider>
  );
}

export default CartContext;
