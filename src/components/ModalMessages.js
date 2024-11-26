import React, { useState, useEffect, useRef } from 'react';

const ModalMessages = ({ isOpen, closeModal, paciente }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: 'Hola, ¿cómo estás?', enviadoPor: 'doctor' },
    { id: 2, texto: 'Estoy bien, gracias.', enviadoPor: 'paciente' },
    { id: 3, texto: 'Perfecto, nos vemos en tu próxima cita.', enviadoPor: 'doctor' },
    // Puedes agregar más mensajes para probar
  ]);

  // Referencia al contenedor de mensajes
  const mensajesEndRef = useRef(null);

  // Función para manejar el envío de mensajes
  const enviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      const nuevoMensaje = { id: mensajes.length + 1, texto: mensaje, enviadoPor: 'doctor' };
      setMensajes([...mensajes, nuevoMensaje]);
      setMensaje(''); // Limpiar el campo de texto
    }
  };

  // Usar useEffect para mover el scroll hacia abajo cuando hay nuevos mensajes
  useEffect(() => {
    if (mensajesEndRef.current) {
      mensajesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]); // Se ejecuta cada vez que cambian los mensajes

  useEffect(() => {
    if (mensajesEndRef.current) {
        mensajesEndRef.current.scrollIntoView({ behavior: 'auto' }); // Evita el scroll suave solo al inicio
    }
}, [isOpen]); // Este efecto se ejecuta cuando se abre el modal

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg md:w-1/2 lg:w-1/4">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center pb-3 bg-blue-500 text-white rounded-t-lg p-3">
          <h3 className="text-xl font-semibold">{paciente ? paciente : 'Nombre del paciente'}</h3>
          <button onClick={closeModal} className="text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-80 menu-scroll">
          {mensajes.length > 0 ? (
            mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 my-2 rounded-md ${
                  msg.enviadoPor === 'doctor' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                }`}
              >
                <p>{msg.texto}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay mensajes aún.</p>
          )}
          {/* Referencia al final del contenedor */}
          <div ref={mensajesEndRef} />
        </div>

        <form onSubmit={enviarMensaje} className="flex items-center mt-4 mb-4 mx-4">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalMessages;
