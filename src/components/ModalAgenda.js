const ModalAgenda = ({ isOpen, closeModal }) => {
   
    if (!isOpen) return null;

    const citas = [
        { nombre: 'Lupita', descripcion: 'Ultima cita 02/03/2023', hora: '9:00 AM' },
        { nombre: 'Jafet', descripcion: 'Primer cita', hora: '10:00 AM' },
        { nombre: 'Victor', descripcion: 'Primer cita', hora: '11:00 AM' },
        // Agrega más citas para probar el scroll
    ];

    return (
        <div ref={menuRef} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center pb-3 border-b bg-blue-500 text-white p-3 rounded-t-lg">
                    <h3 className="text-xl font-semibold">Agenda</h3>
                    <button onClick={closeModal} className="text-white hover:text-gray-200">
                        ✕
                    </button>
                </div>

                {/* Sección de la fecha */}
                <div className="p-4 text-center bg-blue-500 text-white">
                    <p className="text-lg font-bold">May 5, 2024</p>
                    <p className="text-sm">Hoy</p>
                    {/* Aquí podrías colocar un calendario si es necesario */}
                </div>

                {/* Contenedor de citas con scroll */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-80 menu-scroll">
                    {citas.length > 0 ? (
                        citas.map((cita, index) => (
                            <div key={index} className="flex items-center mb-4 bg-white shadow-md rounded-lg">
                                <div className="flex-1 p-4">
                                    <p className="text-gray-800 font-bold">{cita.nombre}</p>
                                    <p className="text-gray-600">{cita.descripcion}</p>
                                    <p className="text-gray-500 text-sm">{cita.hora}</p>
                                </div>
                                <button className="mr-4 text-gray-500 hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay citas para este día.</p>
                    )}
                </div>

                {/* Botón para agregar más citas */}
                <div className="flex justify-center my-4">
                    <button className="bg-blue-500 text-white rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m7-7v14"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAgenda;
