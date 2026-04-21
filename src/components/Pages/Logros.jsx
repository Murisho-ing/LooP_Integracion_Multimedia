import React from 'react';

const Logros = ({ user, data }) => {
    // Current user level and xp
    const currentXp = user?.xp || 0;
    const currentLevel = user?.level || 1;
    // Real metrics from dashboard data
    const impactSummary = data?.impactSummary || {};
    const totalActions = Object.values(impactSummary).reduce((acc, cat) => acc + (cat.count || 0), 0);
    const currentStreak = user?.streak || 0;

    // Derived stats
    let unlockedCount = 0;
    if (currentLevel > 1) unlockedCount += Math.floor(currentLevel / 2); // 1 achievement every 2 levels
    if (currentXp >= 1000) unlockedCount += 1;
    if (currentStreak >= 5) unlockedCount += 1;
    if (totalActions >= 1) unlockedCount += 1; // Primera semilla
    if (totalActions >= 10) unlockedCount += 1; // Reciclador (aprox)
    
    unlockedCount = Math.min(unlockedCount, 20);
    const totalLogrosVisible = 20;
    const progressPercent = Math.round((unlockedCount / totalLogrosVisible) * 100);

    return (
        <div id="page-logros" className="page active-page">
            <div className="page-header">
                <div>
                    <h1>Tus Logros</h1>
                    <p className="greeting-sub">Desbloquea logros completando acciones sostenibles</p>
                </div>
            </div>

            {/* Resumen de Logros */}
            <div className="achievements-summary" id="achievements-summary">
                <div className="card achievement-summary-card">
                    <div className="achievement-summary-ring">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#dde2dd" strokeWidth="8"/>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#216D28" strokeWidth="8" strokeLinecap="round"
                                strokeDasharray="251.3" strokeDashoffset={251.3 * (1 - progressPercent/100)} transform="rotate(-90 50 50)"/>
                        </svg>
                        <span className="summary-percent">{progressPercent}%</span>
                    </div>
                    <div className="summary-info">
                        <h3>Progreso General</h3>
                        <p>{unlockedCount} de {totalLogros} logros desbloqueados</p>
                    </div>
                </div>
                <div className="card achievement-summary-card">
                    <span className="summary-emoji">🔥</span>
                    <div className="summary-info">
                        <h3>Racha Actual</h3>
                        <p>{currentStreak} {currentStreak === 1 ? 'día' : 'días'} consecutivos</p>
                    </div>
                </div>
                <div className="card achievement-summary-card">
                    <span className="summary-emoji">⭐</span>
                    <div className="summary-info">
                        <h3>Puntos Totales</h3>
                        <p>{currentXp.toLocaleString()} XP acumulados</p>
                    </div>
                </div>
            </div>

            {/* Logros Grid */}
            <h2 className="section-title">Logros Desbloqueados</h2>
            <div className="achievements-grid" id="achievements-unlocked">
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">🌱</span>
                    </div>
                    <h4>Primera Semilla</h4>
                    <p>Completa tu primera acción sostenible</p>
                    <span className="achievement-date">¡Ya desbloqueado!</span>
                </div>
                {currentLevel >= 5 && (
                    <div className="card achievement-card unlocked">
                        <div className="achievement-badge">
                            <span className="badge-emoji">🌍</span>
                        </div>
                        <h4>Explorador Eco</h4>
                        <p>Alcanza el Nivel 5</p>
                        <span className="achievement-date">¡Desbloqueado!</span>
                    </div>
                )}
                {currentXp >= 1000 && (
                    <div className="card achievement-card unlocked">
                        <div className="achievement-badge">
                            <span className="badge-emoji">⭐</span>
                        </div>
                        <h4>Primeros 1000</h4>
                        <p>Acumula tus primeros 1,000 XP</p>
                        <span className="achievement-date">¡Desbloqueado!</span>
                    </div>
                )}
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">♻️</span>
                    </div>
                    <h4>Reciclador</h4>
                    <p>Llevas el reciclaje en la sangre</p>
                    <span className="achievement-date">¡Desbloqueado!</span>
                </div>
            </div>

            <h2 className="section-title">Próximos Logros</h2>
            <div className="achievements-grid" id="achievements-locked">
                <div className="card achievement-card locked">
                    <div className="achievement-badge locked-badge">
                        <span className="badge-emoji">🏆</span>
                        <div className="lock-overlay">🔒</div>
                    </div>
                    <h4>Maestro Circular</h4>
                    <p>Completa 100 acciones de cualquier tipo</p>
                    <div className="achievement-progress">
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: `${Math.min((totalActions / 100) * 100, 100)}%` }}></div></div>
                        <span>{totalActions}/100 acciones</span>
                    </div>
                </div>
                <div className="card achievement-card locked">
                    <div className="achievement-badge locked-badge">
                        <span className="badge-emoji">💎</span>
                        <div className="lock-overlay">🔒</div>
                    </div>
                    <h4>Diamante Verde</h4>
                    <p>Alcanza el Nivel 30</p>
                    <div className="achievement-progress">
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: `${Math.min((currentLevel / 30) * 100, 100)}%` }}></div></div>
                        <span>Nivel {currentLevel}/30</span>
                    </div>
                </div>
                <div className="card achievement-card locked">
                    <div className="achievement-badge locked-badge">
                        <span className="badge-emoji">🌳</span>
                        <div className="lock-overlay">🔒</div>
                    </div>
                    <h4>Guardián del Bosque</h4>
                    <p>Ahorra el equivalente a 1 árbol en materiales</p>
                    <div className="achievement-progress">
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: '20%' }}></div></div>
                        <span>20%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logros;
