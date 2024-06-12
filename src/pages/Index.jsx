// Complete the Index page component here
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">
        Interactive To-Do List <FaPlus />
      </h1>
      <div className="mb-4">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border p-2 mr-2" placeholder="Add a new task" />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2">
            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-1 ml-2 rounded">
              Delete
            </button>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(index)} className="ml-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
