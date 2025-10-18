import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import Todolist from "../components/Todolist";
import api from "../utils/api";

const AppPage = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchTodos = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/todo/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data.todos || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  return (
    <div className="min-h-[92vh] w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[92vh] flex flex-col lg:flex-row lg:space-x-8 px-4 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-0">
        {/* Welcome Header */}
        <div className="lg:hidden w-full mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Welcome back!</h1>
                <p className="text-gray-600 text-sm">Let's make today productive</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 lg:max-w-sm">
          <TodoForm user={user} refreshTodos={fetchTodos} />
        </div>
        
        <div className="flex-2 lg:max-w-4xl">
          <Todolist user={user} todos={todos} refreshTodos={fetchTodos} />
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="flex flex-col space-y-3">
          {/* Stats Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{todos.length}</div>
              <div className="text-xs text-gray-600">Total Tasks</div>
            </div>
          </div>
          
          {/* Quick Add Button */}
          <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
