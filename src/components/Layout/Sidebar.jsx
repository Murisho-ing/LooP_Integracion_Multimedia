import React from 'react';
import logo from '../../assets/logo.png';

const Sidebar = ({ currentPage, changePage, onLogout, openActionModal }) => {
    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo" id="sidebar-logo">
                    <img src={logo} alt="LooP Logo" className="logo-img" />
                </div>
            </div>
            <nav className="sidebar-nav">
                <ul className="nav-list" id="nav-list">
                    <li>
                        <a href="#" className={`nav-link ${currentPage === 'page-inicio' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-inicio'); }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            <span>Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${currentPage === 'page-acciones' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-acciones'); }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            <span>Acciones</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${currentPage === 'page-logros' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-logros'); }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                            <span>Logros</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${currentPage === 'page-comunidad' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-comunidad'); }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <span>Comunidad</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${currentPage === 'page-opciones' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-opciones'); }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                            <span>Opciones</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-action" style={{ padding: '0 var(--space-4) var(--space-6)' }}>
                <button className="btn btn-primary btn-action-main" onClick={openActionModal} style={{ padding: '1rem', borderRadius: '16px', fontWeight: 500 }}>
                    Registrar acción diaria
                </button>
            </div>
            <div className="sidebar-footer">
                <a href="#" className={`nav-link ${currentPage === 'page-ayuda' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); changePage('page-ayuda'); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>Ayuda</span>
                </a>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span>Cerrar sesión</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
