import Layout from "@/components/Layout";
import MostrarListEx from "@/components/MostrarListEx";

const mostrarExpedientes = () => {

    const expedientes = [
        {
            numeroExpediente: '02',
            fecha: '26/05/2024',
            hora: '15:22'
        },
        {
            numeroExpediente: '042',
            fecha: '26/05/2024',
            hora: '13:20'
        },
        {
            numeroExpediente: '062',
            fecha: '26/05/2024',
            hora: '10:20'
        },
        {
            numeroExpediente: '072',
            fecha: '26/05/2024',
            hora: '10:20'
        },
    ];

    return (
        <Layout>
            <MostrarListEx 
                title={"Expedientes"} 
                data={expedientes} 
                content={"Expediente"} 
                linkH={"/expediente"}
                message={"Crear expediente"}
            />
        </Layout>
    )
}


export default mostrarExpedientes;