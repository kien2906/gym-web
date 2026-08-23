import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useCreatePaymentMutation } from "../feature/paymentApi";

const Cart = () => {
  const [open, setOpen] = useState(null);
  const [deleteId, setIdDelete] = useState(null);
  const nav = useNavigate();
  const { data } = useGetCartQuery();
  const [deleteCart] = useDeleteCartMutation();
  const [clearCart] = useClearCartMutation();
  const [createPayment] = useCreatePaymentMutation();
  const listCart = data?.cart?.items;
  console.log(listCart);

  const totalPrice = listCart?.reduce((sum, item) => {
    return sum + (item?.class.price || 0);
  }, 0);

  const counts = listCart?.filter((item) => item.class).length || 0;
  console.log(counts);
  console.log(totalPrice);
  // const shipping = totalPrice > 0 && totalPrice < 200 ? 15 : 0;
  const caclulateDiscount = () => {
    let giamgia = 0;
    if (counts >= 3) {
      giamgia = 15;
    }
    if (counts === 5) {
      giamgia = 35;
    }

    return giamgia;
  };
  const discount = caclulateDiscount();
  const finalTotal = totalPrice - (totalPrice * caclulateDiscount()) / 100;
  console.log(finalTotal);

  const handlePayment = async () => {
    try {
      const res = await createPayment({
        paymentMethod: "cash",
        totalPrice: finalTotal,
      }).unwrap();

      console.log(res);

      if (res.success) {
        nav("/payment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data?.cart?.items.length) {
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
            <h1 className="text-3xl font-bold text-gray-800">
              Giỏ hàng của bạn
            </h1>
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
                    {/* {cart.length} khoá học đã chọn */}
                  </p>
                </div>
              </div>
              <button
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 cursor-pointer"
                onClick={() => clearCart()}
              >
                Xoá tất cả
              </button>
            </div>

            <div className="space-y-4">
              {listCart?.map((item) => (
                <div
                  key={item?.class._id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:shadow-md sm:flex-row"
                >
                  {item?.class?.image ? (
                    <img
                      src={`http://localhost:3001/uploads/${item.class.image}`}
                      alt={item?.class.name}
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
                          {item?.class?.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.class.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Đơn giá</p>
                        <p className="text-xl font-bold text-teal-600">
                          {item.class.price.toLocaleString("vi-VN")} VND
                        </p>
                      </div>

                      <button
                        className="rounded-lg bg-white px-4 py-2 text-sm font-mediumtransitio text-red-500 border-red-200 border text-sm font-semibold hover:bg-red-50 cursor-pointer"
                        onClick={() => deleteCart(item.class._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Tóm tắt đơn hàng
              </h2>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Tạm tính</span>
                <span>{totalPrice.toLocaleString("vi-VN")} VND</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Giảm giá</span>
                <span>{discount}%</span>
              </div>
            </div>

            <div className="my-5 h-px bg-gray-200" />

            <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
              <span>Tổng tiền</span>
              <span className="text-teal-600">
                {finalTotal.toLocaleString("vi-VN")}VND
              </span>
            </div>

            <button
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              onClick={handlePayment}
            >
              Thanh toán ngay
            </button>

            <div className="mt-4 rounded-2xl bg-teal-50 p-3 text-sm text-teal-700">
              Đã được áp dụng giảm giá {discount}%
            </div>
          </aside>
        </div>
      </div>

      {/* {open && <ConfirmDeleteModal onCancel={handClose} />} */}
    </div>
  );
};

export default Cart;
