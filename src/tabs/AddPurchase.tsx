import React, { useState, useEffect } from 'react';

interface Category {
  name: string;
  spent: number;
  total: number;
}

const AddPurchase = ({ updateBudget }: { updateBudget: () => void }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [categories, setCategories] = useState<Category[]>([]); // Store full Category objects

  useEffect(() => {
    chrome.storage.local.get(['categories'], (result) => {
      if (result.categories) {
        setCategories(result.categories);
      } else {
        setCategories([]); // Fallback to an empty array
      }
    });
  }, []);

  const handleSave = () => {
    if (amount && category) {
      const purchase = {
        amount: parseFloat(amount),
        category,
        note,
        date: new Date().toLocaleDateString(),
      };

      // Save the purchase to local storage and update the budget
      chrome.storage.local.get(['purchases', 'budget'], (result) => {
        const updatedPurchases = result.purchases ? [...result.purchases, purchase] : [purchase];
        const updatedBudget = { ...result.budget };

        // Find the selected category and update its spent amount
        const categoryToUpdate = categories.find((cat) => cat.name === category);
        if (categoryToUpdate) {
          categoryToUpdate.spent += purchase.amount;

          // Update the budget object
          updatedBudget[category] = {
            spent: categoryToUpdate.spent,
            total: categoryToUpdate.total,
          };
        }

        // Save back to local storage
        chrome.storage.local.set({ purchases: updatedPurchases, budget: updatedBudget }, () => {
          updateBudget(); // Call the update function to refresh the View Budget page
          setAmount(''); // Reset the form
          setCategory('');
          setNote('');
        });
      });
    }
  };

  // Calculate the budget preview
  const getBudgetPreview = () => {
    if (!amount || !category) return null;

    const selectedCategory = categories.find((cat) => cat.name === category);
    if (!selectedCategory) return null;

    const amountNum = parseFloat(amount);
    const newSpent = selectedCategory.spent + amountNum;
    const remainingBudget = selectedCategory.total - newSpent;

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
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
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
      <button className='add-button'
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default AddPurchase;









