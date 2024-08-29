import React from 'react';

type NavbarProps = {
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
    return (
        <div id="custom-navbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingTop: '16px',
            paddingBottom: '11px',
            paddingLeft: '23px',
            paddingRight: '23px',
            borderRadius: '30px 30px 22px 22px',
            boxShadow: '0px -1px 8px rgba(0, 0, 0, 0.2)',
            
        }}>
            <div
                className="nav-icon"
                onClick={() => setCurrentTab('viewBudget')}
                style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}
            >
                <svg
                    width="33" height="33" viewBox="0 -960 960 960"
                    style={{
                        fill: currentTab === 'viewBudget' ? 'var(--dark-purple)' : '#cac9c9',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M520-520h278q-15-110-91.5-186.5T520-798v278Zm-80 358v-636q-121 15-200.5 105.5T160-480q0 122 79.5 212.5T440-162Zm80 0q110-14 187-91t91-187H520v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z"/>
                </svg>
            </div>
            <div
                className="nav-icon"
                onClick={() => setCurrentTab('addPurchase')}
                style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}
            >
                <svg
                    width="33" height="33" viewBox="0 0 24 24"
                    style={{
                        fill: currentTab === 'addPurchase' ? 'var(--dark-purple)' : '#cac9c9',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
            </div>
            <div
                className="nav-icon"
                onClick={() => setCurrentTab('settings')}
                style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}
            >
                <svg
                    width="33" height="33" viewBox="0 0 24 24"
                    style={{
                        fill: currentTab === 'settings' ? 'var(--dark-purple)' : '#cac9c9',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
            </div>
        </div>
    );
};

export default Navbar;







