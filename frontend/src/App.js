import React, { useState, useEffect } from "react";

function App() {
  const [item, setItem] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("https://basic-backend-tsz5.onrender.com/api/items")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  const addItem = async () => {
    const res = await fetch(
      "https://basic-backend-tsz5.onrender.com/api/item",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem }),
      }
    );
    const data = await res.json();
    setItem([...item, data]);
    setNewItem("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Simple MERN App</h1>
      <div className="w-full max-w-md">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="bg-white shadow-md rounded-lg p-4">
          {item.map((item) => (
            <li
              key={item._id}
              className="py-2 border-b last:border-b-0 text-gray-700"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
