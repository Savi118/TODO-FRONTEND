import Todo from "./Todo";

const ActiveTodo = ({ todos, refreshTodos }) => {
  return (
    <div className="w-full lg:w-[50%] min-h-full flex flex-col p-6 border-r border-gray-200/50 lg:border-r-0 lg:border-b-0 border-b lg:border-r">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-800">
            Active Tasks
          </h3>
          <p className="text-sm text-gray-500">{todos.length} tasks to complete</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[50vh] lg:max-h-none">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No active tasks</p>
            <p className="text-gray-400 text-xs mt-1">Create your first task to get started!</p>
          </div>
        ) : (
          todos.map((todo, index) => (
            <div 
              key={todo._id} 
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Todo todo={todo} refreshTodos={refreshTodos} />
            </div>
          ))
        )}
      </div>

      {/* Progress Bar */}
      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Progress</span>
            <span>{todos.length} pending</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveTodo;
