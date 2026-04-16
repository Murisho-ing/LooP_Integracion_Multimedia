import React, { useEffect } from 'react';

const Inicio = ({ user, changePage }) => {
    // Animating the ring when the component mounts
    useEffect(() => {
        const ring = document.querySelector('.progress-ring-fill');
        if (ring) {
            const circumference = 2 * Math.PI * 95;
            const progress = user.xp / user.maxXp;
            const offset = circumference * (1 - progress);

            ring.style.strokeDasharray = circumference;
            // Initially set it to 0 progress visually (max offset)
            ring.style.strokeDashoffset = circumference;

            const timer = setTimeout(() => {
                ring.style.transition = 'stroke-dashoffset 1.5s ease';
                ring.style.strokeDashoffset = offset;
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [user.xp, user.maxXp]);

    return (
        <div id="page-inicio" className="page active-page">
            <div className="page-header">
                <div>
                    <h1 className="greeting" id="greeting-text">Hola, {user.name}</h1>
                    <p className="greeting-sub">Cada decisión cuenta. Hoy diste un paso hacia un modelo más <em>sostenible</em> y <em>consciente</em>.</p>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Progreso General */}
                <div className="card card-progress" id="card-progress">
                    <div className="progress-info">
                        <p className="progress-label">Nivel de impacto sostenible</p>
                        <div className="progress-score">
                            <span className="score-number">{user.xp}</span><span className="score-total">/{user.maxXp}</span>
                        </div>
                        <p className="progress-msg">Tu progreso está marcando la diferencia. <strong>SIGUE ASÍ</strong></p>
                    </div>
                    <div className="progress-ring-container">
                        <svg className="progress-ring" width="220" height="220" viewBox="0 0 220 220">
                            <circle className="progress-ring-bg" cx="110" cy="110" r="95" fill="none" stroke="#dde2dd" strokeWidth="16"/>
                            <circle className="progress-ring-fill" cx="110" cy="110" r="95" fill="none" stroke="#216D28" strokeWidth="16" strokeLinecap="round"
                                strokeDasharray="596.9" strokeDashoffset="89.5" transform="rotate(-90 110 110)"/>
                        </svg>
                        <div className="progress-ring-text">
                            <span className="ring-level">Nivel {user.level}</span>
                        </div>
                    </div>
                </div>

                {/* Tareas Diarias */}
                <div className="card card-tasks" id="card-tasks">
                    <div className="card-header-sm">
                        <h3>Tareas Diarias</h3>
                        <p className="tasks-hint">Termina 2 más para completar una meta</p>
                    </div>
                    <div className="tasks-progress">
                        <div className="tasks-percent">50%</div>
                        <div className="tasks-count">2/4 Completadas</div>
                    </div>
                    <div className="tasks-bar">
                        <div className="tasks-bar-fill" style={{ width: '50%' }}></div>
                    </div>
                    <button className="btn btn-outline btn-full" id="btn-ver-tareas" onClick={() => changePage('page-acciones')}>Ver Tareas Diarias</button>
                </div>

                {/* Gráfica Semanal */}
                <div className="card card-chart" id="card-weekly-chart">
                    <h3>Materiales recuperados semanalmente</h3>
                    <div className="chart-bars">
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '55%' }} data-value="5"></div>
                                <div className="bar bar-light" style={{ height: '35%' }} data-value="3"></div>
                            </div>
                            <span className="bar-label">LU</span>
                        </div>
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '70%' }} data-value="7"></div>
                                <div className="bar bar-light" style={{ height: '45%' }} data-value="4"></div>
                            </div>
                            <span className="bar-label">MA</span>
                        </div>
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '85%' }} data-value="9"></div>
                                <div className="bar bar-light" style={{ height: '60%' }} data-value="6"></div>
                            </div>
                            <span className="bar-label">MI</span>
                        </div>
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '50%' }} data-value="5"></div>
                                <div className="bar bar-light" style={{ height: '30%' }} data-value="3"></div>
                            </div>
                            <span className="bar-label">JU</span>
                        </div>
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '65%' }} data-value="6"></div>
                                <div className="bar bar-light" style={{ height: '40%' }} data-value="4"></div>
                            </div>
                            <span className="bar-label">VI</span>
                        </div>
                        <div className="chart-bar-group">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '45%' }} data-value="4"></div>
                                <div className="bar bar-light" style={{ height: '25%' }} data-value="2"></div>
                            </div>
                            <span className="bar-label">SA</span>
                        </div>
                        <div className="chart-bar-group highlight">
                            <div className="bar-wrapper">
                                <div className="bar" style={{ height: '90%' }} data-value="9"></div>
                                <div className="bar bar-accent" style={{ height: '70%' }} data-value="7"></div>
                            </div>
                            <span className="bar-label">HOY</span>
                        </div>
                    </div>
                </div>

                {/* Curiosidades */}
                <div className="card card-curiosities" id="card-curiosities">
                    <span className="card-tag">Curiosidades</span>
                    <h3>Conoce nuevas formas de aplicar la economía circular</h3>
                    <a href="#" className="link-arrow" onClick={(e) => { e.preventDefault(); changePage('page-ayuda'); }}>Conoce más →</a>
                </div>

                {/* Impacto en Detalle */}
                <div className="card card-impact" id="card-impact">
                    <div className="impact-overlay">
                        <span className="card-tag tag-light">Tu impacto en detalle</span>
                        <div className="impact-stat">
                            <span className="impact-label">Reutilizaste</span>
                            <span className="impact-number">12 veces</span>
                        </div>
                        <p className="impact-msg">Eso ya es un gran compromiso</p>
                        <div className="impact-nav">
                            <button className="impact-nav-btn" id="impact-prev">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                            </button>
                            <button className="impact-nav-btn" id="impact-next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reto Semanal */}
                <div className="card card-challenge" id="card-challenge">
                    <div className="challenge-header">
                        <h3>Reto Semanal: Reduce el Consumo de Plástico</h3>
                        <span className="xp-badge">+500 XP</span>
                    </div>
                    <p className="challenge-desc">Evita usar bolsas, botellas o cualquier objeto plástico que no necesites en tu día a día.</p>
                    <div className="challenge-actions">
                        <button className="btn btn-primary" id="btn-iniciar-reto">Iniciar Reto</button>
                        <button className="btn btn-outline" id="btn-guia-reto">Ver Guía del Reto</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
