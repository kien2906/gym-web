import { useState } from "react";
import { Star, X, MessageSquare, Send } from "lucide-react";

const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  classNameName = "Khóa học Yoga Cơ Bản",
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }

    try {
      await onSubmit({ rating, comment });
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      setError(error?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleCloseAndReset = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp nền mờ phía sau */}
      <div
        className="fixed inset-0 bg-slate-200/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Hộp Modal chính - Style đồng bộ bo góc 3xl */}
      <div className="relative w-full max-w-md transform rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition-all z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Nút đóng (X) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-slate-100 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Tiêu đề Modal */}
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Đánh giá dịch vụ
            </h2>
            <p className="text-xs text-gray-500 truncate max-w-[280px]">
              {classNameName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Khu vực Chọn Sao (Rating) */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Bạn chấm khóa học này mấy sao?
            </p>

            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((start) => {
                const isFilled = start <= (hoverRating || rating);

                return (
                  <button
                    key={start}
                    onClick={() => setRating(start)}
                    onMouseEnter={() => setHoverRating(start)} // Rê chuột vào để xem trước
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={32} // Kích thước ngôi sao
                      className={`transition-colors duration-150 ${
                        isFilled
                          ? "fill-amber-400 text-amber-400 drop-shadow-sm" 
                          : "text-gray-300" 
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Hiển thị text trạng thái sao dựa trên lựa chọn */}
            <p className="mt-2 text-xs font-semibold text-teal-600 min-h-[16px]">
              {rating === 5 && "Cực kỳ hài lòng!"} <Star></Star>
              {rating === 4 && "Rất tốt! ⭐⭐⭐ Rely"}
              {rating === 3 && "Bình thường ⭐⭐⭐"}
              {rating === 2 && "Tạm ổn ⭐⭐"}
              {rating === 1 && "Cần cải thiện nhiều ⭐"}
            </p>
          </div>

          {/* Khu vực Nhập Nội Dung Nhận Xét (Comment) */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 block">
              Nhận xét của bạn
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm hoặc cảm nhận của bạn về lớp học này nhé..."
              className="w-full rounded-2xl border border-gray-200 p-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Hệ thống nút bấm hành động */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCloseAndReset}
              className="flex-1 rounded-2xl border border-gray-200 bg-white py-3 font-semibold text-gray-600 transition hover:bg-slate-50 cursor-pointer text-sm"
            >
              Hủy bỏ
            </button>

            {/* Nút gửi dùng Gradient màu Teal-Cyan giống hệt giỏ hàng */}
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3 font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer text-sm"
            >
              Gửi đánh giá
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
