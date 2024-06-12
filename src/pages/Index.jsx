// Complete the Index page component here
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
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
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
