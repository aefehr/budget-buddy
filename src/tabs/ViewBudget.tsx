import React, { useState } from 'react';

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const ViewBudget = ({ budget }: { budget: Budget }) => {
  const [newCategory, setNewCategory] = useState({ name: '', total: 0 });

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
        setNewCategory({ name: '', total: 0 });
      });
    }
  };

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='header'>Your Budget</h1>

      {Object.entries(budget).map(([category, details], index) => {
        const isOverBudget = details.spent > details.total;
        return (
          <div
            key={index}
            style={{
              marginBottom: '8px',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
              textAlign: 'left',
            }}
          >
            <h3 className="category-name" style={{ margin: 0 }}>{category}</h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '2px',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '12px' }}>Total Spent</p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    color: isOverBudget ? '#D9534F' : 'var(--medium-green)', // Red if over budget, green otherwise
                    fontWeight: 'bold',
                  }}
                >
                  ${details.spent}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#8a8a8a' }}>Total Budget</p>
                <p style={{ margin: 0, fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                  ${details.total}
                </p>
              </div>
            </div>
            <div
              style={{
                marginTop: '8px',
                width: '100%',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(details.spent / details.total) * 100}%`,
                  height: '10px',
                  backgroundColor: isOverBudget ? '#D9534F' : 'var(--medium-green)', // Red if over budget, purple otherwise
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewBudget;
