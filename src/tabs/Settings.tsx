import React, { useState } from 'react';
import { addRippleEffect } from '../utils/rippleEffect';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<number>(0);

  // Handle category deletion
  const handleDeleteCategory = (categoryName: string) => {
    const updatedBudget = { ...budget };
    delete updatedBudget[categoryName];

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); // Update the local state to reflect the deletion
      updateBudget(); // Refresh the budget data
      setSelectedCategory(''); // Reset selected category
    });
  };

  // Handle adding a new category
  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRippleEffect(e); // Trigger the ripple effect
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

  // Handle resetting the budget
  const handleResetBudget = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRippleEffect(e); // Trigger the ripple effect
    const updatedBudget = { ...budget };

    for (let category in updatedBudget) {
      updatedBudget[category].spent = 0;
    }

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); // Update the local state to reflect the reset
      updateBudget(); // Refresh the budget data
    });
  };

  // Handle updating the budget amount for a category
  const handleSaveBudgetChange = () => {
    const updatedBudget = {
      ...budget,
      [selectedCategory]: {
        ...budget[selectedCategory],
        total: editingCategory,
      },
    };

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); // Update the local state to reflect the budget change
      updateBudget(); // Refresh the budget data
    });
  };

  // Handle category selection
  const handleCategorySelection = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setEditingCategory(budget[categoryName]?.total || 0);
  };

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='extension-header'>Settings</h1>

      {/* Reset Budget */}
      <div>
        <h2 className='extension-subheader'>Reset Budget</h2>
        <p className='normal-text'>Reset spending to $0 for each category</p>
        <div className="extension-button-container">
          <button className='extension-button' onClick={handleResetBudget}>
            Reset
          </button>
        </div>
      </div>

      {/* Add New Category */}
      <div style={{ marginTop: '24px', marginBottom: '16px' }}>
        <h3 className='extension-subheader'>Add a New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className='extension-text-field-input'
        />
        <input
          type="number"
          placeholder="Budget"
          value={newCategory.total}
          onChange={(e) => setNewCategory({ ...newCategory, total: parseFloat(e.target.value) })}
          className='extension-text-field-input'
        />
      </div>
      <div className="extension-button-container">
        <button className='extension-button' onClick={handleAddCategory}>
          Save
        </button>
      </div>

      {/* Manage Categories */}
      <h2 className='extension-subheader'>Manage Categories</h2>
      <div style={{ marginBottom: '16px' }}>
        <div className="extension-select-wrapper">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelection(e.target.value)}
            className="extension-select"
          >
            <option value="">Select Category</option>
            {Object.keys(budget).map((catName) => (
              <option key={catName} value={catName}>
                {catName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCategory && (
        <>
          <h3 className='extension-category-name' style={{ marginBottom: '4px' }}>{selectedCategory}</h3>
          <div style={{ marginBottom: '8px' }}>
            <p className='normal-text'>Update budget amount:</p>
            <input
              type="number"
              value={editingCategory}
              onChange={(e) => setEditingCategory(parseFloat(e.target.value))}
              className='extension-text-field-input'
              placeholder="Update Budget"
              style={{ width: '50%', marginBottom: '10px', marginTop: '4px'  }}
            />
            <div className="extension-button-container">
              <button className='extension-button' onClick={handleSaveBudgetChange}>
                Save
              </button>
            </div>
            <p className='normal-text'>Delete category:</p>
            <div className="extension-button-container">
              <button
                onClick={() => handleDeleteCategory(selectedCategory)}
                className='extension-delete-button'
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;







