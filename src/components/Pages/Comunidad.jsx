import React, { useState } from 'react';

const Comunidad = () => {
    const [activeTab, setActiveTab] = useState('ranking');
    const [activePeriod, setActivePeriod] = useState('Semanal');

    return (
        <div id="page-comunidad" className="page active-page">
            <div className="page-header">
                <div>
                    <h1>Comunidad</h1>
                    <p className="greeting-sub">Conecta con otros agentes de cambio y comparte tu impacto</p>
                </div>
            </div>

            {/* Tabs Comunidad */}
            <div className="community-tabs" id="community-tabs">
                <button className={`tab-btn ${activeTab === 'ranking' ? 'active' : ''}`} onClick={() => setActiveTab('ranking')}>Ranking</button>
                <button className={`tab-btn ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => setActiveTab('feed')}>Feed</button>
                <button className={`tab-btn ${activeTab === 'retos' ? 'active' : ''}`} onClick={() => setActiveTab('retos')}>Retos Grupales</button>
            </div>

            {/* Tab: Ranking */}
            {activeTab === 'ranking' && (
                <div className="tab-content active" id="tab-ranking">
                    <div className="card" id="card-ranking">
                        <div className="ranking-header">
                            <h3>Ranking Semanal</h3>
                            <div className="ranking-period">
                                <button className={`period-btn ${activePeriod === 'Semanal' ? 'active' : ''}`} onClick={() => setActivePeriod('Semanal')}>Semanal</button>
                                <button className={`period-btn ${activePeriod === 'Mensual' ? 'active' : ''}`} onClick={() => setActivePeriod('Mensual')}>Mensual</button>
                                <button className={`period-btn ${activePeriod === 'Total' ? 'active' : ''}`} onClick={() => setActivePeriod('Total')}>Total</button>
                            </div>
                        </div>
                        <div className="ranking-podium" id="ranking-podium">
                            <div className="podium-item second">
                                <div className="podium-avatar">
                                    <span>C</span>
                                </div>
                                <span className="podium-name">Carlos M.</span>
                                <span className="podium-xp">1,120 XP</span>
                                <div className="podium-bar">2</div>
                            </div>
                            <div className="podium-item first">
                                <div className="podium-crown">👑</div>
                                <div className="podium-avatar gold">
                                    <span>M</span>
                                </div>
                                <span className="podium-name">Mariana R.</span>
                                <span className="podium-xp">1,350 XP</span>
                                <div className="podium-bar tall">1</div>
                            </div>
                            <div className="podium-item third">
                                <div className="podium-avatar">
                                    <span>L</span>
                                </div>
                                <span className="podium-name">Laura G.</span>
                                <span className="podium-xp">980 XP</span>
                                <div className="podium-bar short">3</div>
                            </div>
                        </div>
                        <div className="ranking-list" id="ranking-list">
                            <div className="ranking-item">
                                <span className="rank-position">4</span>
                                <div className="rank-avatar"><span>D</span></div>
                                <span className="rank-name">Diego S.</span>
                                <span className="rank-xp">870 XP</span>
                                <span className="rank-level">Nivel 21</span>
                            </div>
                            <div className="ranking-item">
                                <span className="rank-position">5</span>
                                <div className="rank-avatar"><span>A</span></div>
                                <span className="rank-name">Ana P.</span>
                                <span className="rank-xp">820 XP</span>
                                <span className="rank-level">Nivel 19</span>
                            </div>
                            <div className="ranking-item">
                                <span className="rank-position">6</span>
                                <div className="rank-avatar"><span>J</span></div>
                                <span className="rank-name">Jorge L.</span>
                                <span className="rank-xp">750 XP</span>
                                <span className="rank-level">Nivel 18</span>
                            </div>
                            <div className="ranking-item">
                                <span className="rank-position">7</span>
                                <div className="rank-avatar"><span>S</span></div>
                                <span className="rank-name">Sofía V.</span>
                                <span className="rank-xp">690 XP</span>
                                <span className="rank-level">Nivel 16</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Feed */}
            {activeTab === 'feed' && (
                <div className="tab-content active" id="tab-feed">
                    <div className="feed-list" id="feed-list">
                        <div className="card feed-item">
                            <div className="feed-header">
                                <div className="feed-user">
                                    <div className="feed-avatar"><span>C</span></div>
                                    <div>
                                        <span className="feed-name">Carlos M.</span>
                                        <span className="feed-time">Hace 2 horas</span>
                                    </div>
                                </div>
                            </div>
                            <p className="feed-text">¡Acabo de completar mi reto semanal de cero plástico! 🎉 No fue fácil, pero se siente increíble saber que mi impacto cuenta.</p>
                            <div className="feed-actions-bar">
                                <button className="feed-action-btn">❤️ 24</button>
                                <button className="feed-action-btn">💬 8</button>
                                <button className="feed-action-btn">🔄 Compartir</button>
                            </div>
                        </div>
                        <div className="card feed-item">
                            <div className="feed-header">
                                <div className="feed-user">
                                    <div className="feed-avatar"><span>L</span></div>
                                    <div>
                                        <span className="feed-name">Laura G.</span>
                                        <span className="feed-time">Hace 5 horas</span>
                                    </div>
                                </div>
                            </div>
                            <p className="feed-text">Hoy intercambié 3 libros con mis vecinos 📚 ¡La economía circular empieza en la comunidad!</p>
                            <div className="feed-actions-bar">
                                <button className="feed-action-btn">❤️ 18</button>
                                <button className="feed-action-btn">💬 5</button>
                                <button className="feed-action-btn">🔄 Compartir</button>
                            </div>
                        </div>
                        <div className="card feed-item">
                            <div className="feed-header">
                                <div className="feed-user">
                                    <div className="feed-avatar gold"><span>M</span></div>
                                    <div>
                                        <span className="feed-name">Mariana R.</span>
                                        <span className="feed-time">Ayer</span>
                                    </div>
                                </div>
                            </div>
                            <p className="feed-text">¡Desbloqueé el logro "Reparador"! 🔧 Reparé 5 objetos este mes en lugar de comprar nuevos. ¡Se puede!</p>
                            <div className="feed-actions-bar">
                                <button className="feed-action-btn">❤️ 42</button>
                                <button className="feed-action-btn">💬 12</button>
                                <button className="feed-action-btn">🔄 Compartir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Retos Grupales */}
            {activeTab === 'retos' && (
                <div className="tab-content active" id="tab-retos">
                    <div className="group-challenges" id="group-challenges">
                        <div className="card challenge-group-card">
                            <div className="challenge-group-header">
                                <h3>🌊 Semana Sin Plásticos de Un Solo Uso</h3>
                                <span className="challenge-status active-status">Activo</span>
                            </div>
                            <p>Únete con 48 personas para eliminar plásticos de un solo uso durante una semana.</p>
                            <div className="challenge-group-progress">
                                <div className="challenge-group-bar"><div className="challenge-group-fill" style={{ width: '65%' }}></div></div>
                                <span>32/48 participantes activos</span>
                            </div>
                            <div className="challenge-participants">
                                <div className="participant-avatars">
                                    <div className="mini-avatar">M</div>
                                    <div className="mini-avatar">C</div>
                                    <div className="mini-avatar">L</div>
                                    <div className="mini-avatar more">+29</div>
                                </div>
                                <button className="btn btn-sm btn-primary">Ya participas ✓</button>
                            </div>
                        </div>
                        <div className="card challenge-group-card">
                            <div className="challenge-group-header">
                                <h3>🚲 30 Días de Movilidad Sostenible</h3>
                                <span className="challenge-status upcoming-status">Próximo</span>
                            </div>
                            <p>Usa transporte público, bicicleta o camina durante 30 días seguidos.</p>
                            <div className="challenge-group-progress">
                                <div className="challenge-group-bar"><div className="challenge-group-fill" style={{ width: '30%' }}></div></div>
                                <span>15/50 inscritos</span>
                            </div>
                            <div className="challenge-participants">
                                <div className="participant-avatars">
                                    <div className="mini-avatar">D</div>
                                    <div className="mini-avatar">A</div>
                                    <div className="mini-avatar more">+13</div>
                                </div>
                                <button className="btn btn-sm btn-outline">Unirme</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comunidad;
