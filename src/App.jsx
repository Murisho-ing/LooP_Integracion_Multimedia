import React, { useState, useEffect } from 'react';
import './index.css';

// Components
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Pages
import Inicio from './components/Pages/Inicio';
import Acciones from './components/Pages/Acciones';
import Logros from './components/Pages/Logros';
import Comunidad from './components/Pages/Comunidad';
import Opciones from './components/Pages/Opciones';
import Ayuda from './components/Pages/Ayuda';

// Modals
import ActionModal from './components/Modals/ActionModal';

function App() {
  const [currentPage, setCurrentPage] = useState('page-login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  
  const [user, setUser] = useState({
    name: 'Mariana',
    lastName: 'Rodríguez',
    email: 'mariana@email.com',
    level: 24,
    xp: 850,
    maxXp: 1000
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check session
    if (sessionStorage.getItem('loop_logged_in') === 'true') {
      setIsLoggedIn(true);
      setCurrentPage('page-inicio');
    }

    // Check dark mode
    if (localStorage.getItem('loop_dark_mode') === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('loop_dark_mode', darkMode);
  }, [darkMode]);

  const handleLogin = () => {
    sessionStorage.setItem('loop_logged_in', 'true');
    setIsLoggedIn(true);
    setCurrentPage('page-inicio');
  };

  const handleRegister = (name) => {
    setUser({ ...user, name });
    sessionStorage.setItem('loop_logged_in', 'true');
    setIsLoggedIn(true);
    setCurrentPage('page-inicio');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loop_logged_in');
    setIsLoggedIn(false);
    setCurrentPage('page-login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const renderContent = () => {
    if (!isLoggedIn) {
      if (currentPage === 'page-register') {
        return <Register changePage={setCurrentPage} onRegister={handleRegister} />;
      }
      return <Login changePage={setCurrentPage} onLogin={handleLogin} />;
    }

    return (
      <div id="app-layout" className="app-layout" style={{ display: 'flex' }}>
        <Sidebar 
          currentPage={currentPage} 
          changePage={(page) => { setCurrentPage(page); closeSidebar(); }} 
          onLogout={handleLogout} 
          openActionModal={() => setIsActionModalOpen(true)}
        />
        
        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
           <div className="sidebar-overlay active" onClick={closeSidebar}></div>
        )}

        <main className="main-content">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="page-container">
            {currentPage === 'page-inicio' && <Inicio user={user} changePage={setCurrentPage} />}
            {currentPage === 'page-acciones' && <Acciones openActionModal={() => setIsActionModalOpen(true)} />}
            {currentPage === 'page-logros' && <Logros />}
            {currentPage === 'page-comunidad' && <Comunidad />}
            {currentPage === 'page-opciones' && <Opciones toggleDarkMode={setDarkMode} />}
            {currentPage === 'page-ayuda' && <Ayuda />}
          </div>
        </main>

        <ActionModal isVisible={isActionModalOpen} closeModal={() => setIsActionModalOpen(false)} />
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
}

export default App;
