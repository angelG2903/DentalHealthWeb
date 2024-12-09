const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message, buttonText, buttonTextC, styles }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-80">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        {buttonTextC ? buttonTextC : 'Cancelar'}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`text-white px-4 py-2 rounded ${styles ? styles : "hover:bg-red-600 bg-red-500"}`}
                    >
                        {buttonText ? buttonText : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
