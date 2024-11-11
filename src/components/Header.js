import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import Modal from './Modal';
import ModalPatient from './ModalPatient';
import Notification from './Notifications';
import ModalAgenda from './ModalAgenda';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const socket = io('http://192.168.100.4:5000', {
  transports: ['websocket']
});

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [isPerfilModalOpen, setPerfilModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNot, setIsOpenNot] = useState(false);
  const [isOpenAge, setIsOpenAge] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [caretDow, setCaretDow] = useState(true);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    // Escuchar el evento de nueva notificación desde el servidor
    socket.on('newNotification', (data) => {
      console.log(data.message); // Ver mensaje de notificación en consola
      setHasNewNotification(true); // Muestra el icono de notificación nueva
    });

    // Limpia el evento al desmontar el componente
    return () => {
      socket.off('newNotification');
    };
  }, []);

  const handleOpenModal = () => {
    setIsOpenNot(true);
    setHasNewNotification(false); // Marca las notificaciones como vistas al abrir el modal
  };

  // Define rutas donde debería aparecer el NavBar
  const showNavBar = ['/agenda', '/pacientes', '/notificaciones', '/promocion', '/home', '/mostrarExpedientes', '/promotion'].includes(router.pathname);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setCaretDow(!caretDow);
  };
  const handleLogout = () => {
    // Elimina la cookie del token
    Cookies.remove('token');
    setShowDropdown(false); // Cierra el menú desplegable
    router.push('/'); // Redirige al usuario al login
  };

  return (
    <header className={`bg-gradient-to-r from-blue-700 to-blue-600 ${showNavBar ? 'justify-between py-1' : 'justify-center py-2'} items-center px-6`}>

      <div className={`max-w-screen-xl flex flex-wrap items-center ${showNavBar ? 'justify-between' : 'justify-center'} mx-auto p-1`}>

        <div className={`${showNavBar ? 'flex items-center' : ''}`}
        >
          <Image
            src={logo1}
            alt="Dental Health Logo"
            width={`${showNavBar ? 70 : 120}`}
            priority={true}
            className="rounded-full"
          />
          <div className={`${showNavBar ? ' flex flex-col text-white ms-2' : 'hidden'}`}>
            <h2 className="font-semibold">Bienvenido</h2>
            <h2 className="font-semibold relative"

            >
              Nombre dentista
              <FontAwesomeIcon icon={caretDow ? faCaretDown : faCaretUp} size="1x" className="cursor-pointer text-white ml-2" onClick={toggleDropdown} />

              {/* Menú desplegable */}
              {showDropdown && (
                <div className="absolute mt-2 right-0 bg-white border border-gray-200 rounded-md shadow-lg w-40">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setPerfilModalOpen(true),
                        setShowDropdown(false)
                    }}
                  >
                    Ver perfil
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </h2>


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
              {currentRoute !== '/home' && (
                <li>
                  <Link href="/home" className="hover:bg-blue-500 rounded-md p-1 text-white inline-block">
                    <FontAwesomeIcon
                      icon={faHome}
                      size="lg"
                      className={` text-white`}
                    />
                  </Link>
                </li>
              )}
              <li>
                <button onClick={() => setIsOpenAge(true)} className="hover:bg-blue-500 rounded-md p-1 text-white" aria-current="page">Agenda</button>
              </li>
              {currentRoute !== '/mostrarExpedientes' && (
                <li>
                  <button onClick={() => setIsOpen(true)} className="hover:bg-blue-500 rounded-md p-1 text-white">Pacientes</button>
                </li>
              )}
              {currentRoute !== '/promotion' && (
                <li>
                  <Link href="/promotion" className="hover:bg-blue-500 rounded-md p-1 text-white flex">Promociónes</Link>
                </li>
              )}
              <li>
                <button onClick={handleOpenModal} className="hover:bg-blue-500 rounded-md p-1 text-white sm:block md:hidden">Notificaciones</button>
                <div className="relative cursor-pointer hover:bg-blue-500 rounded-md p-1 sm:hidden md:block" onClick={handleOpenModal}>
                  {/* Icono de campana con animación */}
                  <FontAwesomeIcon
                    icon={faBell}
                    size="lg"
                    className={` text-white ${hasNewNotification ? 'animate-bounce' : ''}`}
                  />

                  {/* Punto rojo de notificación */}
                  {hasNewNotification && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-1 border-white"></div>
                  )}
                </div>
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
      />


      <ModalPatient isOpen={isOpen} closeModal={() => setIsOpen(false)} />

      <Notification isOpen={isOpenNot} closeModal={() => setIsOpenNot(false)} />

      <ModalAgenda isOpen={isOpenAge} closeModal={() => setIsOpenAge(false)} />



    </header>

  );
};

export default Header;
