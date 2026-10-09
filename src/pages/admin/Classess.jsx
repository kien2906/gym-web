import { FiEdit3, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  useCreateClassMutation,
  useDeleteClassMutation,
  useEditClassMutation,
  useGetClassQuery,
} from "../../feature/classApi";

import { useEffect, useState } from "react";
import AddClass from "../../components/AddClass";

function Classess() {
  const [listClass, setListClass] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetClassQuery();
  const [createClass] = useCreateClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  const [selectedClass, setSelectedClass] = useState(null);

  const [editClass] = useEditClassMutation();
  const handleEdit = (id) => {
    const classItem = data?.classes?.find((item) => item._id === id);
    setSelectedClass(classItem);
    setIsOpen(true);
  };

  useEffect(() => {
    setListClass(data);
  }, [data]);
  console.log(data);

  const handleSubmit = async (form, id) => {
    try {
      if (id) {
        await editClass({
          id: selectedClass._id,
          formData: form,
        }).unwrap();
      } else {
        await createClass(form).unwrap();
      }

      setIsOpen(false);
      setSelectedClass(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteClass(id).unwrap();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-center  border-b border-slate-100 ">
        <h2 className="font-bold  text-lg text-slate-800">Danh sách lớp</h2>

        <div>
          <button
            className="bg-teal-500 text-white text-sm font-bold rounded-2xl px-4 py-2  font-bold transition-all shadow-sm flex items-center gap-2 hover:bg-teal-700"
            onClick={() => setIsOpen((pre) => !pre)}
          >
            <FiPlus className="w-4 h-4" />
            Thêm classes
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/55 text-xs text-slate-400 uppercase font-semibold">
              <th className="w-[130px] px-8 py-5">Image</th>
              <th className="w-[220px] px-8 py-5">Class Name</th>
              <th className="w-[200px] px-8 py-5">Trainer</th>
              <th className="w-[150px] px-8 py-5">Price</th>
              <th className="w-[150px] px-8 py-5">Capacity</th>
              <th className="w-[150px] px-8 py-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-base ">
            {listClass?.classes?.map((item) => (
              <tr
                key={item._id}
                className="border border-slate-200/55 hover:bg-teal-500 group transition-all duration-500"
              >
                <td className="px-8 py-5  ">
                  <img
                    src={`http://localhost:3001/uploads/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="px-8 py-5 text-slate-500 text-sm group-hover:text-white">
                  {item.name}
                </td>

                <td className="px-8 py-5">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                    {item.trainer?.fullName}
                  </span>
                </td>

                <td className="px-8 py-5 text-slate-500 group-hover:text-white">
                  {item.price}
                </td>

                <td className="px-8 py-5 text-slate-500 text-sm group-hover:text-white font-medium">
                  {item.capacity}
                </td>

                <td className="px-6 py-5  ">
                  <div className="flex items-center justify-center gap-3 ">
                    <button
                      className="p-2 text-slate-400 hover:text-blue-500 transition-colors group-hover:text-white"
                      onClick={() => handleEdit(item._id)}
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>

                    <button
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:text-white"
                      onClick={() => handleDelete(item._id)}
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
      <AddClass
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedClass(null);
        }}
        onSubmit={handleSubmit}
        classData={selectedClass}
      />
    </div>
  );
}

export default Classess;
