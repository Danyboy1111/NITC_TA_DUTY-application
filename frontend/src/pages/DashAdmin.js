import React, { useState } from 'react';
import AdminPage from './AdminPage';
import AdminForm from './AdminForm';
import './DashAdmin.css';

function DashAdmin() {
    const [currentPage, setCurrentPage] = useState('assign');

    const renderPage = () => {
        if (currentPage === 'assign') {
            return <AdminPage />;
        }
        if (currentPage === 'verify') {
            return <AdminForm />;
        }
    };

    return (
        <div className="dash-admin">
            <nav className="admin-nav">
                <button
                    className={`nav-button ${currentPage === 'assign' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('assign')}
                >
                    Assign Students
                </button>
                <button
                    className={`nav-button ${currentPage === 'verify' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('verify')}
                >
                    Verify Students
                </button>
            </nav>
            <div className="page-content">
                {renderPage()}
            </div>
        </div>
    );
}

export default DashAdmin;
