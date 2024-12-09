import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import RecordExamDental from '@/components/RecordExamDental';
import { useEffect, useState } from 'react';
import MessageNotification from '@/components/MessageNotification';

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

const examenDentalEdit = () => {

    const router = useRouter();
    const { id, patId } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingB, setLoadingB] = useState(true);
    const [error, setError] = useState("");
    const [dataUser, setDataUser] = useState(null);

    const [notification, setNotification] = useState({ message: "", type: "" });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/dentalExam/get/${id}`);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const dataForm = await response.json();
                setData(dataForm);

                const responseUser = await fetch(`${apiUrl}/api/auth/getPatient/${patId}`);
                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del Paciente');
                }
                const data = await responseUser.json();
                setDataUser(data);

            } catch (error) {
                setError(error.message);
            } finally {

                setLoading(false);
            }
        };

        fetchData(); // Llama a la función fetchData cuando se monta el componente

    }, [id]);

    const handleUpdateExam = async (dientes) => {
        setIsLoading(true);
        try {
            // Enviar el formulario al servidor
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/dentalExam/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dientes }),
            });

            if (response.ok) {
                setNotification({ message: "Formulario actualizado con éxito", type: "success" });
                setTimeout(() => {
                    setLoadingB(false);
                    setIsLoading(false);
                    router.push(`/mostrarExamenDental?id=${patId}`);
                }, 2000);

            } else {
                setError('Error al enviar el formulario. Inténtalo de nuevo.',);
                setNotification({ message: "Error al enviar el formulario. Inténtalo de nuevo.", type: "error" });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(`Ocurrió un error al enviar la solicitud. ${error}`);
            setNotification({ message: "Ocurrió un error al enviar la solicitud.", type: "error" });
        } finally {
            setLoadingB(false);
            setIsLoading(false);
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
            {/* Spinner de carga */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            )}
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
            <RecordExamDental initialData={data} dataPatient={dataUser} onSubmit={handleUpdateExam} title={"Editar examen Dental"} validLife={true} viewData={false} buttonText={"Guardar cambios"} loading={loadingB} />

            {notification.message && (
                <MessageNotification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: "", type: "" })}
                />
            )}
        </Layout>
    )
}

export default examenDentalEdit;
