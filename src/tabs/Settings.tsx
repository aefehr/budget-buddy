import React from 'react';

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const Settings = ({
  budget,
  updateBudget,
}: {
  budget: Budget;
  updateBudget: () => void;
}) => {

  // Handle category deletion
  const handleDeleteCategory = (categoryName: string) => {
    const updatedBudget = { ...budget };
    delete updatedBudget[categoryName];

    chrome.storage.local.set({ budget: updatedBudget }, () => {
      updateBudget(); // Refresh the budget data
    });
  };

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='header'>Settings</h1>
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
    </div>
  );
};

export default Settings;


