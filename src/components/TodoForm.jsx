import { useForm } from "react-hook-form";
import api from "../utils/api";
import { useState } from "react";
import ToastModal from "./ToastModal";

const TodoForm = ({ user, refreshTodos }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [toast, setToast] = useState({ message: "", type: "" });

  const onSubmit = async (data) => {
    if (!user) {
      setToast({ message: "User not logged in", type: "error" });
      return;
    }
    try {
      await api.post("/todo/create", data);
      setToast({ message: "Task added Successfully", type: "success" });
      reset();
      refreshTodos();
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const handleFormErrors = () => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]?.message;
      setToast({ message: firstError, type: "error" });
    }
  };
  return (
    <>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit, handleFormErrors)}
          className="bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center p-6 shadow-2xl border border-white/20 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Task
            </h2>
            <p className="text-gray-600 text-sm">Organize your thoughts into actionable items</p>
          </div>

          {/* Form Fields */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 20,
                    message: "Title can't be exceed 20 Characters",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                placeholder="What needs to be done?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                {...register("description", {
                  maxLength: {
                    value: 30,
                    message: "Description can't be exceed 30 Characters",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                placeholder="Add more details (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                {...register("dueDate", { required: "Due Date is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-95"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Task...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Task</span>
              </div>
            )}
          </button>

          {/* Quick Tips */}
          <div className="w-full bg-blue-50 rounded-xl p-3 space-y-1">
            <p className="text-xs font-medium text-blue-800 mb-2">💡 Quick Tips:</p>
            <div className="space-y-1">
              <p className="text-xs text-blue-700">• Keep titles short and clear</p>
              <p className="text-xs text-blue-700">• Set realistic due dates</p>
              <p className="text-xs text-blue-700">• Break large tasks into smaller ones</p>
            </div>
          </div>
        </form>
      </div>

      <ToastModal
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </>
  );
};

export default TodoForm;
