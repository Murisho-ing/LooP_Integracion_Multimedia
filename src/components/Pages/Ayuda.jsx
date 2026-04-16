import React, { useState } from 'react';

const Ayuda = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div id="page-ayuda" className="page active-page">
            <div className="page-header">
                <div>
                    <h1>Centro de Ayuda</h1>
                    <p className="greeting-sub">¿Tienes dudas? Estamos aquí para ayudarte</p>
                </div>
            </div>

            {/* Buscar ayuda */}
            <div className="card help-search-card" id="help-search">
                <h3>¿En qué podemos ayudarte?</h3>
                <div className="help-search-input">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Buscar en la guía de ayuda..." id="help-search-field" />
                </div>
            </div>

            {/* Categorías */}
            <div className="help-categories" id="help-categories">
                <div className="card help-category-card">
                    <span className="help-cat-icon">🚀</span>
                    <h4>Primeros Pasos</h4>
                    <p>Aprende cómo funciona LooP y empieza a registrar acciones</p>
                </div>
                <div className="card help-category-card">
                    <span className="help-cat-icon">📊</span>
                    <h4>Progreso y Niveles</h4>
                    <p>Entiende cómo se calculan tus puntos y niveles</p>
                </div>
                <div className="card help-category-card">
                    <span className="help-cat-icon">🏆</span>
                    <h4>Logros y Retos</h4>
                    <p>Descubre cómo desbloquear logros y participar en retos</p>
                </div>
                <div className="card help-category-card">
                    <span className="help-cat-icon">👥</span>
                    <h4>Comunidad</h4>
                    <p>Conecta con otros usuarios y participa en retos grupales</p>
                </div>
                <div className="card help-category-card">
                    <span className="help-cat-icon">🔒</span>
                    <h4>Cuenta y Privacidad</h4>
                    <p>Gestiona tu cuenta, datos y configuración de privacidad</p>
                </div>
                <div className="card help-category-card">
                    <span className="help-cat-icon">💡</span>
                    <h4>Tips Sostenibles</h4>
                    <p>Ideas y consejos para vivir de forma más sostenible</p>
                </div>
            </div>

            {/* FAQ */}
            <div className="card" id="card-faq">
                <h3>Preguntas Frecuentes</h3>
                <div className="faq-list" id="faq-list">
                    <div className={`faq-item ${openFaq === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>
                        <div className="faq-question">
                            <span>¿Cómo se calculan los puntos de impacto?</span>
                            <svg className="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div className="faq-answer">
                            <p>Los puntos se calculan según el tipo de acción que realizas. Cada categoría (reutilizar, reducir, reciclar, reparar, intercambiar) tiene un valor base que puede variar según la frecuencia e impacto de la acción. Acciones más significativas otorgan más puntos XP.</p>
                        </div>
                    </div>
                    <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
                        <div className="faq-question">
                            <span>¿Cómo avanzo de nivel?</span>
                            <svg className="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div className="faq-answer">
                            <p>Cada nivel requiere acumular una cantidad de XP. A medida que subes de nivel, necesitas más XP para avanzar. Completar tareas diarias, retos semanales y participar en la comunidad te ayuda a ganar XP más rápido.</p>
                        </div>
                    </div>
                    <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
                        <div className="faq-question">
                            <span>¿Puedo crear mi propio reto grupal?</span>
                            <svg className="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div className="faq-answer">
                            <p>¡Sí! A partir del Nivel 15 puedes proponer retos grupales para la comunidad. Ve a Comunidad → Retos Grupales → Crear Reto para empezar.</p>
                        </div>
                    </div>
                    <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
                        <div className="faq-question">
                            <span>¿Mis datos son privados?</span>
                            <svg className="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div className="faq-answer">
                            <p>Tus datos personales están protegidos. Puedes controlar qué información es visible para otros usuarios desde Opciones → Privacidad. También puedes exportar o eliminar tus datos en cualquier momento.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contacto */}
            <div className="card help-contact" id="help-contact">
                <div className="help-contact-content">
                    <h3>¿No encontraste lo que buscabas?</h3>
                    <p>Nuestro equipo está disponible para ayudarte</p>
                    <div className="help-contact-actions">
                        <button className="btn btn-primary" id="btn-contact-email">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Enviar email
                        </button>
                        <button className="btn btn-outline" id="btn-contact-chat">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            Chat en vivo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ayuda;
