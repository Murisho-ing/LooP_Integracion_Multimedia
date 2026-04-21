import React, { useState, useEffect } from 'react';

const Acciones = ({ openActionModal, tasks = [], completedTaskIds = [], toggleTaskGlobal, impactSummary }) => {
    const [filter, setFilter] = useState('all');

    // Animate cards on scroll
    useEffect(() => {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${i * 0.05}s`;
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.category === filter);

    return (
        <div id="page-acciones" className="page active-page">
            <div className="page-header">
                <div>
                    <h1>Tus Acciones</h1>
                    <p className="greeting-sub">Registra y gestiona tus acciones sostenibles diarias</p>
                </div>
                <button className="btn btn-primary" id="btn-nueva-accion" onClick={openActionModal}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Nueva Acción
                </button>
            </div>

            {/* Filtros */}
            <div className="actions-filters" id="actions-filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todas</button>
                <button className={`filter-btn ${filter === 'reutilizar' ? 'active' : ''}`} onClick={() => setFilter('reutilizar')}>♻️ Reutilizar</button>
                <button className={`filter-btn ${filter === 'reducir' ? 'active' : ''}`} onClick={() => setFilter('reducir')}>📉 Reducir</button>
                <button className={`filter-btn ${filter === 'reciclar' ? 'active' : ''}`} onClick={() => setFilter('reciclar')}>🗑️ Reciclar</button>
                <button className={`filter-btn ${filter === 'reparar' ? 'active' : ''}`} onClick={() => setFilter('reparar')}>🔧 Reparar</button>
                <button className={`filter-btn ${filter === 'intercambiar' ? 'active' : ''}`} onClick={() => setFilter('intercambiar')}>🔄 Intercambiar</button>
            </div>

            {/* Tareas Diarias Detalle */}
            <div className="card" id="card-daily-tasks-detail">
                <div className="card-header-flex">
                    <h3>Tareas de Hoy</h3>
                    <span className="tasks-badge">{completedTaskIds.length}/{tasks.length} completadas</span>
                </div>
                <div className="task-list" id="task-list">
                    {filteredTasks.map(task => {
                        const isCompleted = completedTaskIds.includes(task.id);
                        return (
                            <div key={task.id} className={`task-item ${isCompleted ? 'completed' : ''}`} onClick={() => toggleTaskGlobal(task.id, task.xp)}>
                                <div className={`task-check ${isCompleted ? 'checked' : ''}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <div className="task-info">
                                    <span className="task-name">{task.name}</span>
                                    <span className="task-category">{task.categoryIcon} {task.categoryName}</span>
                                </div>
                                <span className="task-xp">+{task.xp} XP</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Historial de Acciones */}
            <div className="card" id="card-history">
                <h3>Historial de Acciones</h3>
                <div className="history-list" id="history-list">
                    <div className="history-day">
                        <h4 className="history-date">Hoy - 14 Abril 2026</h4>
                        <div className="history-item">
                            <div className="history-icon reutilizar">♻️</div>
                            <div className="history-info">
                                <span>Reutilicé envases de vidrio para almacenamiento</span>
                                <span className="history-time">10:30 AM</span>
                            </div>
                            <span className="history-xp">+40 XP</span>
                        </div>
                        <div className="history-item">
                            <div className="history-icon reducir">📉</div>
                            <div className="history-info">
                                <span>Usé transporte público en lugar de auto</span>
                                <span className="history-time">8:15 AM</span>
                            </div>
                            <span className="history-xp">+35 XP</span>
                        </div>
                    </div>
                    <div className="history-day">
                        <h4 className="history-date">Ayer - 13 Abril 2026</h4>
                        <div className="history-item">
                            <div className="history-icon reciclar">🗑️</div>
                            <div className="history-info">
                                <span>Llevé reciclables al centro de acopio</span>
                                <span className="history-time">5:00 PM</span>
                            </div>
                            <span className="history-xp">+55 XP</span>
                        </div>
                        <div className="history-item">
                            <div className="history-icon intercambiar">🔄</div>
                            <div className="history-info">
                                <span>Intercambié libros con un vecino</span>
                                <span className="history-time">2:30 PM</span>
                            </div>
                            <span className="history-xp">+45 XP</span>
                        </div>
                        <div className="history-item">
                            <div className="history-icon reparar">🔧</div>
                            <div className="history-info">
                                <span>Reparé la cadena de mi bicicleta</span>
                                <span className="history-time">11:00 AM</span>
                            </div>
                            <span className="history-xp">+50 XP</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas del Mes */}
            <div className="stats-grid" id="actions-stats">
                {impactSummary ? Object.entries(impactSummary).map(([key, val]) => (
                    <div key={key} className="card stat-card">
                        <div className={`stat-icon ${key}-bg`}>
                            {key === 'reutilizar' ? '♻️' : key === 'reducir' ? '📉' : key === 'reciclar' ? '🗑️' : key === 'reparar' ? '🔧' : '🔄'}
                        </div>
                        <div className="stat-info">
                            <span className="stat-number">{val.count}</span>
                            <span className="stat-label">{val.label}</span>
                        </div>
                    </div>
                )) : (
                    <p>Cargando estadísticas...</p>
                )}
            </div>
        </div>
    );
};

export default Acciones;
