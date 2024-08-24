import React, { useState, useEffect } from 'react';

type BudgetCategory = {
    name: string;
    spent: number;
    total: number;
  };

function ViewBudget() {
    const [categories, setCategories] = useState<BudgetCategory[]>([]);
    const [newCategory, setNewCategory] = useState({ name: '', total: 0 });

    useEffect(() => {
        chrome.storage.local.get('categories', (result) => {
          if (result.categories) {
            setCategories(result.categories);
          }
        });
    }, []);

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
        <div style={{ padding: '16px' }}>
          <h2>Your Budget</h2>
          
          {categories.map((category, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '16px', padding: '16px', borderRadius: '8px', 
                backgroundColor: '#f0f0f0', textAlign: 'left'
              }}
            >
              <h3 style={{ margin: 0 }}>{category.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#8a8a8a' }}>Total Spent</p>
                  <p style={{ margin: 0, fontSize: '16px', color: '#4caf50', fontWeight: 'bold' }}>${category.spent}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#8a8a8a' }}>Total Budget</p>
                  <p style={{ margin: 0, fontSize: '16px', color: '#000', fontWeight: 'bold' }}>${category.total}</p>
                </div>
              </div>
              <div style={{ marginTop: '8px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div 
                  style={{
                    width: `${(category.spent / category.total) * 100}%`, 
                    height: '10px', 
                    backgroundColor: '#800080' // purple color
                  }} 
                />
              </div>
            </div>
          ))}
    
          <div style={{ marginTop: '24px' }}>
            <h3>Add a New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Total Budget"
              value={newCategory.total}
              onChange={(e) => setNewCategory({ ...newCategory, total: parseFloat(e.target.value) })}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button 
              onClick={handleAddCategory}
              style={{ 
                width: '100%', padding: '10px', borderRadius: '4px', 
                backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer'
              }}
            >
              Add Category
            </button>
          </div>
        </div>
    );  
}

export default ViewBudget;
