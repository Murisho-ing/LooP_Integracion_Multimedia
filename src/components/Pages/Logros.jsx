import React from 'react';

const Logros = () => {
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
                                strokeDasharray="251.3" strokeDashoffset="75.4" transform="rotate(-90 50 50)"/>
                        </svg>
                        <span className="summary-percent">70%</span>
                    </div>
                    <div className="summary-info">
                        <h3>Progreso General</h3>
                        <p>14 de 20 logros desbloqueados</p>
                    </div>
                </div>
                <div className="card achievement-summary-card">
                    <span className="summary-emoji">🔥</span>
                    <div className="summary-info">
                        <h3>Racha Actual</h3>
                        <p>12 días consecutivos</p>
                    </div>
                </div>
                <div className="card achievement-summary-card">
                    <span className="summary-emoji">⭐</span>
                    <div className="summary-info">
                        <h3>Puntos Totales</h3>
                        <p>4,850 XP acumulados</p>
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
                    <span className="achievement-date">Desbloqueado: 2 Ene 2026</span>
                </div>
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">♻️</span>
                    </div>
                    <h4>Reciclador Novato</h4>
                    <p>Recicla 10 materiales diferentes</p>
                    <span className="achievement-date">Desbloqueado: 15 Ene 2026</span>
                </div>
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">🔥</span>
                    </div>
                    <h4>Racha de 7 Días</h4>
                    <p>Mantén una racha de 7 días seguidos</p>
                    <span className="achievement-date">Desbloqueado: 22 Ene 2026</span>
                </div>
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">🌍</span>
                    </div>
                    <h4>Ciudadano Eco</h4>
                    <p>Alcanza el Nivel 10</p>
                    <span className="achievement-date">Desbloqueado: 5 Feb 2026</span>
                </div>
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">🔧</span>
                    </div>
                    <h4>Reparador</h4>
                    <p>Repara 5 objetos en lugar de desechar</p>
                    <span className="achievement-date">Desbloqueado: 18 Feb 2026</span>
                </div>
                <div className="card achievement-card unlocked">
                    <div className="achievement-badge">
                        <span className="badge-emoji">🤝</span>
                    </div>
                    <h4>Intercambiador</h4>
                    <p>Realiza 5 intercambios con otros usuarios</p>
                    <span className="achievement-date">Desbloqueado: 1 Mar 2026</span>
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
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: '73%' }}></div></div>
                        <span>73/100</span>
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
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: '80%' }}></div></div>
                        <span>Nivel 24/30</span>
                    </div>
                </div>
                <div className="card achievement-card locked">
                    <div className="achievement-badge locked-badge">
                        <span className="badge-emoji">🌟</span>
                        <div className="lock-overlay">🔒</div>
                    </div>
                    <h4>Racha Legendaria</h4>
                    <p>Mantén una racha de 30 días</p>
                    <div className="achievement-progress">
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: '40%' }}></div></div>
                        <span>12/30 días</span>
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
                        <div className="achievement-bar"><div className="achievement-bar-fill" style={{ width: '55%' }}></div></div>
                        <span>55%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logros;
