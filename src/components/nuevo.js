import React from 'react'

export const nuevo = () => {
  return (
    <div>
        

    <header className={`relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600 flex ${showNavBar ? 'justify-between py-1' : 'justify-center py-2'} items-center px-6`}>

      {/* Logo y Bienvenida */}
      <div className={`${showNavBar ? 'flex items-center' : ''}`}>
        <Image
          src={logo1}
          alt="Dental Health Logo"
          width={`${showNavBar ? 70 : 160}`}
          priority={true}
          className="rounded-full"
        />
        <div className={`${showNavBar ? 'flex flex-col text-white ms-2' : 'hidden'}`}>
          <h2>Bienvenido</h2>
          <h2>Dentista [Nombre dentista]</h2>
        </div>
      </div>

      {/* Botón de menú para pantallas pequeñas */}
      {showNavBar && (
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-white" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-white" />
            )}
          </button>
        </div>
      )}

      {/* NavBar en pantallas grandes */}
      {showNavBar && (
        <nav className="hidden md:flex space-x-6 text-white">
          <button onClick={() => setPerfilModalOpen(true)} className="hover:bg-blue-500 rounded-md p-1">Perfil</button>
          <a href="/agenda" className="hover:bg-blue-500 rounded-md p-1">Agenda</a>
          <a href="/pacientes" className="hover:bg-blue-500 rounded-md p-1">Pacientes</a>
          <a href="/notificaciones" className="hover:bg-blue-500 rounded-md p-1">Notificaciones</a>
          <a href="/promocion" className="hover:bg-blue-500 rounded-md p-1">Promoción</a>
        </nav>
      )}

      {/* NavBar desplegable en pantallas pequeñas */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 space-y-4 flex flex-col items-center -z-0 max-h-screen overflow-y-auto">
          <a href="/perfil" className="hover:bg-blue-500 rounded-md p-1">Perfil</a>
          <a href="/agenda" className="hover:bg-blue-500 rounded-md p-1">Agenda</a>
          <a href="/pacientes" className="hover:bg-blue-500 rounded-md p-1">Pacientes</a>
          <a href="/notificaciones" className="hover:bg-blue-500 rounded-md p-1">Notificaciones</a>
          <a href="/promocion" className="hover:bg-blue-500 rounded-md p-1">Promoción</a>
        </nav>

      )}

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
    </div>
  )
}
