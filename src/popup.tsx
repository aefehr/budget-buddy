import React, { useState } from 'react';
import AddPurchase from './tabs/AddPurchase';
import ViewBudget from './tabs/ViewBudget';
import Profile from './tabs/Profile';
import Navbar from './components/NavBar';

const Popup = () => {
  const [currentTab, setCurrentTab] = useState('viewBudget');

  return (
    <div>
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 'addPurchase' && <AddPurchase />}
      {currentTab === 'viewBudget' && <ViewBudget />}
      {currentTab === 'settings' && <Profile />}
    </div>
  );
};

export default Popup;
