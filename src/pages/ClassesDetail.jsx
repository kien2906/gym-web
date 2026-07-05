import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  PlayCircle,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { getClassesId } from "../api/apiClassess";
import { useDispatch } from "react-redux";
import { addtoCart } from "../feature/cartSlice";
function ClassesDetail() {
  const { id } = useParams();
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const nav = useNavigate();
  console.log(token);
  useEffect(() => {
    const fetchClass = async () => {
      setLoading(true);

      const data = await getClassesId(id);
      setClasses(data);
      setLoading(false);
    };

    fetchClass();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-12">
        <div className="mx-auto max-w-6xl animate-pulse rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="h-80 rounded-3xl bg-gray-200" />
            <div className="space-y-4">
              <div className="h-6 w-32 rounded-full bg-gray-200" />
              <div className="h-10 w-3/4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-12 w-40 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50">
            <img
              src={classes?.image}
              alt={classes?.name}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                <Sparkles size={16} />
                Khóa học nổi bật
              </div>

              <h1 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">
                {classes?.name}
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-600">
                {classes?.description}
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Clock3 size={18} className="text-teal-500" />
                  <span>Học theo tốc độ của bạn, linh hoạt và dễ tiếp cận</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <BookOpen size={18} className="text-teal-500" />
                  <span>
                    Nhận tài liệu và bài tập thực hành ngay sau khi đăng ký
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <PlayCircle size={18} className="text-teal-500" />
                  <span>
                    Video bài giảng chất lượng cao, dễ hiểu và thực tế
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-gray-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">
                    Giá khóa học
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-800">
                    ${classes?.price}
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-600 shadow-sm">
                  Ưu đãi hôm nay
                </div>
              </div>
              {token ? (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-600"
                    onClick={() => dispatch(addtoCart(classes.id))}
                  >
                    <ShoppingBag size={18} />
                    Thêm vào giỏ
                  </button>
                  <button className="rounded-2xl border border-teal-200 bg-white px-5 py-3 font-semibold text-teal-600 transition hover:bg-teal-50">
                    Đăng ký ngay
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="flex items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-600"
                    onClick={() => nav("/login")}
                  >
                    <ShoppingBag size={18} />
                    Thêm vào giỏ
                  </button>
                  <button className="rounded-2xl border border-teal-200 bg-white px-5 py-3 font-semibold text-teal-600 transition hover:bg-teal-50">
                    Đăng ký ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassesDetail;
