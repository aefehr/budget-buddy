import React, { useState, useEffect } from 'react';
import AddPurchase from './tabs/AddPurchase';
import ViewBudget from './tabs/ViewBudget';
import Profile from './tabs/Profile';
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

  // Fetch the budget when the component mounts
  useEffect(() => {
    updateBudget();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '5px', boxSizing: 'border-box' }}>
        {currentTab === 'addPurchase' && <AddPurchase updateBudget={updateBudget} />}
        {currentTab === 'viewBudget' && <ViewBudget budget={budget} />}
        {currentTab === 'settings' && <Profile />}
      </div>
    </div>
  );
};

export default App;


