import React, { useState } from 'react';

const ActionModal = ({ isVisible, closeModal }) => {
    const [actionType, setActionType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!actionType) {
            alert('Selecciona un tipo de acción');
            return;
        }
        if (!description.trim()) {
            alert('Escribe una descripción de tu acción');
            return;
        }
        closeModal();
        alert('¡Acción registrada con éxito! +40 XP 🌿');
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" id="action-modal" onClick={(e) => {
            if(e.target.className === 'modal-overlay') closeModal();
        }}>
            <div className="modal" id="modal-content">
                <div className="modal-header">
                    <h2>Registrar Acción</h2>
                    <button className="modal-close" onClick={closeModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <form id="action-form" onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Tipo de acción</label>
                            <div className="action-type-grid" id="action-type-grid">
                                <button type="button" className={`action-type-btn ${actionType === 'reutilizar' ? 'selected' : ''}`} onClick={() => setActionType('reutilizar')}>
                                    <span>♻️</span> Reutilizar
                                </button>
                                <button type="button" className={`action-type-btn ${actionType === 'reducir' ? 'selected' : ''}`} onClick={() => setActionType('reducir')}>
                                    <span>📉</span> Reducir
                                </button>
                                <button type="button" className={`action-type-btn ${actionType === 'reciclar' ? 'selected' : ''}`} onClick={() => setActionType('reciclar')}>
                                    <span>🗑️</span> Reciclar
                                </button>
                                <button type="button" className={`action-type-btn ${actionType === 'reparar' ? 'selected' : ''}`} onClick={() => setActionType('reparar')}>
                                    <span>🔧</span> Reparar
                                </button>
                                <button type="button" className={`action-type-btn ${actionType === 'intercambiar' ? 'selected' : ''}`} onClick={() => setActionType('intercambiar')}>
                                    <span>🔄</span> Intercambiar
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="action-description">Descripción</label>
                            <textarea id="action-description" placeholder="¿Qué hiciste hoy por el planeta?" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="action-impact">Nivel de impacto</label>
                            <select id="action-impact" className="setting-select" defaultValue="medium">
                                <option value="low">Bajo (+20 XP)</option>
                                <option value="medium">Medio (+40 XP)</option>
                                <option value="high">Alto (+60 XP)</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary" id="btn-submit-action">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActionModal;
