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

// Services & Hooks
import api from './services/api';
import { useDashboard } from './hooks/useDashboard';
import { useActions } from './hooks/useActions';

function App() {
  const [currentPage, setCurrentPage] = useState('page-login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Backend Data
  const { data, setData, loading, error: dashboardError, refetch: refetchDashboard } = useDashboard(isLoggedIn);
  const { toggleTask, logManualAction } = useActions(refetchDashboard);

  const user = data?.user || {
    name: 'Cargando...',
    level: 1,
    xp: 0,
    maxXp: 1000
  };

  const tasks = data?.tasks || [];
  const completedTaskIds = data?.completedTaskIds || [];

  const toggleTaskGlobal = async (taskId, xp) => {
    try {
      await toggleTask(taskId, xp);
      if (window.showToast) window.showToast('¡Tarea actualizada! 🌿', 'success');
    } catch (err) {
      if (window.showToast) window.showToast('Error al actualizar tarea', 'error');
    }
  };

  const addXpManual = async (amount, category, description) => {
    try {
      await logManualAction(category, description, amount);
      if (window.showToast) window.showToast(`+${amount} XP ganados! ✨`, 'success');
    } catch (err) {
      if (window.showToast) window.showToast('Error al registrar acción', 'error');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('loop_token');
    if (token) {
      setIsLoggedIn(true);
      setCurrentPage('page-inicio');
    }

    if (localStorage.getItem('loop_dark_mode') === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('loop_dark_mode', darkMode);
  }, [darkMode]);

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('loop_token', response.data.token);
      setIsLoggedIn(true);
      setCurrentPage('page-inicio');
      if (window.showToast) window.showToast('¡Sesión iniciada correctamente! 🌿', 'success');
    } catch (err) {
      if (window.showToast) window.showToast(err.response?.data?.error || 'Error al iniciar sesión', 'error');
    }
  };

  const handleRegister = async (name, lastName, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, lastName, email, password });
      localStorage.setItem('loop_token', response.data.token);
      setIsLoggedIn(true);
      setCurrentPage('page-inicio');
      if (window.showToast) window.showToast('¡Bienvenido a LooP! 🌿', 'success');
    } catch (err) {
      if (window.showToast) window.showToast(err.response?.data?.error || 'Error al registrarse', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loop_token');
    setIsLoggedIn(false);
    setCurrentPage('page-login');
    if (window.showToast) window.showToast('Has cerrado sesión. ¡Vuelve pronto! 👋', 'success');
  };

  const handleUpdateProfile = async (name, lastName, email) => {
    try {
      const response = await api.put('/auth/profile', { name, lastName, email });
      
      if (response.data && response.data.user) {
        setData(prev => ({
          ...prev,
          user: { ...prev.user, ...response.data.user }
        }));
      }
    } catch (err) {
      console.error('Frontend profile update error:', err);
      // Silencio para evitar conflictos visuales si los cambios sí se aplicaron
    }
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

    if (loading && !data) {
      return (
        <div className="loading-screen">
          <div className="loader"></div>
          <p>Cargando tu progreso sostenible...</p>
        </div>
      );
    }

    const user = data?.user || {
      name: 'Cargando...',
      level: 1,
      xp: 0,
      maxXp: 1000
    };

    const tasks = data?.tasks || [];
    const completedTaskIds = data?.completedTaskIds || [];

    return (
      <div id="app-layout" className="app-layout" style={{ display: 'flex' }}>
        <Sidebar 
          currentPage={currentPage} 
          changePage={(page) => { setCurrentPage(page); closeSidebar(); }} 
          onLogout={handleLogout} 
          openActionModal={() => setIsActionModalOpen(true)}
        />
        
        {isSidebarOpen && (
           <div className="sidebar-overlay active" onClick={closeSidebar}></div>
        )}

        <main className="main-content">
          <Topbar toggleSidebar={toggleSidebar} user={user} />
          <div className="page-container">
            {currentPage === 'page-inicio' && (
              <Inicio 
                user={user} 
                changePage={setCurrentPage} 
                tasks={tasks} 
                completedTaskIds={completedTaskIds} 
                impactSummary={data?.impactSummary}
                weeklyActivity={data?.weeklyActivity}
                activeChallenge={data?.activeChallenge}
              />
            )}
            {currentPage === 'page-acciones' && (
              <Acciones 
                openActionModal={() => setIsActionModalOpen(true)} 
                tasks={tasks} 
                completedTaskIds={completedTaskIds} 
                toggleTaskGlobal={toggleTaskGlobal}
                impactSummary={data?.impactSummary}
              />
            )}
            {currentPage === 'page-logros' && <Logros user={user} data={data} />}
            {currentPage === 'page-comunidad' && <Comunidad user={user} data={data} />}
            {currentPage === 'page-opciones' && (
              <Opciones 
                user={user} 
                toggleDarkMode={setDarkMode} 
                onLogout={handleLogout} 
                updateProfile={handleUpdateProfile} 
              />
            )}
            {currentPage === 'page-ayuda' && <Ayuda />}
          </div>
        </main>

        <ActionModal isVisible={isActionModalOpen} closeModal={() => setIsActionModalOpen(false)} addXp={addXpManual} />
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
