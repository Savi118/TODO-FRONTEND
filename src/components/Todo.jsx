import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import api from "../utils/api";
import EditTodoModal from "./EditTodoModal";
import { useState } from "react";

const Todo = ({ todo, refreshTodos }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleComplete = async () => {
    try {
      await api.patch(`/todo/${todo._id}/toggle`);
      refreshTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const deleteTodo = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/todo/${todo._id}`);
      refreshTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className={`group relative w-full min-h-[8vh] border py-3 px-4 flex flex-col lg:flex-row rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
          todo.completed 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 opacity-90' 
            : 'bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-blue-300/50'
        }`}>
          {/* Checkbox and Content */}
          <div className="w-full lg:w-[70%] flex space-x-3 items-start lg:items-center mb-3 lg:mb-0">
            <div className="relative">
              <input
                type="checkbox"
                name="completed"
                checked={todo.completed}
                onChange={toggleComplete}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 hover:scale-110"
              />
              {todo.completed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm lg:text-base transition-all duration-200 ${
                todo.completed 
                  ? 'text-green-700 line-through opacity-75' 
                  : 'text-gray-800 group-hover:text-blue-700'
              }`}>
                {todo.title}
              </p>
              <p className={`text-xs transition-all duration-200 mt-1 ${
                todo.completed 
                  ? 'text-green-600 line-through opacity-60' 
                  : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                {todo.description}
              </p>
            </div>
          </div>

          {/* Date and Actions */}
          <div className="w-full lg:w-[30%] flex flex-col lg:items-center justify-between space-y-3 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                todo.completed ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
              }`}></div>
              <p className={`text-xs font-medium transition-all duration-200 ${
                todo.completed 
                  ? 'text-green-600' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}>
                {new Date(todo.dueDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex space-x-2 justify-end lg:justify-center">
              <button
                onClick={() => setIsEditOpen(true)}
                className="group/edit relative p-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <FaPencilAlt className="text-white text-xs" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Edit
                </div>
              </button>
              <button 
                onClick={deleteTodo} 
                className="group/delete relative p-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <MdDelete className="text-white text-xs" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Delete
                </div>
              </button>
            </div>
          </div>

          {/* Completion Animation Overlay */}
          {todo.completed && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl pointer-events-none">
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <EditTodoModal
        todo={todo}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        refreshTodos={refreshTodos}
      />
    </>
  );
};

export default Todo;
