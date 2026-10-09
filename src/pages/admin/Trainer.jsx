
import { FiEdit3, FiPlus, FiTrash2 } from "react-icons/fi";
import { useGetTrainersQuery } from "../../feature/trainersApi";

function Trainer() {
  const { data } = useGetTrainersQuery();
  console.log(data?.trainers);

  const trainer = data?.trainers || [];
  return (
    <div className=" bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden ">
      <div className="flex justify-between p-6  ">
        <h2 className="font-bold  text-lg text-slate-800">Danh sách Trainer</h2>
        <div>
          <button className="bg-teal-500 text-white text-sm font-bold rounded-2xl px-4 py-2  font-bold transition-all shadow-sm flex items-center gap-2 hover:bg-teal-700">
            <FiPlus className="w-4 h-4" />
            Thêm Trainer
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left  border-collapse  ">
          <thead>
            <tr className="border border-slate-100 bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Fullname</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Specialty</th>
              <th className="px-6 py-4">Experience </th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className=" text-sm text-slate-600">
            {trainer.map((item) => (
              <tr
                key={item._id}
                className="border border-slate-200/55 hover:bg-teal-500 group transition-all duration-500"
              >
                <td className="px-6 py-4 ">
                  <img
                    src={`http://localhost:3001/uploads/${item.avatar}`}
                    alt="anhloi"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-6 py-4 group-hover:text-white">
                  <span className="bg-blue-50 text-blue-500 shadow-sm px-2.5 py-1 rounded-full font-bold  text-xs  uppercase">
                    {item.fullName}
                  </span>
                </td>
                <td className="px-6 py-4 group-hover:text-white">
                  {item.email}
                </td>
                <td className="px-6 py-4 group-hover:text-white">
                  {item.specialty}
                </td>
                <td className="px-10 py-4 group-hover:text-white">
                  {item.experience}
                </td>
                <td className="px-6 py-4   ">
                  <div className="flex items-center gap-5  transition-colors">
                    <button className="group-hover:text-white">
                      {" "}
                      <FiEdit3 className="w-4 h-4 hover:text-blue-500" />
                    </button>
                    <button className="group-hover:text-white hover:text-red-500 transition-colors">
                      {" "}
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trainer;
