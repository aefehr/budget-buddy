import React, { useState } from 'react';

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
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (amount && category) {
      const purchase = {
        amount: parseFloat(amount),
        category,
        note,
        date: new Date().toLocaleDateString(),
      };

      // Update the budget with the new purchase
      chrome.storage.local.get(['purchases'], (result) => {
        const updatedPurchases = result.purchases ? [...result.purchases, purchase] : [purchase];
        const updatedBudget = {
          ...budget,
          [category]: {
            spent: (budget[category]?.spent || 0) + purchase.amount,
            total: budget[category]?.total || 0,
          },
        };

        // Save the updated budget and purchases to local storage
        chrome.storage.local.set({ purchases: updatedPurchases, budget: updatedBudget }, () => {
          updateBudget(); // Refresh the budget data
          setAmount(''); // Reset form inputs
          setCategory('');
          setNote('');
        });
      });
    }
  };

  // Calculate the budget preview
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

  return (
    <div style={{ padding: '5px' }}>
      <h1 className='header'>Add Expense</h1>

      {/* Amount Input Field */}
      <div className="amount-input-wrapper">
        <span className="dollar-sign">$</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="amount-input"
        />
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: '16px' }}>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Select Category</option>
          {Object.keys(budget).map((catName) => (
            <option key={catName} value={catName}>
              {catName}
            </option>
          ))}
        </select>
      </div>

      {/* Note Input */}
      <div style={{ marginBottom: '16px' }}>
        <label>Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Budget Preview */}
      {budgetPreview && (
        <div
          style={{
            marginBottom: '16px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <h3>Budget Preview</h3>
          <p><strong>{category}</strong></p>
          <p>New Total Spent: ${budgetPreview.newSpent.toFixed(2)}</p>
          <p>Remaining Budget: ${budgetPreview.remainingBudget.toFixed(2)}</p>
        </div>
      )}

      {/* Save Button */}
      <button className='add-button' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default AddPurchase;










