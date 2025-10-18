
import Todo from "./Todo";

const CompleteTodo = ({todos, refreshTodos}) => {
  return (
    <div className="w-full lg:w-[50%] min-h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-800">
            Completed Tasks
          </h3>
          <p className="text-sm text-gray-500">{todos.length} tasks finished</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[50vh] lg:max-h-none">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No completed tasks</p>
            <p className="text-gray-400 text-xs mt-1">Complete some tasks to see them here!</p>
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

      {/* Completion Stats */}
      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Achievement</span>
            <span>{todos.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{width: '100%'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CompleteTodo;
