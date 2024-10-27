import Image from 'next/image';

const Modal = ({ isOpen, closeModal, title, perfil }) => {
  if (!isOpen) return null; // Si no está abierto, no se renderiza

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-11/12 md:w-1/3 rounded-lg overflow-hidden shadow-lg">
        {/* Modal Header */}
        <div className="bg-blue-500 py-3 px-4 relative">
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

          <div className="flex justify-center mb-4">
            <Image
              src={perfil}
              alt="Perfil"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <h3 className="text-center text-xl font-bold">Dr. [Nombre Dentista]</h3>
          <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg mb-2">Información</h4>
            <p><strong>Cédula Profesional:</strong> XXXXXXXX</p>
            <p><strong>Teléfono:</strong> 123-456-7890</p>
            <p><strong>Correo:</strong> dentista@ejemplo.com</p>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Editar Perfil
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
