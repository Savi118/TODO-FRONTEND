// components/ToastModal.jsx
import { useEffect } from "react";

const ToastModal = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-600";

  return (
    <div
      className="fixed bottom-5 right-5 flex items-center gap-3 text-white px-5 py-3 rounded-xl shadow-lg animate-fadeInUp z-50 transition-all duration-300 cursor-pointer"
      onClick={onClose}
      style={{ animation: "fadeInUp 0.3s ease-in-out" }}
    >
      <span className={`font-medium ${bgColor} px-3 py-2 rounded-xl`}>
        {message}
      </span>
    </div>
  );
};

export default ToastModal;
