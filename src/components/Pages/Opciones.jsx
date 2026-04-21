import React, { useState, useEffect } from 'react';

const Opciones = ({ toggleDarkMode, updateProfile, onLogout, user }) => {
    const [name, setName] = useState(user?.name || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [user]);
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

    const handleSaveProfile = () => {
        // Si el usuario aún no ha cargado, no hacemos nada
        if (!user || user.name === 'Cargando...') return;

        // Limpiamos los inputs de espacios extra
        const trimmedName = name.trim();
        const trimmedLastName = lastName.trim();
        const trimmedEmail = email.trim();

        // Validar si la información es EXACTAMENTE la misma que ya tenemos
        const isSameInfo = 
            trimmedName === (user?.name || '').trim() &&
            trimmedLastName === (user?.lastName || '').trim() &&
            trimmedEmail === (user?.email || '').trim();

        if (isSameInfo) {
            if (window.showToast) {
                window.showToast('La información es la misma que la de tu perfil actual 📝', 'info');
            }
            return;
        }

        // Si hay cambios, procedemos
        if (updateProfile) {
            updateProfile(trimmedName, trimmedLastName, trimmedEmail);
            if (window.showToast) {
                window.showToast('¡Perfil actualizado con éxito! 🌿', 'success');
            }
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            if (window.showToast) window.showToast('Cuenta eliminada. Lamentamos verte ir 😢', 'error');
            setTimeout(() => {
                if (onLogout) onLogout();
            }, 2000);
        }
    };

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
                                <span>{name.charAt(0).toUpperCase()}</span>
                            </div>
                            <button className="btn btn-sm btn-outline" id="btn-change-avatar" onClick={() => window.showToast('Funcionalidad de cambiar foto próximamente ✨', 'info')}>Cambiar foto</button>
                        </div>
                        <div className="settings-form">
                            <div className="form-group">
                                <label htmlFor="settings-name">Nombre</label>
                                <input type="text" id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="settings-lastname">Apellido</label>
                                <input type="text" id="settings-lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="settings-email">Correo</label>
                                <input type="email" id="settings-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button className="btn btn-primary btn-sm" id="btn-save-profile" onClick={handleSaveProfile}>Guardar cambios</button>
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
                        <button className="btn btn-outline btn-full" id="btn-change-password" onClick={() => window.showToast && window.showToast('Se envió un enlace a tu correo para cambiar tu contraseña', 'success')}>Cambiar contraseña</button>
                        <button className="btn btn-outline btn-full" id="btn-export-data" onClick={() => window.showToast && window.showToast('Datos exportados. Revisa tu correo 📧', 'success')}>Exportar mis datos</button>
                        <button className="btn btn-danger btn-full" id="btn-delete-account" onClick={handleDeleteAccount}>Eliminar cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opciones;
