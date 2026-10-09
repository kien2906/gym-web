import { useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../feature/UserApi";
import { FiTrash2, FiEdit3, FiPlus } from "react-icons/fi";
import AddUser from "../../components/AddUser";

function Users() {
  const { data, isLoading } = useGetUsersQuery();
  const danhsachUsers = data?.user;
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [showModal, setModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user);
  const handEditUser = (id) => {
    const findUser = danhsachUsers.find((user) => user._id === id);

    setUser(findUser);
    setModal(true);
  };

  const handlDelete = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      console.log(res.success);
      if (res.success) {
        setShowSuccess(true);
        console.log(showSuccess);
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  const handleSubmitUser = async (formData, id) => {
    try {
      if (id) {
        const res = await updateUser({
          id: id,
          data: formData,
        }).unwrap();
        console.log(res);
      } else {
        const res = await createUser(formData).unwrap();

        console.log(res);
      }
    } catch (error) {
      console.log("ERROR:", error);
      console.log("ERROR DATA:", error?.data);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {showSuccess && (
        <div
          className={`fixed top-5 right-5 w-64 animate-[slideFadeOut_2s_ease-in_forwards] overflow-hidden rounded-md`}
        >
          <div
            className={` p-2  ${showSuccess ? "bg-green-400 " : "bg-red-500"}`}
          >
            <p className="font-medium text-white">
              {" "}
              {showSuccess ? "Xóa user thành công" : "Xóa user thất bại"}
            </p>
          </div>
          <div className="w-full bg-white  ">
            <div className=" h-2 w-3 bg-sky-500 animate-[progressFill_2s_ease-in_forwards]"></div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn  mx-auto ">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">
            Danh sách tài khoản
          </h3>
          <button
            onClick={() => setModal((pre) => !pre)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-sm"
          >
            <FiPlus className="w-4 h-4" /> Thêm User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse  ">
            <thead>
              <tr className="border border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Họ và tên</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className=" text-sm text-slate-600 ">
              {danhsachUsers?.map((u) => (
                <tr
                  key={u._id}
                  className="border border-slate-200/55 hover:bg-teal-500 group transition-all duration-500"
                >
                  <td className="px-8 py-4 text-slate-400 font-mono group-hover:text-white">
                    #{u._id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-white">
                    {u.fullName}
                  </td>
                  <td className="px-6 py-4 group-hover:text-white">
                    {u.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`bg-blue-50  px-2.5 py-1 rounded-full text-xs font-bold uppercase ${u.role === "admin" ? "text-red-600" : "text-blue-600"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="p-2 text-slate-400 hover:text-blue-500 transition-colors group-hover:text-white"
                        onClick={() => handEditUser(u._id)}
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>

                      <button
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:text-white"
                        onClick={() => handlDelete(u._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddUser
          isOpen={showModal}
          isClose={() => {
            setModal(false);
            setUser(null);
          }}
          onSubmit={handleSubmitUser}
          User={user}
        />
      </div>
    </>
  );
}

export default Users;
