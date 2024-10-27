import React from 'react';

const Notification = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const notificaciones = [
    { nombrePaciente: 'Juan Pérez', fecha: '26/05/2024', hora: '10:00' },
    { nombrePaciente: 'Ana Gómez', fecha: '27/05/2024', hora: '11:00' },
    { nombrePaciente: 'Luis López', fecha: '28/05/2024', hora: '09:00' },
    // Agrega más notificaciones para probar el scroll
  ];
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/3">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center pb-3 border-b bg-blue-500 text-white p-3 rounded-t-lg">
          <h3 className="text-xl font-semibold">Notificaciones</h3>
          <button onClick={closeModal} className="text-white">
            ✕
          </button>
        </div>

        {/* Contenedor de notificaciones con scroll */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-96 menu-scroll"> {/* Scroll activado */}
          {notificaciones.length > 0 ? (
            notificaciones.map((notificacion, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700 font-bold">
                    {notificacion.nombrePaciente ? notificacion.nombrePaciente : '[Nombre del Paciente]'}!
                  </p>
                </div>
                <p className="text-gray-600 mt-2">
                  Solicitó una cita para el día{' '}
                  <span className="font-bold">{notificacion.fecha ? notificacion.fecha : '[00/00/00]'}</span>{' '}
                  en un horario de{' '}
                  <span className="font-bold">{notificacion.hora ? notificacion.hora : '[00:00]'}</span>.
                </p>

                {/* Botones de acción */}
                <div className="flex justify-end mt-2 space-x-2">
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
