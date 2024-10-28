import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import perfil from '@@/img/logo3.png'; // Imagen de perfil de prueba
import Modal from './Modal';
import ModalPatient from './ModalPatient';
import Notification from './Notifications';
import ModalAgenda from './ModalAgenda';


const Header = () => {
  const router = useRouter();
  const [isPerfilModalOpen, setPerfilModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNot, setIsOpenNot] = useState(false);
  const [isOpenAge, setIsOpenAge] = useState(false);

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
            <h2 className="font-semibold">Nombre dentista</h2>
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
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
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
                <button onClick={() => setIsOpenAge(true)} className="hover:bg-blue-500 rounded-md p-1 text-white" aria-current="page">Agenda</button>
              </li>
              <li>
                <button onClick={() => setIsOpen(true)} className="hover:bg-blue-500 rounded-md p-1 text-white">Pacientes</button>
              </li>
              <li>
                <Link href="/promotion" className="hover:bg-blue-500 rounded-md p-1 text-white flex">Promociónes</Link>
              </li>
              <li>
                <button onClick={() => setIsOpenNot(true)} className="hover:bg-blue-500 rounded-md p-1 text-white">Notificaciones</button>
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
        perfil={perfil}
      />
        

      <ModalPatient isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      
      <Notification isOpen={isOpenNot} closeModal={() => setIsOpenNot(false)}/>
      
      <ModalAgenda isOpen={isOpenAge} closeModal={() => setIsOpenAge(false)}/>
      
      

    </header>

  );
};

export default Header;
