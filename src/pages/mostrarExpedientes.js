import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import MostrarListEx from "@/components/MostrarListEx";
import { useEffect, useState } from "react";
import Link from "next/link";

export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies.token; // Obtén el token desde las cookies

    if (!token) {
        // Si no hay token, redirige al login
        return {
            redirect: {
                destination: '/',
                permanent: false, // Redirección temporal
            },
        };
    }

    // Si el token existe, permite el acceso
    return {
        props: {}, // Puedes agregar props adicionales aquí si los necesitas
    };
}

const mostrarExpedientes = () => {
    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [error, setError] = useState(null); // Estado para almacenar errores de fetch
    const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga

    useEffect(() => {
        if (!id) return; // Evita hacer la solicitud si no hay un id
        // Función para hacer la solicitud GET
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const responseUser = await fetch(`${apiUrl}/api/auth/getPatient/${id}`); // URL de la API
                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del Paciente');
                }
                const dataUserr = await responseUser.json(); // Convierte la respuesta en un objeto JSON
                setDataUser(dataUserr);

                const response = await fetch(`${apiUrl}/api/medicalForm/get/${id}`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error al obtener los expedientes');
                }
                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setData(data); // Guarda los datos en el estado


            } catch (error) {
                setError(error.message); // Guarda el error en el estado
            } finally {
                setLoading(false); // Oculta el indicador de carga
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-56">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex justify-center py-8">
                <div className="w-3/4">
                    {dataUser ? (
                        <div>
                            <h1 className="text-2xl font-medium text-center mt-8 mb-5">
                                Expedientes de {dataUser.Login.name} {dataUser.Login.lastName}
                            </h1>
                            <div className="text-center mb-8">
                                <p className="text-lg font-medium">Correo electrónico: {dataUser.Login.email}</p>
                                <p className="text-lg font-medium">Teléfono: {dataUser.Login.phoneNumber}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No hay datos disponibles {dataUser}</p> // Mensaje en caso de que el array esté vacío
                    )}
                    <MostrarListEx
                        data={data}
                        content={"Expediente"}
                        setData={setData}
                        deleteType={true}
                        message={"No hay expedientes disponibles."}
                    />
                    <Link href={{
                        pathname: "/expediente",
                        query: { id: id }
                    }}
                        className="group fixed bottom-16 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transform transition-transform duration-200 scale-100 hover:scale-105"
                    >
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
                        <div className="absolute bottom-full -right-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                            Crear expediente
                        </div>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}


export default mostrarExpedientes;