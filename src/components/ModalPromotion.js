import { useState } from "react";

const ModalPromotion = ({ isOpen, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [promotionalImage, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        console.log(promotionalImage)
    };

    const handleSave = async (e) => {
        e.preventDefault();

        console.log({ title, description, promotionalImage });
        
        const formDataToSend = new FormData();

        formDataToSend.append('title', title);
        formDataToSend.append('description', description);

        if (promotionalImage) {
            formDataToSend.append('promotionalImage', promotionalImage);
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/promotion/create/${15}`, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {

                setTitle('');
                setDescription('');
                setImage(null);

                const result = await response.json();
                console.log("Datos guardados exitosamente:", result);
                console.log(JSON.stringify({ formDataToSend }));
                closeModal(); // Cierra el modal después de guardar
            } else {
                console.error("Error al guardar los datos");
                console.log(JSON.stringify({ formDataToSend }));
                const errorMessage = await response.text();
                alert(`Error al guardar el examen dental: ${response.status} - ${response.statusText}\nMensaje: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 border-b p-3 bg-blue-500 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-white">Crear promoción</h3>
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
                            Guardar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ModalPromotion;
