// Complete the Index page component here
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
      localStorage.setItem("todos", JSON.stringify([...todos, { text: inputValue, completed: false }]));
    }
  };

  const handleEditTodo = (index, newText) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo));
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-yellow-400">
        🚀 Star Trek To-Do List 🖖 <FaPlus />
      </h1>
      <div className="mb-4 flex justify-center items-center">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border p-2 mr-2 rounded-lg bg-gray-800 text-white placeholder-gray-500" placeholder="📝 Add a new task" />
        <button onClick={handleAddTodo} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300">
          ➕ Add Task
        </button>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2 flex items-center">
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  handleEditTodo(index, editValue);
                  setEditIndex(null);
                }}
                className="border p-2 mr-2"
              />
            ) : (
              <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.text}</span>
            )}
            <button onClick={() => handleDelete(index)} className="bg-red-600 text-white p-1 ml-2 rounded-lg hover:bg-red-700 transition duration-300">
              🗑️ Delete
            </button>
            <button
              onClick={() => {
                setEditIndex(index);
                setEditValue(todo.text);
              }}
              className="bg-yellow-500 text-white p-1 ml-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              ✏️ Edit
            </button>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(index)} className="ml-2 transform scale-150" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
