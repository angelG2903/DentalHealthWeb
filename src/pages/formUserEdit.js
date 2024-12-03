import Layout from "@/components/Layout";
import RecordUser from "@/components/RecordUser";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

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

const formUserEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/auth/getDoctorById/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const transformedData = {
                        ...data,
                        ...data.Login
                    };
                    delete transformedData.Login;
                    // Transformar la fecha al formato `YYYY-MM-DD` si existe
                    if (transformedData.birthDate) {
                        transformedData.birthDate = new Date(transformedData.birthDate)
                            .toISOString()
                            .split('T')[0]; // Extraer solo `YYYY-MM-DD`
                    }
                    setData(transformedData);
                    setLoading(false);
                } else {
                    console.error('Error al obtener la información');
                }

            } catch (error) {
                setError(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateRecord = async (formData) => {
        try {
            // Enviar el formulario al servidor
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/updateDoctor/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Formulario actualizado con éxito');
                console.log(formData);

                // Redirigir al home
                router.push(`/home`);

            } else {
                console.error('Error al enviar el formulario');

                setError('Error al enviar el formulario. Inténtalo de nuevo.',);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(`Ocurrió un error al enviar la solicitud. ${error}`);
        }
    };


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
            <RecordUser initialData={data} onSubmit={handleUpdateRecord} title={"Editar Perfil"} editUser={true} />
        </Layout>
    )
}

export default formUserEdit;
