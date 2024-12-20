import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const api = process.env.NEXT_PUBLIC_API_URL;
const socket = io(api, {
    transports: ['websocket']
});

const ModalContact = ({ isOpen, closeModal }) => {

    const [perfil, setPerfil] = useState(null);

    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const mensajesEndRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (selectedPatient) {
            fetchMessages(selectedPatient.loginId);
            
            socket.on('receive_private_message', (data) => {
                setMensajes((prevMensajes) => [
                    ...prevMensajes,
                    { 
                        id: prevMensajes.length + 1, 
                        message: data.message, 
                        senderId: data.fromUserId,
                        receiverId: data.toUserId,
                    },
                ]);
            });

            return () => {
                socket.off('receive_private_message');
            };
        }
    }, [selectedPatient]);

    const fetchMessages = async (patientId) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/message/messages/${perfil.loginId}/${patientId}`);
            const data = await response.json();
            setMensajes(data);
            console.log(data)
        } catch (error) {
            console.error('Error al cargar mensajes:', error);
            console.log(mensajes)
        }
    };

    const fetchPerfilData = async () => {
        try {
            const cookies = Cookies.get();
            const token = cookies.token;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/getDoctor`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPerfil(data);
                console.log(data);

                socket.emit('register', data.loginId);

                // Escuchar mensajes privados
                

            } else {
                console.error('Error al obtener el perfil');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }

    };


    // Función para manejar el envío de mensajes
    const enviarMensaje = (e) => {
        e.preventDefault();
        if (mensaje.trim() === "") return;
        if (mensaje.trim() && selectedPatient) {
            const nuevoMensaje = { id: mensajes.length + 1, message: mensaje, senderId: perfil.loginId };
            setMensajes([...mensajes, nuevoMensaje]);

            // Enviar mensaje al backend
            socket.emit("send_private_message", {
                fromUserId: perfil.loginId, // Cambia esto por el ID del doctor
                toUserId: selectedPatient.loginId, // ID del paciente seleccionado
                message: mensaje,
            });

            setMensaje(""); // Limpiar el campo de texto
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
    }, [isOpen]);


    useEffect(() => {
        if (isOpen) {
            fetchData();
            fetchPerfilData();
        }
    }, [!isOpen]);


    const fetchData = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/getPatient`);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredPacientes = data
        ? data.filter((paciente) =>
            paciente.Login.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-10/12 sm:w-2/3 md:w-1/2 xl:w-1/4">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 bg-blue-500 text-white rounded-t-lg p-3">
                    <h3 className="text-xl font-semibold">
                        {selectedPatient ? `Chat con ${selectedPatient.Login.name}` : "Contactos"}
                    </h3>
                    <button onClick={closeModal} className="text-white">
                        ✕
                    </button>
                </div>

                {/* Mostrar Lista de Contactos o Chat */}
                {!selectedPatient ? (
                    <>
                        {/* Input de búsqueda */}
                        <div className="pt-4 px-4 bg-gray-50">
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4
                            focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {/* Lista filtrada de pacientes */}
                        {loading ? (
                            <div className="flex justify-center items-center h-56">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                            </div>
                        ) : (
                            <ul className="overflow-y-auto p-4 bg-gray-50 rounded-md max-h-96 menu-scroll">
                                {filteredPacientes.length > 0 ? (
                                    filteredPacientes.map((patient) => (
                                        <li
                                            key={patient.id}
                                            className="flex justify-between items-center p-4 mb-3 rounded-md shadow-lg border-gray-200 hover:bg-gray-100"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {patient.Login.name} {patient.Login.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Contacto: {patient.Login.phoneNumber}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Correo: {patient.Login.email}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedPatient(patient)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMessage}
                                                    size="lg"
                                                    className={`cursor-pointer text-gray-300 hover:text-gray-400`}
                                                />
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No se encontraron resultados</p>
                                )}
                            </ul>
                        )}
                    </>
                ) : (
                    <>
                        {/* Chat del paciente */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-96 menu-scroll">
                            {mensajes.length > 0 ? (
                                mensajes.map((msg, index) => (
                                    <div
                                        key={`${msg.id}-${index}`}
                                        className={`p-2 my-2 rounded-md ${msg.senderId === perfil.loginId
                                            ? "bg-blue-100 text-right"
                                            : "bg-gray-100 text-left"
                                            }`}
                                    >
                                        <p>{msg.message}</p>
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

                        {/* Botón para volver a la lista de contactos */}
                        <div className="text-center my-4">
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="text-blue-500 hover:text-blue-700 underline"
                            >
                                Volver a la lista de contactos
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

export default ModalContact;