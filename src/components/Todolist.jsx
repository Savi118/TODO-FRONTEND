import ActiveTodo from "./ActiveTodo";
import CompleteTodo from "./CompleteTodo";
const Todolist = ({ todos, refreshTodos }) => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);
  
  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Tasks
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {activeTodos.length} active • {completeTodos.length} completed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row min-h-[60vh]">
          <ActiveTodo todos={activeTodos} refreshTodos={refreshTodos} />
          <CompleteTodo todos={completeTodos} refreshTodos={refreshTodos} />
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 border-t border-gray-200/50">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Active Tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Total: {todos.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
