import { useEffect, useState } from "react";


const Notification = ({ isOpen, closeModal }) => {

  const [notifications, setNotifications] = useState(null);

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

  if (!isOpen || !notifications) return null;


  const notificaciones = [
    { nombrePaciente: 'Juan Pérez', fecha: '26/05/2024', hora: '10:00' },
    { nombrePaciente: 'Ana Gómez', fecha: '27/05/2024', hora: '11:00' },
    { nombrePaciente: 'Luis López', fecha: '28/05/2024', hora: '09:00' },
    // Agrega más notificaciones para probar el scroll
  ];


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2">
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
                  <span className="font-bold">{notification.Appointment.time}</span>.
                </p>

                {/* Botones de acción */}
                <div className="flex justify-end mt-4 space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Confirmar cita
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mb-4">No hay notificaciones pendientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
