import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { useFeed } from '../../hooks/useFeed';

const Comunidad = ({ user, data: dashboardData }) => {
    const [activeTab, setActiveTab] = useState('ranking');
    const [ranking, setRanking] = useState([]);
    const [loadingRanking, setLoadingRanking] = useState(false);
    
    // Feed State
    const { posts, loading: loadingFeed, createPost, toggleLike, addComment } = useFeed(!!user);
    const [newPostContent, setNewPostContent] = useState('');
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        const fetchRanking = async () => {
            setLoadingRanking(true);
            try {
                const response = await api.get('/dashboard/ranking');
                setRanking(response.data);
            } catch (err) {
                console.error('Error fetching ranking:', err);
            } finally {
                setLoadingRanking(false);
            }
        };

        if (activeTab === 'ranking') {
            fetchRanking();
        }
    }, [activeTab]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;
        try {
            await createPost(newPostContent);
            setNewPostContent('');
        } catch (err) {
            if (window.showToast) window.showToast(err, 'error');
        }
    };

    const handleAddComment = async (postId) => {
        if (!commentContent.trim()) return;
        try {
            await addComment(postId, commentContent);
            setCommentContent('');
            setActiveCommentId(null);
        } catch (err) {
            if (window.showToast) window.showToast(err, 'error');
        }
    };

    const podium = ranking.slice(0, 3);
    const rest = ranking.slice(3);
    const challenges = dashboardData?.allChallenges || [];

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
                            <h3>Ranking Global</h3>
                            <div className="ranking-period">
                                <button className={`period-btn active`}>Total XP</button>
                            </div>
                        </div>
                        
                        {loadingRanking ? (
                            <div className="loading-spinner">Cargando ranking...</div>
                        ) : ranking.length > 0 ? (
                            <>
                                <div className="ranking-podium" id="ranking-podium">
                                    {podium[1] && (
                                        <div className="podium-item second">
                                            <div className="podium-avatar"><span>{podium[1].name.charAt(0)}</span></div>
                                            <span className="podium-name">{podium[1].name} {podium[1].lastName?.charAt(0)}.</span>
                                            <div className="podium-stats">
                                                <span className="podium-xp">{podium[1].xp.toLocaleString()} XP</span>
                                                <span className="podium-level">Nivel {podium[1].level}</span>
                                            </div>
                                            <div className="podium-bar">2</div>
                                        </div>
                                    )}
                                    {podium[0] && (
                                        <div className="podium-item first">
                                            <div className="podium-crown">👑</div>
                                            <div className="podium-avatar gold"><span>{podium[0].name.charAt(0)}</span></div>
                                            <span className="podium-name">{podium[0].name} {podium[0].lastName?.charAt(0)}.</span>
                                            <div className="podium-stats">
                                                <span className="podium-xp">{podium[0].xp.toLocaleString()} XP</span>
                                                <span className="podium-level">Nivel {podium[0].level}</span>
                                            </div>
                                            <div className="podium-bar tall">1</div>
                                        </div>
                                    )}
                                    {podium[2] && (
                                        <div className="podium-item third">
                                            <div className="podium-avatar"><span>{podium[2].name.charAt(0)}</span></div>
                                            <span className="podium-name">{podium[2].name} {podium[2].lastName?.charAt(0)}.</span>
                                            <div className="podium-stats">
                                                <span className="podium-xp">{podium[2].xp.toLocaleString()} XP</span>
                                                <span className="podium-level">Nivel {podium[2].level}</span>
                                            </div>
                                            <div className="podium-bar short">3</div>
                                        </div>
                                    )}
                                </div>
                                <div className="ranking-list" id="ranking-list">
                                    {rest.map((r, i) => (
                                        <div key={r.id} className={`ranking-item ${r.id === user.id ? 'highlight' : ''}`}>
                                            <span className="rank-position">{i + 4}</span>
                                            <div className="rank-avatar"><span>{r.name.charAt(0)}</span></div>
                                            <span className="rank-name">{r.name} {r.lastName?.charAt(0)}.</span>
                                            <span className="rank-xp">{r.xp.toLocaleString()} XP</span>
                                            <span className="rank-level">Nivel {r.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="no-data">¡Sé el primero en el ranking!</p>
                        )}
                    </div>
                </div>
            )}

            {/* Tab: Feed */}
            {activeTab === 'feed' && (
                <div className="tab-content active" id="tab-feed">
                    <div className="card create-post-card">
                        <form onSubmit={handleCreatePost}>
                            <textarea 
                                placeholder="¿Qué acción sostenible has realizado hoy?"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            ></textarea>
                            <div className="create-post-actions">
                                <button type="submit" className="btn btn-primary" disabled={!newPostContent.trim()}>Publicar</button>
                            </div>
                        </form>
                    </div>

                    <div className="feed-list" id="feed-list">
                        {loadingFeed ? (
                            <div className="loading-spinner">Cargando feed...</div>
                        ) : posts.length > 0 ? (
                            posts.map(post => (
                                <div key={post.id} className="card feed-item">
                                    <div className="feed-header">
                                        <div className="feed-user">
                                            <div className="feed-avatar"><span>{post.user.name.charAt(0)}</span></div>
                                            <div>
                                                <span className="feed-name">{post.user.name} {post.user.lastName.charAt(0)}.</span>
                                                <span className="feed-time">{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="feed-text">{post.content}</p>
                                    
                                    <div className="feed-actions-bar">
                                        <button 
                                            className={`feed-action-btn ${post.isLiked ? 'active' : ''}`}
                                            onClick={() => toggleLike(post.id)}
                                        >
                                            {post.isLiked ? '❤️' : '🤍'} {post.likesCount}
                                        </button>
                                        <button 
                                            className="feed-action-btn"
                                            onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                                        >
                                            💬 {post.commentsCount}
                                        </button>
                                    </div>

                                    {activeCommentId === post.id && (
                                        <div className="feed-comments">
                                            <div className="comments-list">
                                                {post.comments?.map(comment => (
                                                    <div key={comment.id} className="comment-item">
                                                        <span className="comment-user">{comment.user.name}:</span>
                                                        <span className="comment-text">{comment.content}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="comment-input-area">
                                                <input 
                                                    type="text" 
                                                    placeholder="Escribe un comentario..."
                                                    value={commentContent}
                                                    onChange={(e) => setCommentContent(e.target.value)}
                                                />
                                                <button onClick={() => handleAddComment(post.id)}>Enviar</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">🌱</div>
                                <h3>El feed está vacío</h3>
                                <p>¡Sé el primero en compartir tu impacto con la comunidad!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tab: Retos Grupales */}
            {activeTab === 'retos' && (
                <div className="tab-content active" id="tab-retos">
                    <div className="group-challenges" id="group-challenges">
                        {challenges.length > 0 ? (
                            challenges.map(challenge => (
                                <div key={challenge.id} className="card challenge-group-card">
                                    <div className="challenge-group-header">
                                        <h3>{challenge.title}</h3>
                                        <span className={`challenge-status ${challenge.isActive ? 'active-status' : 'upcoming-status'}`}>
                                            {challenge.isActive ? 'Activo' : 'Próximo'}
                                        </span>
                                    </div>
                                    <p>{challenge.description}</p>
                                    <div className="challenge-group-progress">
                                        <div className="challenge-group-bar">
                                            <div 
                                                className="challenge-group-fill" 
                                                style={{ width: `${challenge.progress}%` }}
                                            ></div>
                                        </div>
                                        <span>Recompensa: {challenge.xpReward} XP</span>
                                    </div>
                                    {!challenge.isJoined && (
                                        <div className="challenge-participants">
                                            <button className="btn btn-sm btn-outline">Unirme al reto</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">🛡️</div>
                                <h3>No hay retos activos</h3>
                                <p>Vuelve pronto para participar en nuevas misiones grupales.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comunidad;
