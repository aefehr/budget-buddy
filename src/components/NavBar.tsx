import React from 'react';
import PieChartIcon from '@mui/icons-material/PieChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import './../styles.css';

type NavbarProps = {
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

function CustomNavbar({ currentTab, setCurrentTab }: NavbarProps) {
    return (
        <div className="custom-navbar">
            <div
                className={`nav-icon ${currentTab === 'viewBudget' ? 'selected' : ''}`}
                onClick={() => setCurrentTab('viewBudget')}
            >
                <PieChartIcon className="icon" />
            </div>
            <div
                className={`nav-icon ${currentTab === 'addPurchase' ? 'selected' : ''}`}
                onClick={() => setCurrentTab('addPurchase')}
            >
                <AddCircleIcon className="icon" />
            </div>
            <div
                className={`nav-icon ${currentTab === 'settings' ? 'selected' : ''}`}
                onClick={() => setCurrentTab('settings')}
            >
                <SettingsIcon className="icon" />
            </div>
        </div>
    );
}

export default CustomNavbar;


