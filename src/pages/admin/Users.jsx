import { useGetUsersQuery } from "../../feature/UserApi";
import {
  FiTrash2,
  FiEdit3,
  FiPlus,
} from "react-icons/fi";
function Users() {
  const {data, isLoading} = useGetUsersQuery();
  console.log(data)
  const danhsachUsers = data?.user;
  if (isLoading) {
  return <p>Loading...</p>;
}
  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">
            Danh sách tài khoản
          </h3>
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-sm">
            <FiPlus className="w-4 h-4" /> Thêm User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse ">
            <thead>
              <tr className="border border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Họ và tên</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className=" text-sm text-slate-600">
              {danhsachUsers?.map((u) => (
                <tr key={u._id} className="border border-slate-200/55 hover:bg-teal-500 group transition-all duration-500">
                  <td className="px-8 py-4 text-slate-400 font-mono group-hover:text-white">
                    #{u._id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-white">
                    {u.fullName}
                  </td>
                  <td className="px-6 py-4 group-hover:text-white">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-3 ">
                    <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors group-hover:text-white">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:text-white">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
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

export default Users;
