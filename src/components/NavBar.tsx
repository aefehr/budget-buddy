import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
                icon={<HomeIcon sx={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
                value="addPurchase"
                icon={<AddCircleIcon sx={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
                value="settings"
                icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
            />
        </BottomNavigation>
    );
}

export default Navbar;