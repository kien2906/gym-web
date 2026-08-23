import { useEffect, useState } from "react";
import {
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useGetOrderQuery } from "../feature/TransactionsApi";

const Transactions = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const { data, isLoading, isFetching } = useGetOrderQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const order = data?.result;
  const lengthData = data?.result?.length;

  // Giả sử dữ liệu của bạn là mảng orders
  useEffect(() => {
    if (!order || !Array.isArray(order)) {
      setResult([]);
      return;
    }
    const keyword = searchTerm.toLowerCase() || "";

    const searchResult = order?.filter((item) => {
      const rawDate = item?.payment?.createdAt;
      const code = item?.payment?.transactionCode.toLowerCase() || "";

      const matchSearch = keyword ? code.includes(keyword) : true;
      const matchDate = searchDate
        ? searchDate === new Date(rawDate).toLocaleDateString("en-CA")
        : true;

      return matchDate && matchSearch;
    });
    setResult(searchResult);
  }, [order, searchTerm, searchDate]);

  if (isLoading || isFetching) {
    return (
      <>
        <div
          className={`min-h-[80vh] pt-20 pb-12  transition-colors duration-200 max-w-6xl mx-auto `}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <History className="text-teal-400" size={32} />
              Lịch sử giao dịch
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Quản lý và xem lại toàn bộ hóa đơn thanh toán của bạn
            </p>
          </div>
          <div
            className={`p-4 rounded-2xl mb-6 border flex flex-col md:flex-row gap-4 justify-between items-center ${
              darkMode
                ? "bg-gray-900/60 border-gray-800"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            {/* Ô Nhập Tìm kiếm */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm theo mã ID, tên dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-teal-400 transition ${
                  darkMode
                    ? "bg-black border-gray-800 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-black placeholder-gray-400"
                }`}
              />
            </div>
            <input
              type="date"
              className="border p-2 rounded-full"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-300">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr
                  className={`text-xs uppercase tracking-wider border-b ${
                    darkMode
                      ? "bg-gray-900/80 border-gray-800 text-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  <th className="py-4 px-6 w-[22%]">Giao dịch</th>

                  <th className="py-4 px-6 w-[18%]">Phương thức</th>

                  <th className="py-4 px-6 w-[25%]">Thời gian</th>

                  <th className="py-4 px-6 w-[15%]">Trạng thái</th>

                  <th className="py-4 px-6 w-[20%] text-right">Số tiền</th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="animate-pulse border-b border-gray-200"
                  >
                    <td className="py-4 px-6">
                      <div className="h-4 w-20 rounded bg-gray-300"></div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="h-4 w-20 rounded bg-gray-300"></div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="h-4 w-32 rounded bg-gray-300"></div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="h-6 w-24 rounded-full bg-gray-300"></div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="h-4 w-24 ml-auto rounded bg-gray-300"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <div
      className={`min-h-[80vh] pt-28 pb-12 px-6 md:px-16 transition-colors duration-200 ${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <History className="text-teal-400" size={32} />
            Lịch sử giao dịch
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Quản lý và xem lại toàn bộ hóa đơn thanh toán của bạn
          </p>
        </div>

        {/* Thanh Tìm kiếm & Bộ lọc */}
        <div
          className={`p-4 rounded-2xl mb-6 border flex flex-col md:flex-row gap-4 justify-between items-center ${
            darkMode
              ? "bg-gray-900/60 border-gray-800"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          {/* Ô Nhập Tìm kiếm */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm theo mã ID, tên dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-teal-400 transition ${
                darkMode
                  ? "bg-black border-gray-800 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-black placeholder-gray-400"
              }`}
            />
          </div>
          <input
            type="date"
            className="border p-2 rounded-full"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {/* Bảng Dữ Liệu */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-900/40 border-gray-800"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-xs uppercase tracking-wider border-b ${
                    darkMode
                      ? "bg-gray-900/80 border-gray-800 text-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  <th className="py-4 px-6">Giao dịch</th>
                  <th className="py-4 px-6">Phương thức</th>
                  <th className="py-4 px-6">Thời gian</th>
                  <th className="py-4 px-6">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Số tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                {result?.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-teal-500 transition duration-150 group"
                  >
                    {/* Mã giao dịch */}
                    <td className="py-4 px-6 font-bold text-gray-800 dark:text-gray-200">
                      {item?.payment?.transactionCode || "N/A"}
                    </td>

                    {/* Phương thức thanh toán */}
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium group-hover:text-white">
                      {item?.payment?.paymentMethod || "N/A"}
                    </td>

                    {/* Thời gian */}
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400 text-xs group-hover:text-white">
                      {item?.payment?.createdAt
                        ? new Date(item.payment.createdAt).toLocaleString(
                            "vi-VN",
                          )
                        : "N/A"}
                    </td>

                    {/* Trạng thái */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 ">
                        {item?.payment?.status || "N/A"}
                      </span>
                    </td>

                    {/* Số tiền (Căn phải cho khớp với header) */}
                    <td className="py-4 px-6 text-right font-bold text-teal-600 dark:text-teal-400 group-hover:text-white">
                      {Number(item?.payment?.amount || 0).toLocaleString(
                        "vi-VN",
                      )}{" "}
                      đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
