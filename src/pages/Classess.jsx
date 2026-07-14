import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../feature/cartSlice";

import { Search, ShoppingBag } from "lucide-react";
import { useGetClassQuery } from "../feature/class";
const Classes1 = () => {
  return (
    <div className="bg-gray-500 py-20 h-full text-center">
      <div className="flex justify-center gap-5 text-xl items-center">
        <span className="font-bold text-teal-400">Home</span>
        <span className="text-white font-bold">{">"}</span>
        <span className="font-bold text-white">Classes</span>
      </div>
    </div>
  );
};

function Classess() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const { data, isLoading, error } = useGetClassQuery();
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  console.log(data);


  useEffect(() => {
    if (data?.classes) {
      setResult(data.classes);
    }
  }, [data]);

  const handSearch = () => {
    const searchClasses = data?.classes?.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    setResult(searchClasses);
  };


  return (
    <div className="h-full mt-30">
      <Classes1 />
      <div className="text-center mb-5 mt-5 w-3xl mx-auto">
        <p className="text-gray-400">Discover something new</p>
        <h1 className="font-bold text-4xl">Fun Classes</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mt-2">
          Browse our curated selection of fun, hands-on classes — click "Add to
          Cart" to select a class for checkout.
        </p>

        <div className="flex justify-center gap-5">
          {" "}
          <input
            type="text"
            placeholder="search..."
            className="w-full border p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handSearch();
              }
            }}
          />
          <button onClick={handSearch}>
            <Search />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full ">
          {token ? (
            result?.length > 0 ? (
              <>
                {result?.map((product) => (
                  <div
                    key={product.id}
                    className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,184,166,0.16)]"
                  >
                    <div
                      className="relative cursor-pointer overflow-hidden"
                      onClick={() => navigate(`/classes/${product?._id}`)}
                    >
                      <img
                        src={`http://localhost:3001/uploads/${product.image}`}
                        alt={product.name || "class"}
                        className="h-40 w-full object-cover transition duration-500 hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-teal-700 shadow-sm">
                        ${product.price}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full bg-teal-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        Hot
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-xl font-bold text-gray-800">
                        {product.name}
                      </h2>

                      <p className="mt-2 h-16 overflow-hidden text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => dispatch(addtoCart(product))}
                          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 font-semibold text-white transition hover:opacity-90"
                        >
                          <ShoppingBag size={16} />
                          Thêm vào giỏ
                        </button>
                        <button
                           onClick={() => navigate(`/classes/${product?._id}`)}
                          className="rounded-2xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                          Xem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-full flex justify-center  items-center min-h-[60vh]">
                <p className="text-xl font-semibold">Không tìm thấy sản phẩm</p>
              </div>
            )
          ) : result?.length > 0 ? (
            <>
              {result?.map((product) => (
                <div
                  key={product.id}
                  className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,184,166,0.16)]"
                >
                  <div
                    className="relative cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/classes/${product?._id}`)}
                  >
                    <img
                      src={`http://localhost:3001/uploads/${product?.image}`}
                      alt={product.name || "class"}
                      className="h-40 w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-teal-700 shadow-sm">
                      ${product.price}
                    </div>
                    <div className="absolute bottom-3 left-3 rounded-full bg-teal-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      New
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="mt-2 h-16 overflow-hidden text-sm leading-6 text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <button
                        onClick={() => navigate("/login")}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 font-semibold text-white transition hover:opacity-90"
                      >
                        <ShoppingBag size={16} />
                        Đăng nhập để thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-full flex justify-center  items-center min-h-[60vh]">
              <p className="text-xl font-semibold">Không tìm thấy sản phẩm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classess;
// useNavigate dùng để chuyẻn sang url khác

// useNavigate và useParam thường đi chung với nhau
