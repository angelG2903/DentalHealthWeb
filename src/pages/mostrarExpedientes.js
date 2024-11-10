import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import MostrarListEx from "@/components/MostrarListEx";
import { useEffect, useState } from "react";

const mostrarExpedientes = () => {
    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState(null); // Estado para almacenar los datos
    const [error, setError] = useState(null); // Estado para almacenar errores de fetch
    const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga

    useEffect(() => {
        if (!id) return; // Evita hacer la solicitud si no hay un id
        // Función para hacer la solicitud GET
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/medicalForm/get/${id}`); // URL de la API
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
    }, [id]);
    console.log(data);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-56">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    return (
        <Layout>
            <MostrarListEx 
                title={"Expedientes"} 
                data={data} 
                content={"Expediente"} 
                linkH={"/expediente"}
                message={"Crear expediente"}
            />
        </Layout>
    )
}


export default mostrarExpedientes;