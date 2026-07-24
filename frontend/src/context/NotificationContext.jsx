import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="toast-container">
                {notifications.map((n) => (
                    <div key={n.id} className={`toast toast-${n.type} animate-slide-in`}>
                        <div className="toast-icon">
                            {n.type === 'success' && <CheckCircle size={20} />}
                            {n.type === 'error' && <XCircle size={20} />}
                            {n.type === 'warning' && <AlertCircle size={20} />}
                            {n.type === 'info' && <Info size={20} />}
                        </div>
                        <div className="toast-content">{n.message}</div>
                        <button className="toast-close" onClick={() => removeNotification(n.id)}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
