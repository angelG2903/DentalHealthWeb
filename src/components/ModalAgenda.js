import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toZonedTime } from 'date-fns-tz';  // Importar la función
import { startOfDay } from 'date-fns';
import ConfirmationModal from '@/components/ConfirmationModal';
import MessageNotification from '@/components/MessageNotification';
import io from 'socket.io-client';
const api = process.env.NEXT_PUBLIC_API_URL;
const socket = io(api, {
    transports: ['websocket']
});

const ModalAgenda = ({ isOpen, closeModal }) => {

    const [citas, setCitas] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [cancelAppont, setCancelAppont] = useState(null);
    const [cancelAppontId, setCancelAppontId] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });

    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(() => {
        const timeZone = 'America/Mexico_City';
        const mexicoTime = toZonedTime(new Date(), timeZone);  // Obtener la fecha actual en la zona horaria de México
        return startOfDay(mexicoTime); // Ajustamos la hora a las 00:00:00
    });

    useEffect(() => {
        if (isOpen) {
            fetchAppointmentsData(selectedDate);

        }

    }, [!isOpen, selectedDate]);

    const fetchAppointmentsData = async (date) => {
        try {
            const cookies = Cookies.get();
            const token = cookies.token;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/appointment/getAppointments?date=${date.toISOString().split('T')[0]}`, {
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

    const cancelAppointment = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/appointment/cancel/${cancelAppont}`, {
                method: 'PUT',
            });

            if (response.ok) {
                setNotification({ message: "La Cita ha sido cancelada", type: "error" });
                socket.emit('cancel', { toUserId: cancelAppontId });
                fetchAppointmentsData(selectedDate);
            } else {
                console.log(cancelAppont, cancelAppontId);
                setNotification({ message: "Error al cancelar la cita", type: "error" });
            }
        } catch (error) {
            console.error('Error en la solicitud de cancelación: ', error);
            setNotification({ message: "Hubo un error en la solicitud de cancelación", type: "error" });
        } finally {
            setIsConfirmModalOpen(false);
            setCancelAppont(null);
        }
    };

    const cancel = (id, patientId) => {
        setCancelAppont(id);
        setCancelAppontId(patientId);
        setIsConfirmModalOpen(true);
    };

    if (!isOpen || !citas) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-10/12 md:w-2/4 lg:w-2/5 2xl:w-1/4">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 border-b bg-blue-500 text-white p-3 rounded-t-lg">
                    <h3 className="text-xl font-semibold">Agenda</h3>
                    <button onClick={closeModal} className="text-white hover:text-gray-200">
                        ✕
                    </button>
                </div>

                <div className="p-4 text-center bg-blue-500 text-white flex flex-col justify-items-center">
                    <p className="text-lg font-bold mt-3 mb-3">
                        {selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <Calendar
                        className="text-gray-700 w-full mx-auto bg-white shadow-md rounded-lg"
                        onChange={setSelectedDate}
                        value={selectedDate}
                    />
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
                                        icon={faXmark}
                                        size="lg"
                                        className={`cursor-pointer text-gray-500 hover:text-red-500`}
                                        onClick={() => cancel(cita.id, cita.Patient.Login.id)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No hay citas para este día.</p>
                    )}
                </div>

                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onConfirm={cancelAppointment}
                    title={"¿Cancelar cita?"}
                    message={"¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."}
                    onCancel={() => setIsConfirmModalOpen(false)}
                    buttonText={"Confirmar"}
                    styles={"hover:bg-red-600 bg-red-500"}
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

export default ModalAgenda;
