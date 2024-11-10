import { useEffect, useState } from "react";

const ModalPromotion = ({ isOpen, closeModal, promotionData, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [promotionalImage, setImage] = useState(null);

    useEffect(() => {
        if (promotionData) {
            setTitle(promotionData.title || '');
            setDescription(promotionData.description || '');
            setImage(null); // No cargamos la imagen anterior para edición
        }
    }, [promotionData]);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        if (promotionalImage) {
            formDataToSend.append('promotionalImage', promotionalImage);
        }

        onSave(formDataToSend);

        
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 border-b p-3 bg-blue-500 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-white">
                        {promotionData ? 'Editar promoción' : 'Crear promoción'}
                    </h3>
                    <button onClick={closeModal} className="text-white">✕</button>
                </div>

                {/* Cuerpo del modal */}
                <form onSubmit={handleSave}>
                    <div className="mt-4 space-y-4 mx-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300"
                                placeholder="Ingresa el título"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300"
                                placeholder="Ingresa la descripción"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Imagen</label>
                            <input
                                type="file"
                                onChange={(e) => handleImageUpload(e)}
                                className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100 cursor-pointer"
                                accept='image/*'
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-6 flex justify-end space-x-2 mr-4 mb-4">

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {promotionData ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ModalPromotion;
