import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import './../styles.css';

type NavbarProps = {
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
    return (
        <BottomNavigation
            value={currentTab}
            onChange={(event, newValue) => {
                setCurrentTab(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                value="viewBudget"
                icon={<PieChartIcon className="purple" style={{ fontSize: '35px' }} />}
            />
            <BottomNavigationAction
                value="addPurchase"
                icon={<AddCircleIcon className="purple" style={{ fontSize: '40px' }} />}
            />
            <BottomNavigationAction
                value="settings"
                icon={<SettingsIcon className="purple" style={{ fontSize: '35px' }} />}
            />
        </BottomNavigation>
    );
}

export default Navbar;