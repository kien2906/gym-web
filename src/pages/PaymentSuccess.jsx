import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center px-4 py-8">
      {/* Card Container với thiết kế bo góc 3xl giống Cart */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center w-full max-w-md">
        
        {/* Success Icon mượt mà với tone màu Teal chủ đạo */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-600 animate-pulse">
            <CheckCircle size={44} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Tiêu đề & Lời nhắn */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-500 mb-1">
          Success Payment
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Thanh toán thành công 🎉
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 px-2">
          Cảm ơn bạn đã đăng ký khóa học. Chúc bạn có những trải nghiệm học tập và rèn luyện thật hiệu quả!
        </p>

        {/* Thông tin giao dịch đồng bộ style với Tóm tắt đơn hàng */}
        <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200/60">
            <span>Trạng thái</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span>
              Thành công
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Mã giao dịch</span>
            <span className="font-mono font-bold text-gray-700 bg-gray-200/50 px-2.5 py-0.5 rounded-lg text-xs">
              #PAY123456
            </span>
          </div>
        </div>

        {/* Hệ thống nút bấm chuẩn tone màu bài toán */}
        <div className="space-y-3">
          {/* Nút chính dùng màu Gradient Teal-Cyan như nút Thanh toán */}
          <button
            onClick={() => navigate("/classes")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
          >
            Tiếp tục khám phá
            <ArrowRight size={16} />
          </button>

          {/* Nút phụ tinh tế border nhẹ */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white border border-gray-200 px-4 py-3 font-semibold text-gray-600 transition hover:bg-slate-50 cursor-pointer"
          >
            <Home size={16} />
            Về trang chủ
          </button>
        </div>

        {/* Khung thông báo nhỏ phía dưới */}
        <div className="mt-5 rounded-2xl bg-teal-50 p-3 text-xs text-teal-700 text-center">
          Hệ thống đã gửi hóa đơn chi tiết vào email của bạn.
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;