import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const MessageNotification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Cierra la notificación después de 3 segundos
        return () => clearTimeout(timer);
    }, [onClose]);

    // Estilos condicionales según el tipo de notificación
    const notificationStyle = type === "success" ? "bg-green-500" : "bg-red-500";
    const icon = type === "success" ? faCheckCircle : faExclamationCircle;

    return (
        <div className={`fixed top-5 right-5 ${notificationStyle} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}>
            <FontAwesomeIcon icon={icon} className="h-5 w-5" />
            <span className="align-middle">{message}</span>
            <button onClick={onClose} className="text-white ml-2">
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
            </button>
        </div>
    );
};

export default MessageNotification;
