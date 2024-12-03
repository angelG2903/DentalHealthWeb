import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import MostrarListEx from "@/components/MostrarListEx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth, faPlus } from '@fortawesome/free-solid-svg-icons';

import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { req, res } = context;
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

  try {
    // Decodifica el token para verificar su validez
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener una clave secreta configurada

    // Si el token es válido, permite el acceso
    return {
      props: {},
    };
  } catch (error) {
    // Si el token es inválido o ha caducado, redirige al login
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
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
                        message={"No hay expedientes."}
                    />
                    <Link href={{
                        pathname: "/mostrarExamenDental",
                        query: { id: id }
                    }}
                        className="group fixed bottom-32 right-8 bg-blue-500 text-white py-2 px-3 rounded-full shadow-lg hover:bg-blue-600 transform transition-transform duration-200 scale-100 hover:scale-105"
                    >
                        <FontAwesomeIcon
                            icon={faTooth}
                            size="2x"
                            className={``}
                        />
                        <div className="absolute bottom-full -right-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                            Ver examen dental
                        </div>
                    </Link>
                    <Link href={{
                        pathname: "/expediente",
                        query: { id: id }
                    }}
                        className="group fixed bottom-16 right-8 bg-blue-500 text-white py-2 px-3 rounded-full shadow-lg hover:bg-blue-600 transform transition-transform duration-200 scale-100 hover:scale-105"
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="2x"
                            className={``}
                        />
                        <div className="absolute bottom-full -right-1/2 transform -translate-x-3/4 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                            Crear expediente
                        </div>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}


export default mostrarExpedientes;