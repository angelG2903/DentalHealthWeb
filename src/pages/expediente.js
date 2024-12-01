import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import RecordForm from '@/components/RecordForm';
import { useState, useEffect } from 'react';

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

const expediente = () => {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!id) return; 
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/auth/getPatient/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del Paciente');
                }
                const data = await response.json();
                setData(data);

            } catch (error) {
                setError(error.message);
            } 
        };

        fetchData();
    }, [id]);

    // Manejar el envío del formulario
    const handleSubmit = async (formData) => {

        try {
            // Enviar el formulario al servidor
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/medicalForm/register/${id}`, {
                method: 'POST',
                body: formData,  // Enviar el objeto FormData
            });

            if (response.ok) {
                console.log('Formulario enviado con éxito');


                router.push(`/mostrarExpedientes?id=${id}`);

            } else {
                console.error('Error al enviar el formulario');
                console.log(formData);
                setError('Error al enviar el formulario. Inténtalo de nuevo.',);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(`Ocurrió un error al enviar la solicitud. ${error}`);
        } finally {
            setLoading(false);
        }

    };
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
            <RecordForm onSubmit={handleSubmit} title={"Crear expediente clinico"} buttonText={"Guardar"} loading={loading} dataPatient={data}/>
        </Layout>
    )
}

export default expediente;