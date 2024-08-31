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

  // Calculate total budget and total spent
  const totalBudget = Object.values(budget).reduce((sum, { total }) => sum + total, 0);
  const totalSpent = Object.values(budget).reduce((sum, { spent }) => sum + spent, 0);
  const totalLeft = totalBudget - totalSpent;

  // Get the current month and year
  const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="extension-view-budget">
      <h1 className='extension-header'>Your Budget</h1>

      {/* Overlay Container */}
      <div className="extension-overlay-container">
        {/* Background Overlay */}
        <div className="extension-background-overlay"></div>

        {/* Total Budget Preview */}
        <div className="extension-total-budget-container">
          <p className="extension-total-budget-date">{currentMonthYear}</p>
          <h3 className="extension-total-left">
            ${totalLeft.toFixed(2)} <span className="extension-left-text">left</span>
          </h3>
          <p className="extension-total-budget-text">out of ${totalBudget.toFixed(2)} budgeted</p>
        </div>
      </div>

      <h2 className='extension-subheader'>Categories</h2>
      {Object.entries(budget).map(([category, details], index) => {
        const isOverBudget = details.spent > details.total;
        return (
          <div
            key={index}
            className="extension-budget-item"
          >
            <h3 className="extension-category-name" style={{ margin: 0 }}>{category}</h3>
            <div className="extension-budget-details">
              <div className="extension-spent-info">
                <p>Spent</p>
                <p className={`extension-spent-amount ${isOverBudget ? "extension-over-budget" : "extension-within-budget"}`}>
                  ${details.spent.toFixed(2)}
                </p>
              </div>
              <div className="extension-total-info">
                <p>Budget</p>
                <p className="extension-budget-amount">
                  ${details.total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="extension-budget-progress-bar">
              <div
                className={`extension-budget-progress ${isOverBudget ? 'extension-over-budget' : 'extension-within-budget'}`}
                style={{ width: `${(details.spent / details.total) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewBudget;







