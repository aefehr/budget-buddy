import React, { useState, useEffect } from 'react';
import AddPurchase from './tabs/AddPurchase';
import ViewBudget from './tabs/ViewBudget';
import Settings from './tabs/Settings';
import Navbar from './components/NavBar';

const App = () => {
  const [currentTab, setCurrentTab] = useState('viewBudget');
  const [budget, setBudget] = useState<{ [category: string]: { spent: number; total: number } }>({});

  // Function to fetch and update the budget
  const updateBudget = () => {
    chrome.storage.local.get(['budget'], (result) => {
      setBudget(result.budget || {});
    });
  };

  useEffect(() => {
    updateBudget();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '5px', boxSizing: 'border-box' }}>
        {currentTab === 'addPurchase' && <AddPurchase budget={budget} updateBudget={updateBudget} />}
        {currentTab === 'viewBudget' && <ViewBudget budget={budget} />}
        {currentTab === 'settings' && <Settings budget={budget} setBudget={setBudget} updateBudget={updateBudget} />}
      </div>
    </div>
  );
};

export default App;
