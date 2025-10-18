import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import ToastModal from "./ToastModal";


const EditTodoModal = ({ todo, isOpen, onClose, refreshTodos }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate ? todo.dueDate.split("T")[0] : "",
      });
    }
  }, [todo, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/todo/${todo._id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setToast({ message: "Todo updated successfully", type: "success" });
      refreshTodos();
      onClose();
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Failed to update todo",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-xl shadow-2xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 20, message: "Max 20 chars" },
            })}
            placeholder="Title"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            {...register("description", { maxLength: { value: 30, message: "Max 30 chars" } })}
            placeholder="Description"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            {...register("dueDate", { required: "Due Date is required" })}
            className="border px-3 py-2 rounded-lg"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-400 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
      <ToastModal message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
    </>
  );
};

export default EditTodoModal;
