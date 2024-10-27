import { useEffect, useRef, useState } from "react";

const Diente = ({ num, actualizarEstadoDiente }) => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(""); // Almacena la condición seleccionada
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Verifica si el clic fue fuera del menú
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMostrarMenu(false);
            }
        };

        // Si el menú está abierto, agrega el event listener
        if (mostrarMenu) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        // Limpia el event listener cuando se desmonte el componente
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [mostrarMenu]);

    const handleClick = () => {
        setMostrarMenu(!mostrarMenu);
    };

    const handleSelectCondition = (condicion) => {
        console.log(condicion);
        setSelectedCondition(condicion); // Guarda la condición seleccionada
        setMostrarMenu(false);
        actualizarEstadoDiente(num, condicion); // Llamamos al callback para actualizar el formulario
    };

    // Aplica el color basado en la condición seleccionada
    const conditionColor = {
        sano: "border-green-500",
        cariado: "bg-red-500 border-red-500",
        obturado: "bg-blue-500 border-blue-500",
        od_perdido: "border-red-500",
        od_reemplazado: "border-blue-500",
        ext_indicada: "border-dashed border-red-500",
        protesis_fija: "border-dashed border-black",
        protesis_parcial_r: "border-dotted border-black",
    }[selectedCondition] || "bg-white border-gray-800"; // Color por defecto si no hay condición seleccionada


    return (
        <div className="relative inline-block">
            
            <h1 className="ml-2">{num}</h1>
            <div
                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${conditionColor}`}
                onClick={handleClick}
            />

            {/* Menú desplegable */}
            {mostrarMenu && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
                >
                    <div 
                        ref={menuRef}
                        className={`w-72 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto menu-scroll p-4`}
                    >
                        <h3 className="text-lg font-semibold mb-3 text-center text-gray-800">Seleccionar Condición</h3>
                        <ul className="space-y-2">
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("sano")}
                            >
                                Sano
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("cariado")}
                            >
                                <span>Cariado</span>
                                <span className="border-2 border-red-500 bg-red-500 rounded-full inline-block w-7 h-7 "></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("obturado")}
                            >
                                <span>Obturado</span>
                                <span className="border-2 border-blue-500 bg-blue-500 rounded-full inline-block w-7 h-7"></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("od_perdido")}
                            >
                                <span>O.D perdido</span>
                                <span className="border-2 border-red-500 rounded-full inline-block w-7 h-7"></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("od_reemplazado")}
                            >
                                <span>O.D reemplazado</span>
                                <span className="border-2 border-blue-500 rounded-full inline-block w-7 h-7"></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("ext_indicada")}
                            >
                                <span>Ext. indicada</span>
                                <span className="border-2 border-red-500 border-dashed rounded-full inline-block w-7 h-7"></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("protesis_fija")}
                            >
                                <span> Prótesis fija</span>
                                <span className="border-2 border-black border-dashed rounded-full inline-block w-7 h-7"></span>
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center transform transition-transform duration-200 scale-100 hover:scale-105"
                                onClick={() => handleSelectCondition("protesis_parcial_r")}
                            >
                                <span>Prótesis parcial y removible</span>
                                <span className="border-2 border-black border-dotted rounded-full inline-block w-7 h-7"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Diente;
