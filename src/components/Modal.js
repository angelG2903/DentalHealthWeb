import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import imagenP from '@@/img/logo3.png'; // Imagen de perfil de prueba


const Modal = ({ isOpen, closeModal, title }) => {
 
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if(isOpen){
      fetchPerfilData();
      
    }

  }, [!isOpen]);

  const fetchPerfilData = async () => {
    try {
      const cookies = Cookies.get();
      const token = cookies.token;
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/auth/getDoctor`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPerfil(data);
        console.log(data)
      } else {
        console.error('Error al obtener el perfil');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }

  };

  if (!isOpen || !perfil) return null;

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
              src={perfil.profilePictureUrl || imagenP}
              alt="Perfil"
              priority={true}
              className="rounded"
              width={200}
              height={200}
              quality={100}
            />
          </div>
          <h3 className="text-center text-xl font-bold">Dr. {perfil.Login?.name}</h3>
          <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-lg mb-2">Información</h4>
            <p><strong>Cédula Profesional:</strong> {perfil.professionalLicense}</p>
            <p><strong>Teléfono: </strong>{perfil.Login?.phoneNumber}</p>
            <p><strong>Correo: </strong>{perfil.Login?.email}</p>
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
