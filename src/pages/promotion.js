import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import logo2 from '@@/img/logo4.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalPromotion from '@/components/ModalPromotion';
import ConfirmationModal from '@/components/ConfirmationModal';
import MessageNotification from '@/components/MessageNotification';

import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token; // Obtén el token desde las cookies

  if (!token) {
    // Si no hay token, redirige al login
    return {
      redirect: {
        destination: '/',
        permanent: false, // Redirección temporal
      },
    };
  }

  try {
    // Decodifica el token para verificar su validez
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener una clave secreta configurada

    // Si el token es válido, permite el acceso
    return {
      props: {},
    };
  } catch (error) {
    // Si el token es inválido o ha caducado, redirige al login
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

const promotion = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal de confirmación
    const [promotionToDelete, setPromotionToDelete] = useState(null); // Promoción seleccionada para eliminar
    const [notification, setNotification] = useState({ message: "", type: "" }); // Estado para el mensaje de notificación
    const [promotionData, setPromotionData] = useState(null);

    const [data, setData] = useState(null); // Estado para almacenar los datos
    const [error, setError] = useState(null); // Estado para almacenar errores de fetch
    const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga

    useEffect(() => {
        // Función para hacer la solicitud GET
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/promotion/get`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setData(data); // Guarda los datos en el estado
            } catch (error) {
                setError(error.message); // Guarda el error en el estado
            } finally {
                setLoading(false); // Oculta el indicador de carga
            }
        };

        fetchData(); // Llama a la función fetchData cuando se monta el componente
    }, [isModalOpen]);

    useEffect(() => {
        // Reset promotionData when modal is closed
        if (!isModalOpen) {
            setPromotionData(null);
        }
    }, [isModalOpen]); // This will run every time isModalOpen changes


    const openEditModal = (promotion) => {
        setPromotionData(promotion);
        setIsModalOpen(true);
    };

    const handleSavePromotion = async (formDataToSend) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = promotionData
            ? `${apiUrl}/api/promotion/update/${promotionData.id}`
            : `${apiUrl}/api/promotion/create/${4}`;

        const method = promotionData ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                body: formDataToSend,
            });

            if (response.ok) {
                setNotification({ message: "Promoción guardada exitosamente", type: "success" });
            } else {
                setNotification({ message: "Hubo un error al guardar la promoción", type: "error" });
            }
        } catch (error) {
            console.error("Error al guardar la promoción:", error);
            setNotification({ message: "Ocurrió un error al intentar guardar la promoción.", type: "error" });
        } finally {
            setIsModalOpen(false);
            setPromotionData(null);
        }
    };


    const confirmDelete = (id) => {
        setPromotionToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/promotion/delete/${promotionToDelete}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setData(data.filter((publicacion) => publicacion.id !== promotionToDelete));
                setNotification({ message: "Promoción eliminada exitosamente", type: "success" });
            } else {
                setNotification({ message: "Hubo un error al eliminar la promoción", type: "error" });
            }
        } catch (error) {
            console.error("Error al eliminar la promoción:", error);
            setNotification({ message: "Ocurrió un error al intentar eliminar la promoción.", type: "error" });
        } finally {
            setIsConfirmModalOpen(false);
            setPromotionToDelete(null);
        }
    };

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return (
            <div className="flex justify-center items-center h-56">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
    // Mostrar un mensaje de error si ocurrió un problema
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex justify-center py-8">
                <div className="w-3/4">
                    <h1 className="text-2xl font-medium text-center mt-8 mb-8">Promociones</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-6 justify-items-center">
                        {data.map((publicacion, index) => (
                            <div key={index} className="col-span-3 min-w-60 max-w-lg w-full grid grid-cols-12 bg-white shadow-xl rounded-lg overflow-hidden min-h-52">
                                {/* Imagen de la promoción */}

                                <div className="col-span-12 md:col-span-5">
                                    {publicacion.promotionalImage !== null && (
                                        <Image
                                            src={`${publicacion.promotionalImageUrl}`}
                                            alt={"algo"}
                                            priority={true}
                                            className="object-cover w-full h-full"
                                            width={400}
                                            height={400}
                                            quality={100}
                                        />
                                    )}
                                    {publicacion.promotionalImage === null && (
                                        <Image
                                            src={logo1}
                                            alt={"Imagen por default"}
                                            priority={true}
                                            className="object-cover w-full h-full"
                                        />
                                    )}


                                </div>

                                {/* Detalles de la promoción */}
                                <div className="col-span-12 md:col-span-6 p-4">
                                    <h3 className="text-xl font-bold mb-2">{publicacion.title}</h3>
                                    <p className="text-gray-600">{publicacion.description}</p>
                                </div>


                                <div className="col-span-12 md:col-span-1 flex justify-around md:grid bg-blue-500">
                                    <div className="relative group">
                                        <button
                                            onClick={() => openEditModal(publicacion)}
                                            className="text-white h-full w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2"
                                        >
                                            <FontAwesomeIcon icon={faPen} size="1x" className="text-white" />
                                        </button>
                                        <div className="absolute bottom-8 -left-7 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Editar
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <button
                                            onClick={() => confirmDelete(publicacion.id)}
                                            className="text-white h-full w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="1x" className="text-white" />
                                        </button>
                                        <div className="absolute bottom-8 -left-7 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Eliminar
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>

                    {/* Botón flotante para agregar nuevas promociones */}
                    <button onClick={() => {
                        setIsModalOpen(true);
                        setPromotionData(null);
                        }} 
                        className="group fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
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
                            Crear promoción
                        </div>
                    </button>


                    <ModalPromotion
                        isOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        promotionData={promotionData}
                        onSave={handleSavePromotion}
                    />

                    <ConfirmationModal
                        isOpen={isConfirmModalOpen}
                        onConfirm={handleDelete}
                        title={"¿Eliminar promoción?"}
                        message={"¿Estás seguro de que deseas eliminar esta promoción? Esta acción no se puede deshacer."}
                        onCancel={() => setIsConfirmModalOpen(false)}
                    />

                    {/* Renderizar la notificación si hay un mensaje */}
                    {notification.message && (
                        <MessageNotification
                            message={notification.message}
                            type={notification.type}
                            onClose={() => setNotification({ message: "", type: "" })}
                        />
                    )}

                </div>
            </div>
        </Layout>
    )
}

export default promotion;