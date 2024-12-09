import { useEffect, useState } from "react";
import ConfirmationModal from '@/components/ConfirmationModal';
import MessageNotification from '@/components/MessageNotification';
import io from 'socket.io-client';
const api = process.env.NEXT_PUBLIC_API_URL;
const socket = io(api, {
  transports: ['websocket']
});
const Notification = ({ isOpen, closeModal }) => {

  // Pruebas notificaciones para movil
  useEffect(() => {
    socket.emit('register', 3);
    // Escuchar el evento de nueva notificación desde el servidor
    socket.on('receive_private_notification', (data) => {
      console.log(data.message); // Ver mensaje de notificación en consola
    });

    // Limpia el evento al desmontar el componente
    return () => {
      socket.off('receive_private_notification');
    };
  }, []);

  const [notifications, setNotifications] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAppont, setConfirmAppont] = useState(null);
  const [confirmAppontId, setConfirmAppontId] = useState(null);

  const [isConfirmModalOpenCancel, setIsConfirmModalOpenCancel] = useState(false);
  const [cancelAppont, setCancelAppont] = useState(null);
  const [cancelAppontId, setCancelAppontId] = useState(null);

  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (isOpen) {
      fetchNotificationsData();
    }
  }, [!isOpen]);

  const fetchNotificationsData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/notification/getNotifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        console.log(data);
      } else {
        console.error('Error al obtener las notificaciones');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  }

  function formatTimeTo12Hour(time) {
    // Crea un objeto Date usando la hora en formato `HH:mm:ss`
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

    // Usa toLocaleTimeString para formatear en 12 horas
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  const confirmAppointment = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/appointment/confirm/${confirmAppont}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setNotification({ message: "Cita confirmada", type: "success" });
        socket.emit('confirmed', { toUserId: confirmAppontId });
        fetchNotificationsData();
      } else {
        setNotification({ message: "Error al confirmar la cita", type: "error" });
      }
    } catch (error) {
      console.error('Error en la solicitud de confirmación: ', error);
      setNotification({ message: "Hubo un error en la solicitud de confirmación", type: "error" });
    } finally {
      setIsConfirmModalOpen(false);
      setConfirmAppont(null);
      setConfirmAppontId(null);
    }
  };

  const confirm = (id, patientId) => {
    setConfirmAppont(id);
    setConfirmAppontId(patientId);
    setIsConfirmModalOpen(true);
  };

  const cancelAppointment = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/appointment/cancel/${cancelAppont}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setNotification({ message: "La Cita ha sido cancelada", type: "error" });
        socket.emit('cancel', { toUserId: cancelAppontId });
        fetchNotificationsData();
      } else {
        setNotification({ message: "Error al cancelar la cita", type: "error" });
      }
    } catch (error) {
      console.error('Error en la solicitud de cancelación: ', error);
      setNotification({ message: "Hubo un error en la solicitud de cancelación", type: "error" });
    } finally {
      setIsConfirmModalOpenCancel(false);
      setCancelAppont(null);
      setCancelAppontId(null);
    }
  };

  const cancel = (id, patientId) => {
    setCancelAppont(id);
    setCancelAppontId(patientId);
    setIsConfirmModalOpenCancel(true);
  };

  if (!isOpen || !notifications) return null;


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-10/12 md:w-2/4 lg:w-2/5 2xl:w-1/4">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center pb-3 border-b bg-blue-500 text-white p-3 rounded-t-lg">
          <h3 className="text-xl font-semibold">Notificaciones</h3>
          <button onClick={closeModal} className="text-white">
            ✕
          </button>
        </div>

        {/* Contenedor de notificaciones con scroll */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-96 menu-scroll"> {/* Scroll activado */}
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700 font-bold">
                    {notification.Patient.Login.name}!
                  </p>
                </div>
                <p className="text-gray-600 mt-2">
                  Solicitó una cita para el día{' '}
                  <span className="font-bold">{notification.Appointment.date}</span>{' '}
                  en un horario de{' '}
                  <span className="font-bold">{formatTimeTo12Hour(notification.Appointment.time)}</span>
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row justify-end mt-4 space-y-2 sm:space-y-0 space-x-0 sm:space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => confirm(notification.appointmentId, notification.Patient.id)}
                  >
                    Confirmar cita
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => cancel(notification.appointmentId, notification.Patient.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mb-4">No hay notificaciones pendientes.</p>
          )}
        </div>

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onConfirm={confirmAppointment}
          title={"¿Confirmar cita?"}
          message={"¿Estás seguro de que deseas confirmar esta cita? Esta acción no se puede deshacer."}
          onCancel={() => setIsConfirmModalOpen(false)}
          buttonText={"Confirmar"}
          styles={"hover:bg-blue-600 bg-blue-500"}
        />

        <ConfirmationModal
          isOpen={isConfirmModalOpenCancel}
          onConfirm={cancelAppointment}
          title={"¿Cancelar cita?"}
          message={"¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."}
          onCancel={() => setIsConfirmModalOpenCancel(false)}
          buttonText={"Si"}
          buttonTextC={"No"}
        />

        {notification.message && (
          <MessageNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}

      </div>
    </div>
  );
};

export default Notification;
