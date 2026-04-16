import React from 'react';

const Opciones = ({ toggleDarkMode }) => {
    return (
        <div id="page-opciones" className="page active-page">
            <div className="page-header">
                <div>
                    <h1>Opciones</h1>
                    <p className="greeting-sub">Personaliza tu experiencia en LooP</p>
                </div>
            </div>

            <div className="settings-grid" id="settings-grid">
                {/* Perfil */}
                <div className="card settings-card" id="settings-profile">
                    <h3>👤 Perfil</h3>
                    <div className="settings-profile-header">
                        <div className="settings-avatar">
                            <div className="settings-avatar-img" id="settings-avatar-img">
                                <span>M</span>
                            </div>
                            <button className="btn btn-sm btn-outline" id="btn-change-avatar">Cambiar foto</button>
                        </div>
                        <div className="settings-form">
                            <div className="form-group">
                                <label htmlFor="settings-name">Nombre</label>
                                <input type="text" id="settings-name" defaultValue="Mariana" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="settings-lastname">Apellido</label>
                                <input type="text" id="settings-lastname" defaultValue="Rodríguez" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="settings-email">Correo</label>
                                <input type="email" id="settings-email" defaultValue="mariana@email.com" />
                            </div>
                            <button className="btn btn-primary btn-sm" id="btn-save-profile">Guardar cambios</button>
                        </div>
                    </div>
                </div>

                {/* Notificaciones */}
                <div className="card settings-card" id="settings-notifications">
                    <h3>🔔 Notificaciones</h3>
                    <div className="settings-options">
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Recordatorio diario</span>
                                <span className="setting-desc">Recibe un recordatorio para completar tus tareas</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked id="toggle-daily" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Logros desbloqueados</span>
                                <span className="setting-desc">Notificación cuando desbloquees un nuevo logro</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked id="toggle-achievements" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Actividad de comunidad</span>
                                <span className="setting-desc">Interacciones en el feed y retos grupales</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" id="toggle-community" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Retos semanales</span>
                                <span className="setting-desc">Aviso cuando haya un nuevo reto disponible</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked id="toggle-challenges" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Apariencia */}
                <div className="card settings-card" id="settings-appearance">
                    <h3>🎨 Apariencia</h3>
                    <div className="settings-options">
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Modo oscuro</span>
                                <span className="setting-desc">Cambia el tema de la aplicación</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" id="toggle-dark-mode" onChange={(e) => toggleDarkMode(e.target.checked)} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <span className="setting-name">Idioma</span>
                            <select className="setting-select" id="select-language" defaultValue="es">
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Privacidad */}
                <div className="card settings-card" id="settings-privacy">
                    <h3>🔒 Privacidad</h3>
                    <div className="settings-options">
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Perfil público</span>
                                <span className="setting-desc">Otros usuarios pueden ver tu perfil y estadísticas</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked id="toggle-public" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-toggle">
                            <div>
                                <span className="setting-name">Mostrar en ranking</span>
                                <span className="setting-desc">Aparecer en el ranking de la comunidad</span>
                            </div>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked id="toggle-ranking" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Cuenta */}
                <div className="card settings-card" id="settings-account">
                    <h3>⚙️ Cuenta</h3>
                    <div className="settings-options">
                        <button className="btn btn-outline btn-full" id="btn-change-password">Cambiar contraseña</button>
                        <button className="btn btn-outline btn-full" id="btn-export-data">Exportar mis datos</button>
                        <button className="btn btn-danger btn-full" id="btn-delete-account">Eliminar cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opciones;
