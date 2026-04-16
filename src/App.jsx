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

  const [tasks] = useState([
    { id: 1, name: 'Llevar bolsa reutilizable al supermercado', category: 'reutilizar', xp: 50, categoryIcon: '♻️', categoryName: 'Reutilizar', initialCompleted: true },
    { id: 2, name: 'Reducir tiempo de ducha a 5 minutos', category: 'reducir', xp: 30, categoryIcon: '📉', categoryName: 'Reducir', initialCompleted: true },
    { id: 3, name: 'Separar residuos orgánicos e inorgánicos', category: 'reciclar', xp: 40, categoryIcon: '🗑️', categoryName: 'Reciclar', initialCompleted: false },
    { id: 4, name: 'Reparar prenda de ropa en lugar de comprar nueva', category: 'reparar', xp: 60, categoryIcon: '🔧', categoryName: 'Reparar', initialCompleted: false },
  ]);
  const [completedTaskIds, setCompletedTaskIds] = useState(tasks.filter(t => t.initialCompleted).map(t => t.id));

  const addXp = (amount) => {
    setUser(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;
      while (newXp >= newMaxXp) {
        newLevel += 1;
        newXp -= newMaxXp;
        newMaxXp = Math.floor(newMaxXp * 1.2); 
      }
      return { ...prev, xp: newXp, level: newLevel, maxXp: newMaxXp };
    });
  };

  const toggleTaskGlobal = (taskId, xp) => {
    setCompletedTaskIds(prev => {
      const isRemoving = prev.includes(taskId);
      const nextCompleted = isRemoving ? prev.filter(id => id !== taskId) : [...prev, taskId];
      
      if (!isRemoving) {
        addXp(xp);
      } else {
        // En un juego o sistema simple no se quitaria el xp, pero si quieres deshacerlo seria addXp(-xp)
      }
      
      if (!isRemoving && nextCompleted.length === tasks.length) {
        if(window.showToast) window.showToast('🎉 ¡Completaste todas tus tareas diarias! +100 XP bonus', 'success');
        addXp(100);
      }
      return nextCompleted;
    });
  };

  const [toasts, setToasts] = useState([]);

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
    // Set up global toast system
    window.showToast = (message, type = 'success') => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3500);
    };

    return () => {
      delete window.showToast;
    };
  }, []);

  const updateProfile = (name, lastName, email) => {
    setUser(prev => ({ ...prev, name, lastName, email }));
    if(window.showToast) window.showToast('Perfil actualizado correctamente ✓', 'success');
  };

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
    if(window.showToast) window.showToast('¡Sesión iniciada correctamente! 🌿', 'success');
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
    if(window.showToast) window.showToast('Has cerrado sesión. ¡Vuelve pronto! 👋', 'success');
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
          <Topbar toggleSidebar={toggleSidebar} user={user} />
          <div className="page-container">
            {currentPage === 'page-inicio' && <Inicio user={user} changePage={setCurrentPage} tasks={tasks} completedTaskIds={completedTaskIds} addXp={addXp} />}
            {currentPage === 'page-acciones' && <Acciones openActionModal={() => setIsActionModalOpen(true)} tasks={tasks} completedTaskIds={completedTaskIds} toggleTaskGlobal={toggleTaskGlobal} />}
            {currentPage === 'page-logros' && <Logros />}
            {currentPage === 'page-comunidad' && <Comunidad />}
            {currentPage === 'page-opciones' && <Opciones user={user} toggleDarkMode={setDarkMode} updateProfile={updateProfile} onLogout={handleLogout} />}
            {currentPage === 'page-ayuda' && <Ayuda />}
          </div>
        </main>

        <ActionModal isVisible={isActionModalOpen} closeModal={() => setIsActionModalOpen(false)} addXp={addXp} />
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">
              {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span className="toast-message">{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
