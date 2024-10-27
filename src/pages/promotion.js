import { useState } from "react";
import Layout from "@/components/Layout";
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import logo2 from '@@/img/logo4.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ModalPromotion from '@/components/ModalPromotion';

const promotion = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const publicaciones = [
        {
            titulo: 'Blanqueamiento Dental',
            descripcion: 'Aprovecha el 50% de descuento en nuestro tratamiento.',
            imagen: logo1,
        },
        {
            titulo: 'Limpieza Dental',
            descripcion: 'Limpieza profunda con un 2x1 en citas.',
            imagen: logo2,
        },
        // Puedes agregar más promociones aquí...
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-white flex justify-center py-8">
                <div className="w-3/4">
                    <h1 className="text-2xl font-medium text-center mt-8 mb-8">Promociones</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {publicaciones.map((publicacion, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                                {/* Imagen de la promoción */}
                                <div className="w-1/3">
                                    <Image
                                        src={publicacion.imagen}
                                        alt={publicacion.titulo}
                                        priority={true}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                {/* Detalles de la promoción */}
                                <div className="w-2/3 p-4">
                                    <h3 className="text-xl font-bold mb-2">{publicacion.titulo}</h3>
                                    <p className="text-gray-600">{publicacion.descripcion}</p>
                                </div>

                                {/* Botón para editar */}
                                <div className="w-1/12 bg-blue-500 flex justify-center items-center">
                                    <button className="text-white">
                                        <FontAwesomeIcon icon={faPen} size="1x" className="text-white"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón flotante para agregar nuevas promociones */}
                    <button onClick={() => setIsModalOpen(true)} className="fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
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


                    <ModalPromotion  isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/>

                </div>
            </div>
        </Layout>
    )
}

export default promotion;