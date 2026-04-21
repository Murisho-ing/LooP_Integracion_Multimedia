import React, { useState } from 'react';
import logo from '../../assets/logo blanco verde claro.png';

const Register = ({ changePage, onRegister }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            if (window.showToast) window.showToast('Las contraseñas no coinciden', 'error');
            return;
        }
        if (name && lastName && email && password) {
            onRegister(name, lastName, email, password);
        }
    };

    return (
        <div id="page-register" className="auth-page active-page">
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-brand">
                        <div className="auth-logo" id="auth-logo-register">
                            <img src={logo} alt="LooP Logo" className="logo-img-large" />
                        </div>
                        <p className="auth-tagline">Únete a la comunidad<br/>que cambia el mundo.</p>
                    </div>
                    <div className="auth-illustration">
                        <div className="auth-eco-shapes">
                            <div className="eco-circle eco-circle-1"></div>
                            <div className="eco-circle eco-circle-2"></div>
                            <div className="eco-circle eco-circle-3"></div>
                            <div className="eco-leaf">♻️</div>
                        </div>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-form-container">
                        <h1 className="auth-title">Crear Cuenta</h1>
                        <p className="auth-subtitle">Empieza tu camino sostenible</p>
                        <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="register-name">Nombre</label>
                                    <input type="text" id="register-name" placeholder="Tu nombre" required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-lastname">Apellido</label>
                                    <input type="text" id="register-lastname" placeholder="Tu apellido" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-email">Correo electrónico</label>
                                <input type="email" id="register-email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-password">Contraseña</label>
                                <div className="password-wrapper">
                                    <input type={showPassword ? "text" : "password"} id="register-password" placeholder="Mínimo 8 caracteres" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-confirm">Confirmar contraseña</label>
                                <div className="password-wrapper">
                                    <input type={showConfirm ? "text" : "password"} id="register-confirm" placeholder="Repite tu contraseña" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                                        {showConfirm ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <label className="checkbox-label" style={{ marginBottom: '1rem' }}>
                                <input type="checkbox" id="accept-terms" required />
                                <span className="checkbox-custom"></span>
                                Acepto los <a href="#">términos y condiciones</a>
                            </label>
                            <button type="submit" className="btn btn-primary btn-full" id="btn-register">Crear Cuenta</button>
                        </form>
                        <p className="auth-switch">¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); changePage('page-login'); }}>Iniciar sesión</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
