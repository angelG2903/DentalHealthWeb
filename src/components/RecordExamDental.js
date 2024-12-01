// pages/odontograma.js
import { useEffect, useState } from "react";
import OdontogramaTable from '@/components/OdontogramaTable';
import Diente from "@/components/Diente";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
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

const RecordExamDental = ({ initialData = [], onSubmit, dataPatient = {}, title, validLife, viewData, buttonText, loading }) => {

    const router = useRouter();
    const [esAdulto, setEsAdulto] = useState('adult');

    const [dientes, setDientes] = useState([]);
    const [dataP, setDataP] = useState({});

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

    useEffect(() => {
        if (initialData.length > 0) {

            const tieneChild = initialData.some((diente) => diente.lifeStage === 'child');
            const tieneAdult = initialData.some((diente) => diente.lifeStage === 'adult');

            if (tieneChild) {
                setEsAdulto('child');
            } else if (tieneAdult) {
                setEsAdulto('adult');
            }

            initialData.forEach(({ toothNumber, state }) => {
                actualizarEstadoDiente(toothNumber, state);
            });
        }

    }, []);

    useEffect(() => {
        if (dataPatient) {
            setDataP(dataPatient)
        }
    }, [dataPatient])


    const handleSubmit = async (e) => {
        e.preventDefault();

        onSubmit(dientes);
    };
    const handleGoBack = () => {
        router.back();  // Regresa a la página anterior
    };

    return (


        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="w-4/5 bg-white rounded-lg shadow-lg p-5 grid grid-cols-4">
                <div className="col-span-4">
                    <button onClick={handleGoBack} className="inline-flex rounded-lg p-1 text-blue-600 text-xl hover:text-white hover:bg-blue-500">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size="lg"
                        />
                    </button>
                </div>
                {dataP && Object.keys(dataP).length > 0 ? (
                    <div className="mb-8 col-span-4">
                        <h1 className="text-center text-xl font-bold mb-4 col-span-4">{title}</h1>
                        <h1 className="text-xl font-medium text-center mb-2">
                            Paciente: {dataP.Login.name} {dataP.Login.lastName}
                        </h1>

                    </div>

                ) : (
                    <p className="text-center col-span-4 text-gray-500">
                        No hay datos del paciente disponibles.
                    </p>
                )}
                <OdontogramaTable />

                <div className="col-span-4 md:col-span-2">
                    {validLife ? (
                        <div className={`flex justify-center mt-4`}>
                            <button
                                className={`px-4 py-2 rounded-3xl transition-colors duration-500 cursor-default pointer-events-none bg-blue-500 text-white`}
                            >
                                {esAdulto === 'adult' ? "Adulto" : "Niño"}
                            </button>

                        </div>
                    ) : (
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

                    )}
                    {/* Grilla de dientes */}
                    <form onSubmit={handleSubmit}>
                        <div className={`grid ${esAdulto === 'adult' ? "grid-cols-8" : "grid-cols-5"}  gap-2 mt-4`}>
                            {(esAdulto === 'adult' ? dientesAdulto : dientesNino).map((num) => (
                                <div key={num} className="contents">
                                    {cuadrantes[num] && (
                                        <div key={num} className="col-span-8">
                                            <h2 className={`text-end text-lg ${esAdulto === 'adult' ? "mr-6" : "mr-20"}`}>{cuadrantes[num]}</h2>
                                        </div>
                                    )}

                                    <Diente
                                        num={num}
                                        actualizarEstadoDiente={actualizarEstadoDiente}
                                        initialCondition={initialData.find(diente => diente.toothNumber === num)?.state || ""}
                                        show={viewData}
                                    />
                                </div>
                            ))}


                        </div>
                        {dientes.length > 0 && viewData === false && (
                            <div className="flex justify-center mt-8 mb-4">
                                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                                    {!loading ? 'Cargando...' : buttonText}
                                </button>
                            </div>
                        )}
                    </form>

                </div>

            </div>
        </div>
    );
};

export default RecordExamDental;
