import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center w-[400px]">

        <div className="flex justify-center mb-5">
          <CheckCircle 
            size={80} 
            className="text-green-500"
          />
        </div>


        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Thanh toán thành công 🎉
        </h1>


        <p className="text-gray-500 mb-6">
          Cảm ơn bạn đã đăng ký lớp học.
          Chúc bạn có những buổi tập hiệu quả!
        </p>


        <div className="bg-gray-100 rounded-lg p-4 mb-6">

          <div className="flex justify-between mb-2">
            <span className="text-gray-500">
              Trạng thái
            </span>

            <span className="text-green-600 font-semibold">
              Success
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-500">
              Mã giao dịch
            </span>

            <span className="font-medium">
              #PAY123456
            </span>
          </div>

        </div>


        <button
          onClick={() => navigate("/classes")}
          className="
            w-full 
            bg-blue-600 
            text-white 
            py-3 
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          Tiếp tục mua lớp
        </button>


        <button
          onClick={() => navigate("/")}
          className="
            w-full 
            mt-3
            border 
            py-3 
            rounded-lg
            hover:bg-gray-50
          "
        >
          Về trang chủ
        </button>


      </div>

    </div>
  );
};

export default PaymentSuccess;