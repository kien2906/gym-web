import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  PlayCircle,
  Sparkles,
  ShoppingBag,
  Check,
  HelpCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../feature/cartSlice";
import { useGetClassIdQuery } from "../feature/classApi";

function ClassesDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetClassIdQuery(id);
  const classItem = data?.data ?? data;
  const schedule = classItem?.schedule;
  const trainer = classItem?.trainer;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const formatTime = (value) => {
    if (!value) return "";
    if (typeof value !== "string") return String(value);
    const normalized = value.includes("T") ? value : `1970-01-01T${value}`;
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddToCart = () => {
    dispatch(addtoCart(classItem));
  };

  // SKELETON LOADING CAO CẤP TƯƠNG THÍCH VỚI LAYOUT MỚI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] animate-pulse">
        <div className="w-full bg-slate-900 h-[400px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-40 bg-gray-200 rounded-sm" />
              <div className="h-60 bg-gray-200 rounded-sm" />
            </div>
            <div className="lg:col-span-1">
              <div className="h-80 bg-gray-200 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans antialiased selection:bg-teal-50 selection:text-teal-900">
      {/* 1. HERO BANNER - FULL WIDTH PREMIUM */}
      <section className="relative  bg-slate-900 overflow-hidden min-h-[30px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`http://localhost:3001/uploads/${data?.data?.image}`}
            alt={classItem?.name}
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
            onError={(e) => {
              // Mẫu ảnh fallback sạch sẽ khi ảnh backend lỗi
              e.target.src =
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="max-w-3xl">
            {/* Back to list */}
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-teal-400 transition hover:text-teal-300 mb-6 group"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              Quay lại danh sách
            </Link>

            {/* Badge */}
         

            {/* Course Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              {classItem?.name}
            </h1>

            {/* Short Description */}
            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-6 max-w-2xl">
              {classItem?.description}...
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs md:text-sm text-slate-400">
              <div className="flex items-center text-slate-300">
                <Clock3 className="w-4 h-4 mr-1.5 text-teal-500" />
                <span>{schedule?.length || 0} Buổi học cố định</span>
              </div>
              <div className="flex items-center text-slate-300">
                <BookOpen className="w-4 h-4 mr-1.5 text-teal-500" />
                <span>Tài liệu đính kèm đầy đủ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CỘT TRÁI: NỘI DUNG CHÍNH KHÓA HỌC */}
          <div className="lg:col-span-2 space-y-12">
            {/* Khối giới thiệu chi tiết */}
            <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-4">
                Thông tin chi tiết khóa học
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {classItem?.description}
              </p>
            </div>

            {/* Khối giá trị cốt lõi đạt được */}
            <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-sm">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
                Bạn sẽ đạt được gì sau khóa học?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {classItem?.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="w-4 h-4 text-teal-600 mr-3 shrink-0 mt-1" />
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Khối Lịch học dạng Timeline / Card tinh tế */}
            {schedule?.length > 0 && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
                  Lịch trình lên lớp chi tiết
                </h2>
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="group bg-white border border-slate-200/60 hover:border-slate-300 rounded-sm transition-all duration-150 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 bg-slate-50 group-hover:bg-teal-50 text-slate-500 group-hover:text-teal-700 text-xs font-semibold rounded-sm flex items-center justify-center transition-colors shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-teal-900 transition-colors">
                            Buổi học thứ {index + 1}: {item.day}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.startTime
                              ? `Bắt đầu: ${formatTime(item.startTime)}`
                              : ""}
                            {item.endTime
                              ? ` • Kết thúc: ${formatTime(item.endTime)}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-100 self-start sm:self-auto">
                        Học trực tiếp
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Khối thông tin Giảng viên mặc định cao cấp */}
            <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-sm">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
                Chuyên gia hướng dẫn
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={`http://localhost:3001/uploads/${trainer?.avatar}`}
                    alt={trainer?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Huấn luyện viên của lớp
                  </h3>
                  <p className="text-xs text-teal-700 font-medium mb-2 mt-2">
                    {trainer?.specialty}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {trainer?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: SIDEBAR STICKY ĐĂNG KÝ HỌC */}
          <div className="lg:col-span-1">
            <div className="sticky top-30 bg-white border border-slate-200/80 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
              {/* Ảnh thu nhỏ trên mobile / Preview trên Desktop */}
              <div className="relative aspect-video w-full bg-slate-900 hidden lg:block border-b border-slate-100">
                <img
                  src={`http://localhost:3001/uploads/${data?.data?.image}`}
                  alt="Preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>

              <div className="p-6 md:p-8">
                {/* Giá cả & Trạng thái ưu đãi */}
                <div className="flex items-baseline justify-between gap-2 mb-4">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      {/* Xử lý an toàn nếu classItem.price trống */}
                      {classItem?.price
                        ? `${classItem.price.toLocaleString("vi-VN")}đ`
                        : "Liên hệ hotline"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 line-through">
                    {classItem?.price
                      ? `${(classItem.price * 1.5).toLocaleString("vi-VN")}đ`
                      : ""}
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-sm font-medium mb-6 text-center border border-emerald-100/60">
                  Ưu đãi đăng ký sớm giảm 30% đã được áp dụng
                </div>

                {/* Khu vực xử lý các nút Hành động (Giữ nguyên cấu trúc logic gốc của bạn) */}
                <div className="space-y-2.5">
                  {token ? (
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium py-3 px-4 rounded-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2 group"
                      >
                        <ShoppingBag
                          size={16}
                          className="transition-transform group-hover:scale-110"
                        />
                        Thêm vào giỏ hàng
                      </button>
                      <button className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-teal-700 border border-teal-200 text-sm font-medium py-3 px-4 rounded-sm transition-colors duration-150 text-center">
                        Đăng ký ngay
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={() => nav("/login")}
                        className="w-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium py-3 px-4 rounded-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2 group"
                      >
                        <ShoppingBag
                          size={16}
                          className="transition-transform group-hover:scale-110"
                        />
                        Thêm vào giỏ
                      </button>
                      <button className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-teal-700 border border-teal-200 text-sm font-medium py-3 px-4 rounded-sm transition-colors duration-150 text-center">
                        Đăng ký ngay
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-center mt-3.5">
                  <span className="text-[11px] text-slate-400 font-light">
                    Cam kết bảo lưu lộ trình học trong 12 tháng
                  </span>
                </div>

                <hr className="my-6 border-slate-100" />

                {/* Quyền lợi phụ trợ độc quyền */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
                    Quyền lợi kèm theo học viên:
                  </h4>
                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-center">
                      <Clock3 className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                      <span>Học theo tốc độ cá nhân, linh hoạt cao</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                      <span>Tài liệu & bài tập thực hành độc quyền</span>
                    </li>
                    <li className="flex items-center">
                      <PlayCircle className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                      <span>Video xem lại chất lượng cao sắc nét</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PHẦN DƯỚI: HỆ THỐNG FAQ THƯƠNG MẠI */}
        <hr className="my-16 border-slate-200/60" />
        <div></div>
      </div>
    </div>
  );
}

export default ClassesDetail;
