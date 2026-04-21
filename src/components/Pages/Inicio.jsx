import React, { useEffect, useState } from 'react';
import leaves from '../../assets/leaves.png';

const impactStats = [
    { label: 'Reutilizaste', number: '12 veces', msg: 'Eso ya es un gran compromiso' },
    { label: 'Intercambiaste', number: '8 veces', msg: 'Cada intercambio reduce el consumo' },
    { label: 'Reparaste', number: '5 objetos', msg: 'Menos residuos, más creatividad' },
    { label: 'Redujiste', number: '15 acciones', msg: 'Estás haciendo una gran diferencia' }
];

const Inicio = ({ user, changePage, tasks, completedTaskIds }) => {
    const [impactIndex, setImpactIndex] = useState(0);
    const [challengeStarted, setChallengeStarted] = useState(false);
    const [displayXp, setDisplayXp] = useState(user.xp);

    // Animating the XP number
    useEffect(() => {
        let start = displayXp;
        let end = user.xp;
        if (start === end) return;

        let duration = 800;
        let startTime = performance.now();

        function update(currentTime) {
            let elapsed = currentTime - startTime;
            let progress = Math.min(elapsed / duration, 1);
            let eased = 1 - Math.pow(1 - progress, 3);
            let current = Math.round(start + (end - start) * eased);
            setDisplayXp(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }, [user.xp]);

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

    const changeImpactStat = (direction) => {
        let newIndex = (impactIndex + direction + impactStats.length) % impactStats.length;
        
        const overlay = document.querySelector('.impact-overlay');
        if(overlay) {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                setImpactIndex(newIndex);
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }, 200);
        } else {
            setImpactIndex(newIndex);
        }
    };

    const handleStartChallenge = () => {
        if (!challengeStarted) {
            if(window.showToast) window.showToast('¡Reto iniciado! Tienes 7 días para completarlo 💪', 'success');
            setChallengeStarted(true);
        }
    };

    const handleGuideChallenge = () => {
        if(window.showToast) window.showToast('Guía del reto: Evita plásticos de un solo uso, usa bolsas reutilizables y botellas de agua recargables', 'info');
    };

    const currentStat = impactStats[impactIndex];

    const totalTasksCount = tasks ? tasks.length : 4;
    const completedTasksCount = completedTaskIds ? completedTaskIds.length : 2;
    const tasksPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

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
                            <span className="score-number">{displayXp}</span><span className="score-total">/{user.maxXp}</span>
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
                        <p className="tasks-hint">Termina {totalTasksCount - completedTasksCount} más para completar una meta</p>
                    </div>
                    <div className="tasks-progress">
                        <div className="tasks-percent">{tasksPercent}%</div>
                        <div className="tasks-count">{completedTasksCount}/{totalTasksCount} Completadas</div>
                    </div>
                    <div className="tasks-bar">
                        <div className="tasks-bar-fill" style={{ width: `${tasksPercent}%` }}></div>
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
                <div className="card card-impact card-with-bg" id="card-impact">
                    <div className="card-background">
                        <img src={leaves} alt="" className="card-bg-img" />
                        <div className="card-bg-overlay"></div>
                    </div>
                    <div className="impact-overlay" style={{ transition: 'all 0.3s ease' }}>
                        <span className="card-tag tag-light">Tu impacto en detalle</span>
                        <div className="impact-stat">
                            <span className="impact-label">{currentStat.label}</span>
                            <span className="impact-number">{currentStat.number}</span>
                        </div>
                        <p className="impact-msg">{currentStat.msg}</p>
                        <div className="impact-nav">
                            <button className="impact-nav-btn" id="impact-prev" onClick={() => changeImpactStat(-1)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                            </button>
                            <button className="impact-nav-btn" id="impact-next" onClick={() => changeImpactStat(1)}>
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
                        <button 
                            className="btn btn-primary" 
                            id="btn-iniciar-reto" 
                            onClick={handleStartChallenge} 
                            disabled={challengeStarted}
                            style={{ opacity: challengeStarted ? 0.7 : 1 }}
                        >
                            {challengeStarted ? 'Reto en progreso' : 'Iniciar Reto'}
                        </button>
                        <button className="btn btn-outline" id="btn-guia-reto" onClick={handleGuideChallenge}>Ver Guía del Reto</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
