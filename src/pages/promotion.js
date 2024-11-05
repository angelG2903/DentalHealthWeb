import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import logo2 from '@@/img/logo4.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalPromotion from '@/components/ModalPromotion';

const promotion = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
    }, []); // El arreglo vacío [] hace que se ejecute solo una vez al montar el componente

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) return <p>Cargando...</p>;
    console.log(data)

    // Mostrar un mensaje de error si ocurrió un problema
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="min-h-screen bg-white flex justify-center py-8">
                <div className="w-3/4">
                    <h1 className="text-2xl font-medium text-center mt-8 mb-8">Promociones</h1>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 ">
                        {data.map((publicacion, index) => (
                            <div key={index} className="col-span-3 grid grid-cols-12 bg-white shadow-lg rounded-lg overflow-hidden h-52">
                                {/* Imagen de la promoción */}

                                <div className="col-span-5">
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
                                            className="object-cover w-full"
                                        />
                                    )}
                                    

                                </div>

                                {/* Detalles de la promoción */}
                                <div className="col-span-6 p-4">
                                    <h3 className="text-xl font-bold mb-2">{publicacion.title}</h3>
                                    <p className="text-gray-600">{publicacion.description}</p>
                                </div>

                                {/* Botón para editar */}
                                <div className="col-span-1 bg-blue-500 grid">
                                    <div className="relative group">
                                        <button className="text-white h-full w-full transform transition-transform duration-200 scale-100 hover:scale-110 p-2">
                                            <FontAwesomeIcon icon={faPen} size="1x" className="text-white" />
                                        </button>
                                        <div className="absolute bottom-8 -left-7 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                            Editar
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <button className="text-white h-full w-full bg-red-500 transform transition-transform duration-200 scale-100 hover:scale-110 p-2">
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
                    <button onClick={() => setIsModalOpen(true)} className="group fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
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


                    <ModalPromotion isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />

                </div>
            </div>
        </Layout>
    )
}

export default promotion;