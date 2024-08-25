import React, { useState, useEffect } from 'react';
import './../styles.css';

type BudgetCategory = {
  name: string;
  spent: number;
  total: number;
};

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const ViewBudget = ({ budget }: { budget: Budget }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', total: 0 });

  useEffect(() => {
    chrome.storage.local.get('categories', (result) => {
      if (result.categories) {
        const combinedCategories = result.categories.map((cat: BudgetCategory) => ({
          name: cat.name,
          spent: budget[cat.name]?.spent || cat.spent,
          total: cat.total,
        }));
        setCategories(combinedCategories);
      }
    });
  }, [budget]);

  useEffect(() => {
    chrome.storage.local.set({ categories });
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.total > 0) {
      const updatedCategories = [...categories, { ...newCategory, spent: 0 }];
      setCategories(updatedCategories);
      setNewCategory({ name: '', total: 0 });
    }
  };

  return (
    <div style={{ padding: '5px' }}> {/* Restored original padding */}
      <h1>Your Budget</h1>

      {categories.map((category, index) => {
        const isOverBudget = category.spent > category.total;
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
            <h3 className="category-name" style={{ margin: 0 }}>{category.name}</h3>
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
                  ${category.spent}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#8a8a8a' }}>Total Budget</p>
                <p style={{ margin: 0, fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                  ${category.total}
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
                  width: `${(category.spent / category.total) * 100}%`,
                  height: '10px',
                  backgroundColor: isOverBudget ? '#D9534F' : 'var(--medium-green)', // Red if over budget, purple otherwise
                }}
              />
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: '24px' }}>
        <h3>Add a New Category</h3>
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
        <button
          onClick={handleAddCategory}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: 'var(--medium-green)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default ViewBudget;



