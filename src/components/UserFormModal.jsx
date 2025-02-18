import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserFormModal = ({ editId, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (editId) {
      setValue("fullName", editId.fullName);
      setValue("age", editId.age);
      setValue("location", editId.location);
      setValue("gender", editId.gender);
    } else {
      reset();
    }
  }, [editId, setValue, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-[1px]">
      <div className="bg-white p-6 shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Full Name is required" })}
            className="p-2 border w-full"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}

          <input
            type="number"
            placeholder="Age"
            {...register("age", { required: "Age is required" })}
            className="p-2 border w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}

          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
            className="p-2 border w-full"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}

          <select
            {...register("gender", { required: "Gender is required" })}
            className="p-2 border w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-600 transition"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
