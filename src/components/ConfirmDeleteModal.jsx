import React from "react";

function ConfirmDeleteModal({
  title = "Xác nhận xóa",
  message = "Bạn có chắc muốn xóa không?",
  onCancel,
onConfirm

}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[320px] rounded-xl bg-white p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            
            className="flex-1 rounded-lg bg-red-500 py-2 text-sm text-white hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
