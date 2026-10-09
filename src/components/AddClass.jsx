import Modal from "./Modal";
import { useGetTrainersQuery } from "../feature/trainersApi";
import { useEffect, useState } from "react";
import { ImagePlus, Plus } from "lucide-react";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100";

function AddClass({ isOpen, onClose, onSubmit, classData = null }) {
  console.log(classData);
  const { data } = useGetTrainersQuery();
  const [scheduleInput, setScheduleInput] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "",
    duration: "",
    status: "open",
    trainer: "",
    image: null,
    schedule: [],
    benefits: [],
  });

  const hanldeChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setErrors((previous) => ({
          ...previous,
          image: "Ảnh phải có định dạng PNG hoặc JPG.",
        }));
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((previous) => ({
          ...previous,
          image: "Kích thước ảnh không được vượt quá 5MB.",
        }));
        e.target.value = "";
        return;
      }
      setFormData((pre) => ({
        ...pre,
        [name]: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
      setErrors((previous) => ({ ...previous, image: "" }));
      return;
    }

    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
    setErrors((previous) => ({ ...previous, [name]: "", submit: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const price = Number(formData.price);
    const capacity = Number(formData.capacity);
    const duration = Number(formData.duration);

    if (!formData.name.trim()) nextErrors.name = "Vui lòng nhập tên lớp.";
    if (!formData.description.trim())
      nextErrors.description = "Vui lòng nhập mô tả lớp.";
    if (!formData.price || !Number.isFinite(price) || price <= 0)
      nextErrors.price = "Giá lớp phải lớn hơn 0.";
    if (!formData.capacity || !Number.isInteger(capacity) || capacity < 1)
      nextErrors.capacity = "Số lượng phải là số nguyên lớn hơn 0.";
    if (!formData.duration || !Number.isFinite(duration) || duration < 30)
      nextErrors.duration = "Thời gian tập tối thiểu là 30 phút.";
    if (!formData.trainer)
      nextErrors.trainer = "Vui lòng chọn huấn luyện viên.";
    if (!classData?.image && !formData.image)
      nextErrors.image = "Vui lòng chọn ảnh cho lớp.";
    if (!formData.status) nextErrors.status = "Vui lòng chọn trạng thái lớp.";
    if (!scheduleInput.day) nextErrors.day = "Vui lòng chọn ngày học.";
    if (!scheduleInput.startTime)
      nextErrors.startTime = "Vui lòng chọn giờ bắt đầu.";
    if (!scheduleInput.endTime)
      nextErrors.endTime = "Vui lòng chọn giờ kết thúc.";
    else if (
      scheduleInput.startTime &&
      scheduleInput.endTime <= scheduleInput.startTime
    )
      nextErrors.endTime = "Giờ kết thúc phải sau giờ bắt đầu.";
    if (formData.benefits.filter((benefit) => benefit.trim()).length !== 4)
      nextErrors.benefits = "Vui lòng nhập đủ 4 quyền lợi, không để trống.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    try {
      setIsSubmitting(true);
      const form = new FormData();

      form.append("name", formData.name.trim());
      form.append("description", formData.description.trim());
      form.append("price", formData.price);
      form.append("capacity", formData.capacity);
      form.append("duration", formData.duration);
      form.append("status", formData.status);
      form.append("trainer", formData.trainer);

      if (formData.image) {
        form.append("image", formData.image);
      }

      form.append(
        "schedule",
        JSON.stringify([
          {
            day: scheduleInput.day,
            startTime: scheduleInput.startTime,
            endTime: scheduleInput.endTime,
          },
        ]),
      );
      form.append("benefits", JSON.stringify(formData.benefits));

      if (classData) {
        await onSubmit(form, classData._id);
      } else {
        await onSubmit(form);
      }
      resetForm();
    } catch (error) {
      console.log(error);
      setErrors((previous) => ({
        ...previous,
        submit:
          error?.data?.message ||
          error?.message ||
          "Không thể lưu lớp. Vui lòng thử lại.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      capacity: "",
      duration: "",
      status: "open",
      trainer: "",
      image: null,
      schedule: [],
      benefits: [],
    });

    setScheduleInput({
      day: "",
      startTime: "",
      endTime: "",
    });

    setBenefitInput("");
    setPreviewImage(null);
    setErrors({});
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleScheduleChange = (field, value) => {
    setScheduleInput((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({
      ...previous,
      [field]: "",
      submit: "",
      ...(field === "startTime" ? { endTime: "" } : {}),
    }));
  };

  useEffect(() => {
    setErrors({});
    if (classData) {
      // Keep the edit form in sync when its selected class changes.
      setFormData({
        name: classData.name || "",
        description: classData.description || "",
        price: classData.price || "",
        capacity: classData.capacity || "",
        duration: classData.duration || "",
        status: classData.status || "open",
        trainer: classData.trainer?._id || "",
        image: null,
        schedule: classData.schedule || [],
        benefits: classData.benefits || [],
      });
      if (classData?.image) {
        setPreviewImage(`http://localhost:3001/uploads/${classData.image}`);
      }

      if (classData?.schedule?.length > 0) {
        setScheduleInput({
          day: classData.schedule[0].day || "",
          startTime: classData.schedule[0].startTime || "",
          endTime: classData.schedule[0].endTime || "",
        });
      } else {
        setScheduleInput({ day: "", startTime: "", endTime: "" });
      }
    } else {
      resetForm();
    }
  }, [classData]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={classData ? "Sửa class" : "Thêm class"}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {Object.values(errors).some(Boolean) && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <p className="font-semibold">Vui lòng kiểm tra lại thông tin:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {Object.values(errors)
                .filter(Boolean)
                .map((message, index) => (
                  <li key={`${message}-${index}`}>{message}</li>
                ))}
            </ul>
          </div>
        )}

        {/* Name */}
        <div>
          <label className={labelClass}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={hanldeChange}
            placeholder="Nhập tên class"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass(errors.name)}
          />
          <FieldError message={errors.name} />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows="3"
            placeholder="Nhập mô tả..."
            name="description"
            onChange={hanldeChange}
            value={formData.description}
            aria-invalid={Boolean(errors.description)}
            className={fieldClass(errors.description, "resize-y")}
          />
          <FieldError message={errors.description} />
        </div>

        {/* Price + Quantity */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Giá</label>
            <input
              type="number"
              name="price"
              min="1"
              value={formData.price}
              placeholder="Giá class..."
              onChange={hanldeChange}
              aria-invalid={Boolean(errors.price)}
              className={fieldClass(errors.price)}
            />
            <FieldError message={errors.price} />
          </div>

          <div>
            <label className={labelClass}>Số lượng</label>
            <input
              type="number"
              placeholder="Số lượng..."
              aria-invalid={Boolean(errors.capacity)}
              className={fieldClass(errors.capacity)}
              name="capacity"
              min="1"
              onChange={hanldeChange}
              value={formData.capacity}
            />
            <FieldError message={errors.capacity} />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className={labelClass}>Thời gian</label>
          <input
            type="number"
            name="duration"
            min="30"
            onChange={hanldeChange}
            value={formData.duration}
            placeholder="Thời gian..."
            aria-invalid={Boolean(errors.duration)}
            className={fieldClass(errors.duration)}
          />
          <FieldError message={errors.duration} />
        </div>

        {/* Trainer */}
        <div>
          <label className={labelClass}>Trainer</label>
          <select
            name="trainer"
            value={formData.trainer}
            onChange={hanldeChange}
            aria-invalid={Boolean(errors.trainer)}
            className={fieldClass(errors.trainer)}
          >
            <option value="">-- Chọn Trainer --</option>
            {data?.trainers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.fullName}
              </option>
            ))}
          </select>
          <FieldError message={errors.trainer} />
        </div>

        {/* Image */}
        <div>
          <label className={labelClass}>Image Class</label>

          <label
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50/70 px-4 py-6 transition hover:border-teal-400 hover:bg-teal-50/40 ${
              errors.image ? "border-rose-400" : "border-slate-300"
            }`}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="h-48 w-full rounded-lg object-contain"
              />
            ) : (
              <>
                <div className="mb-2 rounded-full bg-white p-3 text-slate-400 shadow-sm transition group-hover:text-teal-500">
                  <ImagePlus className="h-7 w-7" />
                </div>

                <p className="text-sm font-semibold text-slate-800">
                  Click để chọn ảnh
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG hoặc JPEG • Tối đa 5MB
                </p>
              </>
            )}

            <input
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={hanldeChange}
            />
          </label>
          <FieldError message={errors.image} />
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>

          <select
            name="status"
            onChange={hanldeChange}
            value={formData.status}
            aria-invalid={Boolean(errors.status)}
            className={fieldClass(errors.status)}
          >
            <option value="open">Open</option>
            <option value="closed">Close</option>
          </select>
          <FieldError message={errors.status} />
        </div>

        {/* Schedule */}
        <div className="">
          <label className={labelClass}>Lịch học</label>

          <div className="mt-2 grid items-center gap-3 sm:grid-cols-3">
            <select
              value={scheduleInput.day}
              onChange={(e) => handleScheduleChange("day", e.target.value)}
              aria-invalid={Boolean(errors.day)}
              className={`${fieldClass(errors.day)} text-center`}
            >
              <option value="">--Select day--</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>

            <input
              type="time"
              value={scheduleInput.startTime}
              onChange={(e) =>
                handleScheduleChange("startTime", e.target.value)
              }
              onClick={(e) => e.currentTarget.showPicker()}
              aria-invalid={Boolean(errors.startTime)}
              className={fieldClass(errors.startTime)}
            />
            <input
              type="time"
              value={scheduleInput.endTime}
              onChange={(e) => handleScheduleChange("endTime", e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              aria-invalid={Boolean(errors.endTime)}
              className={`${fieldClass(errors.endTime)} cursor-pointer`}
            />
          </div>
          <div className="mt-1 grid gap-1 sm:grid-cols-3">
            <FieldError message={errors.day} />
            <FieldError message={errors.startTime} />
            <FieldError message={errors.endTime} />
          </div>
        </div>

        {/* Benefit */}
        {/* Benefits */}
        <div>
          <label className={labelClass}>Benefits</label>

          <div className="flex gap-2">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              placeholder="VD: Được tập luyện với Trainer"
              className={`${inputClass} min-w-0 flex-1`}
            />

            <button
              type="button"
              onClick={() => {
                setFormData((pre) => ({
                  ...pre,
                  benefits: [...pre.benefits, benefitInput.trim()],
                }));
                setBenefitInput("");
                setErrors((previous) => ({
                  ...previous,
                  benefits: "",
                  submit: "",
                }));
              }}
              disabled={!benefitInput.trim() || formData.benefits.length >= 4}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Thêm
            </button>
          </div>

          {/* Danh sách benefits */}
          <div className="mt-2 space-y-2">
            {formData?.benefits?.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                <span>
                  {index + 1}. {benefit}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      benefits: prev.benefits.filter((_, i) => i !== index),
                    }));
                    setErrors((previous) => ({
                      ...previous,
                      benefits: "",
                      submit: "",
                    }));
                  }}
                  className="text-sm font-semibold text-rose-500 transition hover:text-rose-700"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {formData.benefits.length}/4 benefits
          </p>
          <FieldError message={errors.benefits} />
        </div>

        {/* Button */}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Hủy
          </button>

          <button
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
          >
            {isSubmitting ? "Đang lưu..." : classData ? "Lưu lớp" : "Thêm lớp"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function fieldClass(error, extraClass = "") {
  return `${inputClass} ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : ""} ${extraClass}`;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-rose-600">{message}</p>;
}

export default AddClass;
