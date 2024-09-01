import React, { useState } from 'react';
import { addRippleEffect } from '../utils/rippleEffect';

type Budget = {
  [category: string]: {
    spent: number;
    total: number;
  };
};

const AddPurchase = ({
  budget,
  updateBudget,
}: {
  budget: Budget;
  updateBudget: () => void;
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRippleEffect(e); 
    if (amount && category) {
      const purchase = {
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString(),
      };

      chrome.storage.local.get(['purchases'], (result) => {
        const updatedPurchases = result.purchases ? [...result.purchases, purchase] : [purchase];
        const updatedBudget = {
          ...budget,
          [category]: {
            spent: (budget[category]?.spent || 0) + purchase.amount,
            total: budget[category]?.total || 0,
          },
        };

        chrome.storage.local.set({ purchases: updatedPurchases, budget: updatedBudget }, () => {
          updateBudget(); 
          setAmount(''); 
          setCategory('');
        });
      });
    }
  };

  const getBudgetPreview = () => {
    if (!amount || !category) return null;

    const amountNum = parseFloat(amount);
    const newSpent = (budget[category]?.spent || 0) + amountNum;
    const remainingBudget = (budget[category]?.total || 0) - newSpent;

    return {
      newSpent,
      remainingBudget,
    };
  };

  const budgetPreview = getBudgetPreview();
  const isOverBudget = budgetPreview && budgetPreview.newSpent > (budget[category]?.total || 0);

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='extension-header'>Add Purchase</h1>

      {/* Amount Input Field */}
      <div className="extension-amount-input-wrapper">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$0"
          className="extension-amount-input"
        />
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: '16px' }}>
        <div className="extension-select-wrapper">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

      {/* Budget Preview */}
      {budgetPreview && (
        <>
          <h2 className="extension-subheader extension-budget-preview-header">Budget Preview</h2>
          <div className="extension-budget-preview-container">
            <h3 className="extension-budget-preview-category">{category}</h3>
            <div className="extension-budget-preview-details">
              <div className="extension-spent-info">
                <p>Spent</p>
                <p className={`extension-spent-amount ${isOverBudget ? "extension-over-budget" : "extension-within-budget"}`}>
                  ${budgetPreview.newSpent.toFixed(2)}
                </p>
              </div>
              <div className="extension-total-info">
                <p>Remaining</p>
                <p className="extension-remaining-budget" style={{color: '#2e2e2e'}}>
                  ${budgetPreview.remainingBudget.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="extension-button-container">
        <button className='extension-button' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPurchase;












