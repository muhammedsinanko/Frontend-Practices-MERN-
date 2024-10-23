import React, { useState } from 'react';

function App() {
  // Declare state for list items and input value
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState(''); 
  const [isEditing, setIsEditing] = useState(null); // Track which item is being edited
  const [editValue, setEditValue] = useState(''); // Track value being edited

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add a new item to the list
  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Delete an item from the list
  const deleteItem = (indexToRemove) => {
    setItems(items.filter((item, index) => index !== indexToRemove));
  };

  // Enable editing mode for a particular item
  const startEditing = (index) => {
    setIsEditing(index); // Set the index of the item being edited
    setEditValue(items[index]); // Set the initial value of the item in the input
  };

  // Save the edited item
  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = editValue; // Update the specific item
    setItems(updatedItems);
    setIsEditing(null); // Exit editing mode
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create, Edit, and Manage a List</h2>

      {/* Input field to add new items */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter an item"
      />
      <button onClick={addItem}>Add</button>

      {/* List of items */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {/* If the item is being edited, show an input field */}
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {item}
                <button
                  onClick={() => startEditing(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
              </>
            )}

            {/* Delete button */}
            <button
              onClick={() => deleteItem(index)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;