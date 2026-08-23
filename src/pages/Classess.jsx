import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Search, ShoppingBag } from "lucide-react";
import { useGetClassQuery } from "../feature/classApi";
import Breadcrumb from "../components/Breadcrumb";

function Classess() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const { data, isLoading: isClassLoading, error } = useGetClassQuery();
  const [sort, setSort] = useState("");
  const [addCart, { isLoading: isAddingCart }] = useAddCartsMutation();
  const [result, setResult] = useState([]);
  // const dispatch = useDispatch();
  console.log(data?.classes);

  //result = [] va searchResult va data = undefined = > render lan dau
  // api dc goi
  useEffect(() => {
    let searchResult = data?.classes?.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (sort === "tangdan") {
      searchResult.sort((a, b) => a.price - b.price);
    } else if (sort === "giamdan") {
      searchResult.sort((a, b) => b.price - a.price);
    }

    setResult(searchResult);
  }, [sort, search, data?.classes]);

  // setResult(sorttangdan)
  const handAddCart = async (classId) => {
    try {
      const res = await addCart({
        classId,
        quantity: 1,
      }).unwrap();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans antialiased pb-20 mt-16 md:mt-20">
      <Breadcrumb name="Classes" />

      {/* HEADER & FILTERS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/60 pb-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest mb-2">
              Discover something new
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Fun & Professional Classes
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed font-light">
              Browse our curated selection of fun, hands-on classes — click "Add
              to Cart" to select a class for checkout.
            </p>
          </div>

          {/* PREMIUM SEARCH BOX */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative flex items-center border border-slate-300 focus-within:border-teal-700 bg-white transition-colors duration-150 rounded-sm overflow-hidden">
              <input
                type="text"
                placeholder="Tìm khóa học của bạn..."
                className="w-full px-4 py-2.5 text-sm text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400 font-light"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={(e) => setSearch(e.target.value)}
                className="px-4 py-2.5 text-slate-400 hover:text-teal-700 active:text-teal-800 transition-colors border-l border-slate-100"
                aria-label="Search button"
              ></button>

              <select
                name="sortPrice"
                id="sortPrice"
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border px-3 py-1.5 text-sm"
              >
                <option value="">Sắp xếp theo giá</option>{" "}
                {/* Thêm dòng này để làm mặc định */}
                <option value="tangdan">Giá: Thấp đến Cao ↑</option>
                <option value="giamdan">Giá: Cao đến Thấp ↓</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SKELETON LOADING STATE */}
      {isClassLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-white border border-slate-200/60 p-4 space-y-4 rounded-sm"
            >
              <div className="bg-slate-200 h-44 w-full rounded-sm" />
              <div className="h-5 bg-slate-200 w-2/3 rounded-sm" />
              <div className="h-12 bg-slate-200 w-full rounded-sm" />
            </div>
          ))}
        </div>
      )}

      {/* ERROR HANDLING STATE */}
      {error && (
        <div className="max-w-md mx-auto px-4 text-center py-12">
          <p className="text-sm text-rose-600 font-medium">
            Đã xảy ra lỗi khi tải danh sách khóa học. Vui lòng thử lại sau.
          </p>
        </div>
      )}

      {/* COURSE GRID SYSTEM */}
      {!isClassLoading && !error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {token ? (
              result?.length > 0 ? (
                <>
                  {result?.map((product) => (
                    <div
                      key={product.id || product._id}
                      className="group flex flex-col bg-white border border-slate-200/60 rounded-sm hover:border-slate-300 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                    >
                      {/* Image Preview Card */}
                      <div
                        className="relative cursor-pointer aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-100"
                        onClick={() => navigate(`/classes/${product?._id}`)}
                      >
                        <img
                          src={`http://localhost:3001/uploads/${product.image}`}
                          alt={product.name || "class"}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        <div className="absolute left-3 top-3 bg-white/95 text-slate-900 px-2.5 py-1 text-xs font-bold border border-slate-200 shadow-sm rounded-sm">
                          {product.price
                            ? `${product.price.toLocaleString("vi-VN")}đ`
                            : "Free"}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-teal-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                          Hot
                        </div>
                      </div>

                      {/* Content Info Card */}
                      <div className="flex flex-1 flex-col p-5">
                        <h2
                          className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors cursor-pointer line-clamp-1"
                          onClick={() => navigate(`/classes/${product?._id}`)}
                        >
                          {product.name}
                        </h2>

                        <p className="mt-2 text-xs leading-relaxed text-slate-500 font-light line-clamp-3 mb-4 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                          {isAddingCart ? (
                            <button
                              disabled
                              className="flex flex-1 items-center justify-center gap-2 bg-gray-500 px-4 py-2.5 text-xs font-medium text-white rounded-sm"
                            >
                              <ShoppingBag size={14} />
                              Đang thêm...
                            </button>
                          ) : (
                            <button
                              onClick={() => handAddCart(product._id)}
                              className="flex flex-1 items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 px-4 py-2.5 text-xs font-medium text-white rounded-sm shadow-sm"
                            >
                              <ShoppingBag size={14} />
                              Thêm vào giỏ hàng
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/classes/${product?._id}`)}
                            className="border border-slate-300 hover:bg-slate-50 active:bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-700 transition-colors duration-150 rounded-sm"
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-full flex justify-center items-center min-h-[40vh] border border-dashed border-slate-200 bg-white rounded-sm">
                  <p className="text-sm font-light text-slate-400">
                    Không tìm thấy sản phẩm phù hợp.
                  </p>
                </div>
              )
            ) : result?.length > 0 ? (
              <>
                {result?.map((product) => (
                  <div
                    key={product.id || product._id}
                    className="group flex flex-col bg-white border border-slate-200/60 rounded-sm hover:border-slate-300 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                  >
                    {/* Image Preview Card */}
                    <div
                      className="relative cursor-pointer aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-100"
                      onClick={() => navigate(`/classes/${product?._id}`)}
                    >
                      <img
                        src={`http://localhost:3001/uploads/${product?.image}`}
                        alt={product.name || "class"}
                        className="w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <div className="absolute left-3 top-3 bg-white/95 text-slate-900 px-2.5 py-1 text-xs font-bold border border-slate-200 shadow-sm rounded-sm">
                        {product.price
                          ? `${product.price.toLocaleString("vi-VN")}đ`
                          : "Free"}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-teal-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                        New
                      </div>
                    </div>

                    {/* Content Info Card */}
                    <div className="flex flex-1 flex-col p-5">
                      <h2
                        className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors cursor-pointer line-clamp-1"
                        onClick={() => navigate(`/classes/${product?._id}`)}
                      >
                        {product.name}
                      </h2>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-light line-clamp-3 mb-4 flex-1">
                        {product.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <button
                          onClick={() => navigate("/login")}
                          className="flex w-full items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 px-4 py-2.5 text-xs font-medium text-white transition-colors duration-150 rounded-sm shadow-sm"
                        >
                          <ShoppingBag size={14} />
                          Đăng nhập để thêm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-full flex justify-center items-center min-h-[40vh] border border-dashed border-slate-200 bg-white rounded-sm">
                <p className="text-sm font-light text-slate-400">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Classess;
