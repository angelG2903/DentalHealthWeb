import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'; // Íconos en v2
import logo1 from '@@/img/logo3.png';
import perfil from '@@/img/logo3.png'; // Imagen de perfil de prueba
import Modal from './Modal';

const Header = () => {
  const router = useRouter();
  const [isPerfilModalOpen, setPerfilModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable

  // Define rutas donde debería aparecer el NavBar
  const showNavBar = ['/agenda', '/pacientes', '/notificaciones', '/promocion', '/home'].includes(router.pathname);

  return (
    <header className={`bg-gradient-to-r from-blue-700 to-blue-600 ${showNavBar ? 'justify-between py-1' : 'justify-center py-2'} items-center px-6`}>

      <div className={`max-w-screen-xl flex flex-wrap items-center ${showNavBar ? 'justify-between' : 'justify-center'} mx-auto p-1`}>

        <div className={`${showNavBar ? 'flex items-center' : ''}`}>
          <Image
            src={logo1}
            alt="Dental Health Logo"
            width={`${showNavBar ? 70 : 120}`}
            priority={true}
            className="rounded-full"
          />
          <div className={`${showNavBar ? 'flex flex-col text-white ms-2' : 'hidden'}`}>
            <h2 className="font-semibold">Bienvenido</h2>
            <h2 className="font-semibold">Dentista [Nombre dentista]</h2>
          </div>
        </div>

        {/* Botón de colapso para pantallas pequeñas */}
        {showNavBar && (
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-whit dark:focus:ring-blue-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen} // Controla si el menú está abierto o cerrado
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        )}

        {/* Menú de navegación */}
        {showNavBar && (

          <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-whit">

              {/* Opciones del menú */}
              <li>
                <button onClick={() => setPerfilModalOpen(true)} className="hover:bg-blue-500 rounded-md p-1 text-white" aria-current="page">Perfil</button>
              </li>
              <li>
                <button href="/agenda" className="hover:bg-blue-500 rounded-md p-1 text-white" aria-current="page">Agenda</button>
              </li>
              <li>
                <button href="/pacientes" className="hover:bg-blue-500 rounded-md p-1 text-white">Pacientes</button>
              </li>
              <li>
                <button href="/notificaciones" className="hover:bg-blue-500 rounded-md p-1 text-white">Notificaciones</button>
              </li>
              <li>
                <button href="/promocion" className="hover:bg-blue-500 rounded-md p-1 text-white">Promoción</button>
              </li>
            </ul>
          </div>
        )}


      </div>
      {/* Modal de Perfil */}
      <Modal
        isOpen={isPerfilModalOpen}
        closeModal={() => setPerfilModalOpen(false)}
        title="Perfil del Dentista"
      >
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
      </Modal>

    </header>

  );
};

export default Header;
