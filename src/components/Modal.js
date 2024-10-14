
const Modal = ({ isOpen, closeModal, title, children }) => {
  if (!isOpen) return null; // Si no está abierto, no se renderiza

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-11/12 md:w-1/3 rounded-lg overflow-hidden shadow-lg">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 relative">
          <h2 className="text-white text-lg">{title}</h2>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Content (contenido dinámico) */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
