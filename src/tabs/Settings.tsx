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
  const [newCategory, setNewCategory] = useState({ name: '', total: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<number | string>('');

  const handleDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>, categoryName: string) => {
    addRippleEffect(e); 
    const updatedBudget = { ...budget };
    delete updatedBudget[categoryName];

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); 
      updateBudget(); 
      setSelectedCategory(''); 
    });
  };

  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRippleEffect(e); 
    const parsedTotal = parseFloat(newCategory.total);

    if (newCategory.name && parsedTotal > 0) {
      const updatedBudget = {
        ...budget,
        [newCategory.name]: {
          spent: 0,
          total: parsedTotal,
        },
      };

      chrome.storage.local.set({ budget: updatedBudget }, () => {
        setBudget(updatedBudget); 
        setNewCategory({ name: '', total: '' }); 
      });
    }
  };

  const handleResetBudget = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRippleEffect(e); 
    const updatedBudget = { ...budget };

    for (let category in updatedBudget) {
      updatedBudget[category].spent = 0;
    }

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      setBudget(updatedBudget); 
      updateBudget(); 
    });
  };

  const handleSaveBudgetChange = (e: React.MouseEvent<HTMLButtonElement>, categoryName: string) => {
    addRippleEffect(e); 
    const parsedTotal = parseFloat(editingCategory as string);

    if (!isNaN(parsedTotal) && parsedTotal >= 0) {
      const updatedBudget = {
        ...budget,
        [categoryName]: {
          ...budget[categoryName],
          total: parsedTotal,
        },
      };

      chrome.storage.local.set({ budget: updatedBudget }, () => {
        setBudget(updatedBudget); 
        updateBudget(); 
      });
    }
  };

  const handleCategorySelection = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setEditingCategory(budget[categoryName]?.total || '');
  };

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='extension-header'>Settings</h1>

      {/* Reset Budget */}
      <div>
        <h2 className='extension-subheader'>Reset Budget</h2>
        <p className='extension-normal-text'>Reset spending to $0 for each category</p>
        <div className="extension-button-container">
          <button className='extension-button' onClick={handleResetBudget}>
            Reset
          </button>
        </div>
      </div>

      {/* Add New Category */}
      <div style={{ marginTop: '24px', marginBottom: '16px' }}>
        <h3 className='extension-subheader'>Add a New Budget Category</h3>
        <input
          type="text"
          placeholder="Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className='extension-text-field-input'
        />
        <input
          type="number"
          placeholder="$0"
          value={newCategory.total}
          onChange={(e) => setNewCategory({ ...newCategory, total: e.target.value })}
          className='extension-text-field-input'
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && newCategory.total.length === 1) {
              setNewCategory({ ...newCategory, total: '' });
            }
          }}
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
            <p className='extension-normal-text'>Update budget amount:</p>
            <input
              type="number"
              value={editingCategory}
              onChange={(e) => setEditingCategory(e.target.value)}
              className='extension-text-field-input'
              placeholder="$0"
              style={{ width: '50%', marginBottom: '10px', marginTop: '4px'  }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && (editingCategory as string).length === 1) {
                  setEditingCategory('');
                }
              }}
            />
            <div className="extension-button-container">
              <button className='extension-button' onClick={(e) => handleSaveBudgetChange(e, selectedCategory)}>
                Save
              </button>
            </div>
            <p className='extension-normal-text'>Delete category:</p>
            <div className="extension-button-container">
              <button
                onClick={(e) => handleDeleteCategory(e, selectedCategory)}
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









