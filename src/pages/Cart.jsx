import { useContext, useState } from "react";
import { Cartproduct } from "../context/CartContext";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const Cart = () => {
  const { addCart, clearCart, clearProduct, increase, descrease } = useContext(Cartproduct);

  const [open, setOpen] = useState(null);

  const handOpen = (id) => {
    setOpen(id);
  };
  

  const handClose = () => {
    setOpen(null);
  };

  const handeDelete = () => {
    clearProduct(open);
    setOpen(null);
  };

  if (!addCart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">Giỏ hàng trống</p>
        </div>
      </div>
    );
  }

  const totalPrice = addCart.reduce((sum, item) => {
    return sum + (item.price * item.quantity || 0);
  }, 0);

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith("/") || image.startsWith("http")) return image;
    return `/images/${image.split("/").pop()}`;
  };
  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg mb-8 hover:border-teal-400 border-2 ">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Giỏ hàng của bạn
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 shadow-md"
          >
            🗑️ Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
          <div className="grid grid-cols-1 gap-6 ">
            {addCart.map((item) => (
              <div key={item.id} className="border-b pb-6 last:border-b-0">
                <div className="flex gap-4">
                  {item.image && (
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="w-25 h-25 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex  justify-between">
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <button
                        className="px-5 py-2 bg-teal-400 shadow-md rounded-md cursor-pointer"
                        onClick={() => handOpen(item.id)}
                      >
                        {" "}
                        🗑️
                      </button>
                    </div>
                    <div className="flex justify-start gap-2 items-center ">
                      <button
                        onClick={() => increase(item.id)}
                        className="px-4 py-2 bg-teal-300 rounded-md flex items-center  cursor-pointer"
                      >
                        +
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => descrease(item.id)}
                        className={`px-4 py-2 rounded-md flex items-center cursor-pointer
                          ${item.quantity === 0 ? "bg-teal-100" : "bg-teal-300 "}
                        `}
                        disabled={item.quantity === 0}
                      >
                        -
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <p className="text-teal-600 font-bold text-lg mt-2">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="text-right">
            <p className="text-gray-600 mb-2">
              Tổng số sản phẩm:{" "}
              <span className="font-bold text-lg">{addCart.length}</span>
            </p>
            <p className="text-2xl font-bold text-teal-600">
              Tổng tiền: ${totalPrice.toFixed(2)}
            </p>
            <button className="p-5 mt-2 bg-teal-400 rounded-md cursor-pointer hover:bg-teal-700 text-white font-bold">
              {" "}
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      {open && (
        <ConfirmDeleteModal onCancel={handClose} onConfirm={handeDelete} />
      )}
    </div>
  );
};
export default Cart;
