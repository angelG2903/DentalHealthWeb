import { useState, useEffect } from 'react';
import Link from 'next/link';

const ModalPacientes = ({ isOpen, closeModal, props }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para hacer la solicitud GET
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/auth/getPatient`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setData(data); // Guarda los datos en el estado
            } catch (error) {
                setError(error.message); // Guarda el error en el estado
            } finally {
                setLoading(false); // Oculta el indicador de carga
            }
        };

        fetchData(); // Llama a la función fetchData cuando se monta el componente
    }, []);

    // Lista de pacientes
    /* const pacientes = [
        { id: 1, name: 'Álvarez .....', lastAppointment: '26/05/2024' },
        { id: 2, name: 'Arguello .....', lastAppointment: '26/05/2024' },
        { id: 3, name: 'Bolaños .....', lastAppointment: '26/05/2024' },
        { id: 4, name: 'Castillo .....', lastAppointment: '26/05/2024' },
        { id: 5, name: 'Castillo .....', lastAppointment: '26/05/2024' },
    ]; */

    // Filtra los pacientes en función del término de búsqueda
    /* const filteredPacientes = pacientes.filter((paciente) =>
        paciente.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); */
    const filteredPacientes = data
        ? data.filter((paciente) =>
        paciente.Login.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

    if (!isOpen) return null;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/2">
                <div className="flex justify-between items-center pb-3 bg-blue-500 text-white p-3 rounded-t-lg">
                    <h3 className="text-xl font-semibold">Pacientes</h3>
                    <button onClick={closeModal} className="text-white">
                        ✕
                    </button>
                </div>

                {/* Input de búsqueda */}
                <div className="pt-4 px-4 bg-gray-50">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4
                        focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* Lista filtrada de pacientes */}
                {loading ? (
                    <div className="flex justify-center items-center h-56">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md max-h-96 menu-scroll">
                        {filteredPacientes.length > 0 ? (
                            filteredPacientes.map((paciente) => (
                                <div key={paciente.id} className="p-4 mb-4 rounded-md items-center shadow-lg">
                                    <div className="mb-4">
                                        <p>{paciente.Login.name} {paciente.Login.lastName}</p>
                                        <p>Número de telefono: {paciente.Login.phoneNumber}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <Link href={{
                                            pathname: "/mostrarExpedientes",
                                            query: { id: paciente.id }
                                            }} 
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Ver expediente
                                        </Link>
                                        <Link href={{
                                                pathname: "/mostrarExamenDental",
                                                query: { id: paciente.id }
                                            }} 
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Ver examen dental
                                        </Link>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No se encontraron pacientes.</p>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModalPacientes;
