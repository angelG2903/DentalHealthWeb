// pages/odontograma.js
import { useState } from "react";
import Layout from '@/components/Layout';
import { useRouter } from "next/router";
import RecordExamDental from '@/components/RecordExamDental';

const examenDental = () => {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState("");

    const handleSubmit = async (dientes) => {

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/dentalExam/create/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dientes }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Datos guardados exitosamente:", result);
                console.log(dientes)
                router.push(`/mostrarExamenDental/?id=${id}`);
            } else {
                console.error("Error al guardar los datos");
                setError('Error al enviar el formulario. Inténtalo de nuevo.',);
            }
        } catch (error) {
            console.error("Error de red:", error);
            setError(`Ocurrió un error al enviar la solicitud. ${error}`);
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
            <RecordExamDental  onSubmit={handleSubmit} title={"Crear examen Dental"} viewData={false}/>
        </Layout>

    );
};

export default examenDental;
