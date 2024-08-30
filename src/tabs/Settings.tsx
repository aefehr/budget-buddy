import React, { useState } from 'react';

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const Settings = ({
  budget,
  setBudget,
  updateBudget,
}: {
  budget: Budget;
  setBudget: (budget: Budget) => void;
  updateBudget: () => void;
}) => {
  const [newCategory, setNewCategory] = useState({ name: '', total: 0 });

  // Handle category deletion
  const handleDeleteCategory = (categoryName: string) => {
    const updatedBudget = { ...budget };
    delete updatedBudget[categoryName];

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); // Update the local state to reflect the deletion
      updateBudget(); // Refresh the budget data
    });
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.total > 0) {
      const updatedBudget = {
        ...budget,
        [newCategory.name]: {
          spent: 0,
          total: newCategory.total,
        },
      };

      chrome.storage.local.set({ budget: updatedBudget }, () => {
        setBudget(updatedBudget); // Update the local state to reflect the new category
        setNewCategory({ name: '', total: 0 }); // Reset the input fields
      });
    }
  };

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='header'>Settings</h1>

      {/* Manage Categories */}
      <h2 className='subheader'>Manage Categories</h2>
      {Object.keys(budget).length > 0 ? (
        Object.keys(budget).map((categoryName, index) => (
          <div
            key={index}
            style={{
              marginBottom: '8px',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className='category-name'>{categoryName}</span>
            <button
              onClick={() => handleDeleteCategory(categoryName)}
              style={{
                backgroundColor: '#D9534F',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}

      {/* Add New Category */}
      <div style={{ marginTop: '24px' }}>
        <h3 className='subheader'>Add a New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="number"
          placeholder="Total Budget"
          value={newCategory.total}
          onChange={(e) => setNewCategory({ ...newCategory, total: parseFloat(e.target.value) })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button className='add-button' onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Settings;



