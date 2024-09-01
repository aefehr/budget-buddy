import React from 'react';

type NavbarProps = {
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
    const tabs = [
        {
            name: 'viewBudget',
            label: 'Budget',
            icon: (
                <svg
                    width="30"
                    height="30"
                    viewBox="0 -960 960 960"
                    style={{
                        fill: currentTab === 'viewBudget' ? 'var(--dark-purple)' : '#9e9e9e',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z"/>
                </svg>
            ),
        },
        {
            name: 'addPurchase',
            label: 'Add',
            icon: (
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    style={{
                        fill: currentTab === 'addPurchase' ? 'var(--dark-purple)' : '#9e9e9e',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
            ),
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: (
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    style={{
                        fill: currentTab === 'settings' ? 'var(--dark-purple)' : '#9e9e9e',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
            ),
        },
    ];

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '13px',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '0px',
                borderRadius: '15px',
            }}
        >
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    onClick={() => setCurrentTab(tab.name)}
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor:
                                currentTab === tab.name ? '#dfb4fd' : 'transparent',
                            borderRadius: '20px', 
                            padding: '5px 24px', 
                            marginBottom: '9px', 
                            transition: 'background-color 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {tab.icon}
                    </div>
                    <span
                        className='nav-bar-text'
                        style={{
                            color:
                                currentTab === tab.name
                                    ? 'var(--dark-purple)'
                                    : '#9e9e9e',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginTop: '-5px', 
                        }}
                    >
                        {tab.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Navbar;










