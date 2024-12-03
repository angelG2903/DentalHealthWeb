import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import ViewRecordForm from '@/components/ViewRecordForm';
import { useEffect, useState } from 'react';

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

const verExpediente = () => {
    const router = useRouter();
    const { id, patId } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/medicalForm/getExam/${id}`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                const transformedData = {
                    ...data,
                    ...data.CardiovascularSystems[0], // Combina el primer elemento de CardiovascularSystems
                    ...data.EtsDiseases[0],
                    ...data.OralCavities[0],
                    ...data.PathologicalHistories[0]
                };
                // Elimina las propiedades que ya no necesitas
                delete transformedData.CardiovascularSystems;
                delete transformedData.EtsDiseases;
                delete transformedData.OralCavities;
                delete transformedData.PathologicalHistories;

                setData(transformedData);

                const responseUser = await fetch(`${apiUrl}/api/auth/getPatient/${patId}`); // URL de la API
                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del Paciente');
                }
                const dataUser = await responseUser.json(); // Convierte la respuesta en un objeto JSON
                setDataUser(dataUser);

            } catch (error) {
                setError(error.message); // Guarda el error en el estado
            } finally {
                setLoading(false); // Oculta el indicador de carga
            }
        };

        fetchData(); // Llama a la función fetchData cuando se monta el componente
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
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                    <strong className="font-bold">¡Error!</strong>
                    <span className="block sm:inline"> {error} </span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={setError("")}>
                            <title>Cerrar</title>
                            <path d="M14.348 5.652a.5.5 0 1 1 .707.707L10.707 10l4.348 4.348a.5.5 0 0 1-.707.707L10 10.707l-4.348 4.348a.5.5 0 1 1-.707-.707L9.293 10 4.945 5.652a.5.5 0 1 1 .707-.707L10 9.293l4.348-4.348z" />
                        </svg>
                    </span>
                </div>
            )}
            <ViewRecordForm initialData={data} dataPatient={dataUser} title={"Expediente clinico"} buttonText={"Salir"} />
        </Layout>
    )
}

export default verExpediente;
