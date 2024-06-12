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
              <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            )}
            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-1 ml-2 rounded">
              Delete
            </button>
            <button
              onClick={() => {
                setEditIndex(index);
                setEditValue(todo.text);
              }}
              className="bg-yellow-500 text-white p-1 ml-2 rounded"
            >
              Edit
            </button>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(index)} className="ml-2" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
