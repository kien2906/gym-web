import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../feature/cartSlice";
import getClasses from "../services/apiClassess";
import { Search } from "lucide-react";
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
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getClasses();
      setClasses(data);
      //phải set result  khi fetch api nếu kho set thì khi load trang lại thì resluts rỗng
      setResult(data);
    };

    fetchClasses();
  }, []);

  const getImageSrc = (image) => {
    const fileName = image.split("/").pop();
    return `/images/${fileName}`;
  };

  const handSearch = () => {
    const searchClasses = classes.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    console.log(searchClasses);
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
            result.length > 0 ? (
              <>
                {result?.map((product) => (
                  <div
                    key={product.id}
                    className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-colors bg-white"
                  >
                    <div
                      className="relative"
                      onClick={() => navigate(`/classes/${product.id}`)}
                    >
                      <img
                        src={getImageSrc(product.image)}
                        alt={product.name || "class"}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded">
                        ${product.price}
                      </div>
                    </div>

                    <h2 className="font-bold text-xl mt-3">{product.name}</h2>

                    <p className="text-gray-500 mt-2 text-sm h-16 overflow-hidden">
                      {product.description}
                    </p>

                    <button
                      onClick={() => dispatch(addtoCart(product))}
                      className="mt-4 px-4 py-2 rounded w-full bg-teal-500 hover:bg-teal-600 font-bold text-white cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-full flex justify-center  items-center min-h-[60vh]">
                <p className="text-xl font-semibold">Không tìm thấy sản phẩm</p>
              </div>
            )
          ) : result.length > 0 ? (
            <>
              {result.map((product) => (
                <Link
                  to={`/classes/${product.id}`}
                  key={product.id}
                  className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-colors bg-white"
                  onClick={() => navigate(`/classes/${product.id}`)}
                >
                  <div className="relative">
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name || "class"}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded">
                      ${product.price}
                    </div>
                  </div>

                  <h2 className="font-bold text-xl mt-3">{product.name}</h2>

                  <p className="text-gray-500 mt-2 text-sm h-16 overflow-hidden">
                    {product.description}
                  </p>

                  <Link to="/login">
                    <button className="mt-4 px-4 py-2 rounded w-full bg-teal-500 hover:bg-teal-600 font-bold text-white cursor-pointer">
                      Add to cart
                    </button>
                  </Link>
                </Link>
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
