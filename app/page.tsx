"use client";

import { useState } from "react";
// 1. 這裡先宣告一個模擬 AI 的 function，方便你不用設定 Key 也能測試
// 之後你可以改寫成真正的 API 呼叫

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  }

  // 2. 新增 AI 拆解任務的功能
  async function aiDecompose() {
    if (!input.trim()) return;
    setIsLoading(true);
    
    // 模擬 AI 回傳延遲與結果 (未來這裡可串接 Google Gemini)
    setTimeout(() => {
      const aiResults = [
        `規劃 ${input} 的時程`,
        `準備 ${input} 所需資料`,
        `執行 ${input} 第一階段`
      ];
      
      const newTodos = aiResults.map(text => ({
        id: Date.now() + Math.random(),
        text: text,
        done: false
      }));

      setTodos([...todos, ...newTodos]);
      setInput("");
      setIsLoading(false);
    }, 1000);
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 w-2 h-8 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tight text-indigo-900">SADo App <span className="text-sm font-normal text-indigo-400">AI Plus</span></h1>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <input
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="今天打算做什麼？"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <div className="flex gap-2">
            <button 
              onClick={addTodo} 
              className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
            >
              Add
            </button>
            {/* 3. AI 魔法按鈕 */}
            <button 
              onClick={aiDecompose}
              disabled={isLoading}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-50"
            >
              {isLoading ? "AI 思考中..." : "✨ AI 拆解"}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">任務清單</h2>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            {todos.filter(t => !t.done).length} 待完成
          </span>
        </div>

        {todos.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 italic">目前沒有任何任務，試試 AI 拆解功能吧！</p>
          </div>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="group flex items-center gap-3 p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded-md border-gray-300 text-indigo-600 cursor-pointer"
              />
              <span className={`flex-1 text-base ${todo.done ? "line-through text-gray-400" : "text-slate-700 font-medium"}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="opacity-0 group-hover:opacity-100 text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all">
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <footer className="mt-8 text-center text-gray-400 text-xs">
        SADo App · AI Workflow Integration
      </footer>
    </main>
  );
}
