import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { useState } from "react";
import ConfirmationModal from '@/components/ConfirmationModal';
import MessageNotification from '@/components/MessageNotification';

const MostrarListEx = ({ content, data, setData, deleteType, message }) => {

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal de confirmación
    const [expedientToDelete, setExpedientToDelete] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const [isLoading, setIsLoading] = useState(false);

    const confirmDelete = (id) => {
        setExpedientToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/medicalForm/delete/${expedientToDelete}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setData(data.filter((expediente) => expediente.id !== expedientToDelete));
                setNotification({ message: "Expediente eliminado exitosamente", type: "success" });
                setIsConfirmModalOpen(false);
            } else {
                setNotification({ message: "Hubo un error al eliminar el expediente", type: "error" });
            }
        } catch (error) {
            console.error("Error al eliminar el expediente:", error);
            setNotification({ message: "Ocurrió un error al intentar eliminar el expediente.", type: "error" });
        } finally {
            setIsLoading(false);
            setExpedientToDelete(null);
        }
    };

    const handleDeleteDental = async () => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/dentalExam/delete/${expedientToDelete}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setData(data.filter((expediente) => expediente.id !== expedientToDelete));
                setNotification({ message: "Examen dental eliminado exitosamente", type: "success" });
                setIsConfirmModalOpen(false);
            } else {
                setNotification({ message: "Hubo un error al eliminar el examen dental", type: "error" });
            }
        } catch (error) {
            console.error("Error al eliminar el examen dental:", error);
            setNotification({ message: "Ocurrió un error al intentar eliminar el examen dental.", type: "error" });
        } finally {
            setIsLoading(false);
            setExpedientToDelete(null);
        }
    };

    return (
        <>
            {/* Spinner de carga */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-12 gap-6 justify-items-center">
                {data && data.length > 0 ? (
                    data.map((expediente, index) => (
                        <div key={index} className="col-span-3 bg-white shadow-lg rounded-lg overflow-hidden min-w-60 max-w-80 w-full">

                            <div className="grid grid-cols-3">
                                <div className="col-span-3 p-4">
                                    <h3 className="text-base font-blod mb-4">{content}: {expediente.id}</h3>

                                    <p className="text-gray-600">Fecha: {format(new Date(expediente.createdAt), 'dd/MM/yyyy')}</p>
                                    <p className="text-gray-600">Hora: {format(new Date(expediente.createdAt), 'hh:mm a')}</p>
                                </div>

                                <div className="col-span-3 grid grid-cols-3 bg-blue-500">
                                    <div className="relative group">
                                        <Link href={{
                                            pathname: `${deleteType ? "/verExpediente" : "/verExamenDental"}`,
                                            query: {
                                                id: expediente.id,
                                                patId: expediente.Patient.id
                                            }
                                        }}
                                            className="inline-block text-center text-white w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2"
                                        >
                                            <FontAwesomeIcon icon={faEye} size="1x" className="text-white" />
                                        </Link>
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Ver
                                        </div>
                                    </div>


                                    <div className="relative group">
                                        <Link href={{
                                            pathname: `${deleteType ? "/expedienteEdit" : "/examenDentalEdit"}`,
                                            query: {
                                                id: expediente.id,
                                                patId: expediente.Patient.id
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
                    ))
                ) : (
                    <div className="col-span-9 grid grid-cols-9 text-center mt-5 ">
                        <div className="col-span-9 mx-auto bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg p-5 shadow-md">
                            <div className="flex justify-center items-center mb-3">
                                <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="text-yellow-500" />
                            </div>
                            <p className="text-lg font-semibold">
                                {message}
                            </p>
                        </div>
                    </div>
                )}

            </div>



            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onConfirm={deleteType ? handleDelete : handleDeleteDental}
                title={deleteType ? "¿Eliminar expediente?" : "¿Eliminar examen dental?"}
                message={`¿Estás seguro de que deseas eliminar este ${deleteType ? "expediente?" : "examen dental?"} Esta acción no se puede deshacer.`}
                onCancel={() => setIsConfirmModalOpen(false)}
            />

            {notification.message && (
                <MessageNotification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: "", type: "" })}
                />
            )}

        </>


    )
}


export default MostrarListEx;