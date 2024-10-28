// pages/odontograma.js
import { useState } from "react";
import Layout from '@/components/Layout';
import OdontogramaTable from '@/components/OdontogramaTable';
import Diente from "../components/Diente";
// import { dientesAdulto, dientesNino } from "../data/dientes";

const dientesAdulto = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 48, 47, 46, 45, 44, 43, 42, 41,];
const dientesNino = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 85, 84, 83, 82, 81];
const cuadrantes = {
    18: "Cuadrante 1",
    21: "Cuadrante 2",
    31: "Cuadrante 3",
    48: "Cuadrante 4",
    55: "Cuadrante 5",
    61: "Cuadrante 6",
    71: "Cuadrante 7",
    85: "Cuadrante 8"
};

const examenDental = () => {

    const [esAdulto, setEsAdulto] = useState('adult');

    const [dientes, setDientes] = useState([]);

    const actualizarEstadoDiente = (toothNumber, state) => {
        setDientes((prevDientes) => {
            // Filtra los dientes que no son el actual, para evitar duplicados
            const otrosDientes = prevDientes.filter(d => d.toothNumber !== toothNumber);

            // Crea un nuevo objeto diente y añade `lifeStage`
            const dienteActualizado = { lifeStage: esAdulto, toothNumber, state };

            // Añade el diente actualizado y los otros dientes
            return [...otrosDientes, dienteActualizado];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Datos de dientes enviados:", dientes);
        // Aquí puedes enviar `dientes` a la API o procesarlos según necesites
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/dentalExam/create/${12}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ dientes }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Datos guardados exitosamente:", result);
            } else {
                console.error("Error al guardar los datos");
                console.log(JSON.stringify({ dientes }));
                const errorMessage = await response.text();
                alert(`Error al guardar el examen dental: ${response.status} - ${response.statusText}\nMensaje: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (

        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
                <div className="w-4/5 bg-white rounded-lg shadow-lg p-5 grid grid-cols-4">
                    <h1 className="text-center text-xl font-bold mb-8 col-span-4">Examen Dental</h1>
                    <OdontogramaTable />

                    <div className="col-span-4 md:col-span-2">
                        <div className={`flex justify-center mt-4`}>
                            <button
                                className={`px-4 py-2 rounded-l-3xl transition-colors duration-500 ${esAdulto === 'adult' ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                onClick={() => {
                                    setDientes([]);
                                    setEsAdulto('adult');
                                }}
                            >
                                Adulto
                            </button>
                            <button
                                className={`px-4 py-2 rounded-r-3xl transition-colors duration-500 ${esAdulto === 'child' ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                onClick={() => {
                                    setDientes([]);
                                    setEsAdulto('child');
                                }}

                            >
                                Niño
                            </button>

                        </div>
                        {/* Grilla de dientes */}
                        <form onSubmit={handleSubmit}>
                            <div className={`grid ${esAdulto === 'adult' ? "grid-cols-8" : "grid-cols-5"}  gap-2 mt-4`}>
                                {(esAdulto === 'adult' ? dientesAdulto : dientesNino).map((num) => (
                                    <>
                                        {cuadrantes[num] && (
                                            <div className="col-span-8">
                                                <h2 className={`text-end text-lg ${esAdulto === 'adult' ? "mr-6" : "mr-20"}`}>{cuadrantes[num]}</h2>
                                            </div>
                                        )}
                                        <Diente key={num} num={num} actualizarEstadoDiente={actualizarEstadoDiente} />
                                    </>
                                ))}


                            </div>
                            <div className="flex justify-center mt-8 mb-4">
                                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">Guardar</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </Layout>

    );
};

export default examenDental;
