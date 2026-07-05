import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { Cartproduct }from "../context/CartContext";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCart, increaseCart, removeCart,clearAllCart } from "../feature/cartSlice";

const Cart = () => {
 
  const [open, setOpen] = useState(null);
  const [deleteId, setIdDelete] = useState(null);
  const cart = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const handOpen = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  const handClose = () => {
    setOpen(false);
  };

  const handeDelete = () => {
    dispatch(removeCart(deleteId));
    setOpen(false);
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith("/") || image.startsWith("http")) return image;
    return `/images/${image.split("/").pop()}`;
  };

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity || 0);
  }, 0);
 
  // const shipping = totalPrice > 0 && totalPrice < 200 ? 15 : 0;
  // const discount = totalPrice >= 200 ? 20 : 0;
  // const finalTotal = Math.max(0, totalPrice + shipping - discount);

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-16">
        <div className="max-w-3xl mx-auto rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <ShoppingBag size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Giỏ hàng trống</h1>
          <p className="mt-3 text-gray-500">
            Hãy thêm một vài khoá học để bắt đầu hành trình học tập của bạn.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            <ArrowLeft size={18} />
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
              Your cart
            </p>
            <h1 className="text-3xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
            <p className="mt-1 text-gray-500">
              Kiểm tra các khoá học bạn đã chọn và tiến hành thanh toán.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
          >
            <ArrowLeft size={16} />
            Tiếp tục khám phá
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Sản phẩm trong giỏ
                  </h2>
                  <p className="text-sm text-gray-500">
                    {cart.length} khoá học đã chọn
                  </p>
                </div>
              </div>
              <button
                onClick={()=>dispatch(clearAllCart())}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 cursor-pointer"
              >
                Xoá tất cả
              </button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:shadow-md sm:flex-row"
                >
                  {item.image ? (
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="h-24 w-full rounded-2xl object-cover sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500 sm:h-28 sm:w-28">
                      No image
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <button
                        className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        onClick={() => handOpen(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-full border border-gray-200">
                        <button
                          onClick={() => dispatch(decreaseCart(item.id))}
                          className={`flex h-10 w-10 items-center justify-center text-lg transition ${
                            item.quantity === 0
                              ? "cursor-not-allowed bg-gray-100 text-gray-300"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          disabled={item.quantity === 0}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-12 px-3 text-center text-sm font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseCart(item.id))}
                          className="flex h-10 w-10 items-center justify-center bg-teal-500 text-lg text-white transition hover:bg-teal-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Đơn giá</p>
                        <p className="text-lg font-bold text-teal-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Sparkles size={18} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Tóm tắt đơn hàng
              </h2>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Tạm tính</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Phí vận chuyển</span>
                <span></span>
              </div>
              <div className="flex items-center justify-between">
                <span>Giảm giá</span>
                <span></span>
              </div>
            </div>

            <div className="my-5 h-px bg-gray-200" />

            <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
              <span>Tổng tiền</span>
              <span className="text-teal-600">${totalPrice}</span>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-90">
              Thanh toán ngay
            </button>

            <div className="mt-4 rounded-2xl bg-teal-50 p-3 text-sm text-teal-700">
              Miễn phí vận chuyển cho đơn hàng trên $200.
            </div>
          </aside>
        </div>
      </div>

      {open && (
        <ConfirmDeleteModal onCancel={handClose} onConfirm={handeDelete} />
      )}
    </div>
  );
};

export default Cart;