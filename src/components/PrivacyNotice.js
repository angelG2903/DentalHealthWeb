import React, { useState } from 'react';
import Modal from 'react-modal';

const PrivacyNotice = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <div className="flex items-center justify-center mt-4">
            
            <input
                required
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
            />
            <button
                type='button'
                onClick={openModal}
                className="hover:text-blue-500 underline"
            >
                Aviso de privacidad
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Aviso de privacidad"
                className="bg-white p-6 rounded shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold">Aviso de privacidad</h2>
                <p className="mt-4">Contenido del aviso de privacidad aquí...</p>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
}

export default PrivacyNotice;