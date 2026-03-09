"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    // 使用漸層背景與更柔和的內距
    <main className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* 標題設計優化 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 w-2 h-8 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tight text-indigo-900">SADo App</h1>
        </div>

        {/* 輸入區塊優化：修正 type 並增加 focus 特效 */}
        <div className="flex gap-2 mb-8">
          <input
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="今天打算做什麼？"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
          />
          <button 
            onClick={addTodo} 
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
          >
            Add
          </button>
        </div>

        {/* 狀態顯示 */}
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">任務清單</h2>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            {todos.filter(t => !t.done).length} 待完成
          </span>
        </div>

        {todos.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 italic">目前沒有任何任務，放鬆一下吧！</p>
          </div>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center gap-3 p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-indigo-100 transition-all"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className={`flex-1 text-base transition-all ${todo.done ? "line-through text-gray-400" : "text-slate-700 font-medium"}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="opacity-0 group-hover:opacity-100 text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all text-sm font-semibold"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 頁尾小提示 */}
      <footer className="mt-8 text-center text-gray-400 text-xs">
        SADo App · Git Workflow Practice
      </footer>
    </main>
  );
}
