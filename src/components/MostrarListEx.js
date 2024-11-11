import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { useState } from "react";
import ConfirmationModal from '@/components/ConfirmationModal';
import MessageNotification from '@/components/MessageNotification';

const MostrarListEx = ({ title, content, data, setData, linkH, message }) => {

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal de confirmación
    const [promotionToDelete, setPromotionToDelete] = useState(null); 
    const [notification, setNotification] = useState({ message: "", type: "" });

    const patientName = data[0].Patient.Login.name;
    const patientId = data[0].Patient.id;


    const confirmDelete = (id) => {
        setPromotionToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/medicalForm/delete/${promotionToDelete}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setData(data.filter((expediente) => expediente.id !== promotionToDelete));
                setNotification({ message: "Expediente eliminado exitosamente", type: "success" });
            } else {
                setNotification({ message: "Hubo un error al eliminar el expediente", type: "error" });
            }
        } catch (error) {
            console.error("Error al eliminar el expediente:", error);
            setNotification({ message: "Ocurrió un error al intentar eliminar el expediente.", type: "error" });
        } finally {
            setIsConfirmModalOpen(false);
            setPromotionToDelete(null);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center py-8">
            <div className="w-3/4">
                <h1 className="text-2xl font-medium text-center mt-8 mb-8">{title} de {patientName}</h1>

                <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
                    {data.map((expediente, index) => (
                        <div key={index} className="col-span-3 bg-white shadow-lg rounded-lg overflow-hidden">

                            <div className="grid grid-cols-3">
                                <div className="col-span-3 p-4">
                                    <h3 className="text-base font-blod mb-4">{content}: {expediente.id}</h3>

                                    <p className="text-gray-600">Fecha: {format(new Date(expediente.createdAt), 'dd/MM/yyyy')}</p>
                                    <p className="text-gray-600">Hora: {format(new Date(expediente.createdAt), 'hh:mm a')}</p>
                                </div>

                                <div className="col-span-3 grid grid-cols-3 bg-blue-500">
                                    <div className="relative group">
                                        <button className="text-white w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2">
                                            <FontAwesomeIcon icon={faEye} size="1x" className="text-white" />
                                        </button>
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Ver
                                        </div>
                                    </div>


                                    <div className="relative group">
                                        <Link href={{pathname: "/expedienteEdit",
                                            query: { 
                                                id: expediente.id, 
                                                patId: patientId
                                            }
                                        }} 
                                            className="inline-block text-center text-white w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2"
                                        >
                                            <FontAwesomeIcon icon={faPen} size="1x" className="text-white" />
                                        </Link>
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Editar
                                        </div>
                                    </div>


                                    <div className="relative group">
                                        <button
                                            onClick={() => confirmDelete(expediente.id)}
                                            className="text-white w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="1x" className="text-white" />
                                        </button>
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Eliminar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón flotante para agregar nuevas promociones */}
                <Link href={{
                    pathname: linkH,
                    query: { id: patientId }
                }}
                    className="group fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transform transition-transform duration-200 scale-100 hover:scale-105"
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
                            d="M19 11H5m7-7v14"
                        />
                    </svg>
                    <div className="absolute bottom-full -right-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                        {message}
                    </div>
                </Link>

                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onConfirm={handleDelete}
                    title={"¿Eliminar expediente?"}
                    message={"¿Estás seguro de que deseas eliminar este expediente? Esta acción no se puede deshacer."}
                    onCancel={() => setIsConfirmModalOpen(false)}
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

    )
}


export default MostrarListEx;