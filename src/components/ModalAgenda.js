import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalAgenda = ({ isOpen, closeModal }) => {

    const [citas, setCitas] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchAppointmentsData();

        }

    }, [!isOpen]);

    const fetchAppointmentsData = async () => {
        try {
            const cookies = Cookies.get();
            const token = cookies.token;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/appointment/getAppointments`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCitas(data);
                console.log(data)
            } else {
                console.error('Error al obtener las citas');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }

    };

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

    const today = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    let formattedDate = today.toLocaleDateString('es-ES', options);
    formattedDate = formattedDate.replace(/ de (\w+)/, (match, month) => ` de ${month.charAt(0).toUpperCase()}${month.slice(1)}`);

    if (!isOpen || !citas) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 border-b bg-blue-500 text-white p-3 rounded-t-lg">
                    <h3 className="text-xl font-semibold">Agenda</h3>
                    <button onClick={closeModal} className="text-white hover:text-gray-200">
                        ✕
                    </button>
                </div>

                {/* Sección de la fecha */}
                <div className="p-4 text-center bg-blue-500 text-white">
                    <p className="text-lg font-bold">{formattedDate}</p>
                    <p className="text-sm">Hoy</p>
                    {/* Aquí podrías colocar un calendario si es necesario */}
                </div>

                {/* Contenedor de citas con scroll */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-80 menu-scroll">
                    {citas.length > 0 ? (
                        citas.map((cita, index) => (
                            <div key={index} className="flex items-center mb-4 bg-white shadow-md rounded-lg">
                                <div className="flex-1 p-4">
                                    <p className="text-gray-800 font-bold">{cita.Patient.Login.name}</p>
                                    <p className="text-gray-600">Día: {cita.date}</p>
                                    <p className="text-gray-500 text-sm">{formatTimeTo12Hour(cita.time)}</p>
                                </div>
                                <div className="flex flex-col space-y-6 mr-3">
                                    <FontAwesomeIcon
                                        icon={faMessage}
                                        size="lg"
                                        className={`cursor-pointer text-gray-500 hover:text-blue-500`}
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="lg"
                                        className={`cursor-pointer text-gray-500 hover:text-red-500`}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay citas para este día.</p>
                    )}
                </div>

                {/* Botón para agregar más citas */}
                <div className="flex justify-center my-4">
                    <button className="bg-blue-500 text-white rounded-full p-2">
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
                                d="M19 11H5m7-7v14"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAgenda;
