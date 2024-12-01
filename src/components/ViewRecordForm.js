import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


const ViewRecordForm = ({ initialData = {}, dataPatient = {}, title, buttonText, loading }) => {

    const router = useRouter();
    const [dataP, setDataP] = useState({});
    const [formData, setFormData] = useState({
        weight: '',
        size: '',
        tA: '',
        fC: '',
        fR: '',
        t: '',
        history1: '',
        history2: '',
        history3: '',
        history4: '',
        history5: '',
        history6: '',
        history7: '',
        history8: '',
        cardiovascular1: '',
        cardiovascular2: '',
        cardiovascular3: '',
        cardiovascular4: '',
        cardiovascular5: '',
        cardiovascular6: '',
        disease1: '',
        disease2: '',
        disease3: '',
        disease4: '',
        colitis: '',
        gastritis: '',
        gastroenteritis: '',
        asma: '',
        bronquitis: '',
        neumonia: '',
        tuberculosis: '',
        farinoamigdalitis: '',
        pathological1: '',
        pathological2: '',
        pathological3: '',
        pathological4: '',
        pathological5: '',
        pathological6: '',
        pathological7: '',
        cavity1: '',
        cavity2: '',
        cavity3: '',
        dolor: '',
        luxacion: '',
        anquilosis: '',
        crepitacion: '',
        subluxacion: '',
        espasmoMuscular: '',
    });

    const [currentStep, setCurrentStep] = useState(1);

    // Funciones para manejar el cambio de pasos
    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    useEffect(() => {
        setFormData((prevData) => ({ ...prevData, ...initialData }));
    }, []);

    useEffect(() => {
        if (dataPatient) {
            setDataP(dataPatient)
        }
    }, [dataPatient])

    const handleGoBack = () => {
        router.back(); 
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
            <div className="w-3/4 bg-white rounded-lg shadow-lg p-8">
                <button onClick={handleGoBack} className="inline-flex rounded-lg p-1 text-blue-600 text-xl hover:text-white hover:bg-blue-500">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="lg"
                    />
                </button>

                {dataP && Object.keys(dataP).length > 0 ? (
                    <div className="mb-8 col-span-4">
                        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
                        <h1 className="text-xl font-medium text-center mb-2">
                            Paciente: {dataP.Login.name} {dataP.Login.lastName}
                        </h1>

                    </div>

                ) : (
                    <p className="text-center col-span-4 text-gray-500">
                        No hay datos del paciente disponibles.
                    </p>
                )}

                {/* Stepper */}
                <div className="flex justify-center items-center mb-6">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`w-8 h-8 flex items-center justify-center rounded-full mx-2 
                                ${currentStep === step ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                {currentStep === 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Historia médica</h2></div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Peso</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.weight || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Talla</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.size || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">T.A</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.tA || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">F.C</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.fC || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">F.R</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.fR || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">T</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.t || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Motivo de la consulta?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history1 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Qué medida de higiene oral acostumbra?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history2 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Cómo se encuentra usted de salud?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history3 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Padecimiento actual?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history4 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Esta bajo tratamiento médico?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history5 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Está tomando un tipo de medicamento o droga?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history6 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Ha sido hospitalizado quirúrgicamente?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history8 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Es Ud. alérgico o intolerante a los medicamentos , alimentos u otras sustancias?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.history7 || "N/A"}
                            </p>
                        </div>

                    </div>

                )}

                {currentStep === 2 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Aparato Cardiovascular</h2></div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Presión arterial?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular1 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Fiebre reumática?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular2 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Hemorragias</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular3 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Anemia?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular4 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Infartos</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular5 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Otros?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cardiovascular6 || "N/A"}
                            </p>
                        </div>

                    </div>
                )}

                {currentStep === 3 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Enfermedades de transmisión sexual</h2></div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Herpes?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.disease1 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Tuberculosis?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.disease2 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿VIH?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.disease3 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Otros?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.disease4 || "N/A"}
                            </p>
                        </div>

                    </div>
                )}

                {currentStep === 4 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Antecedentes patológicos</h2></div>

                        <div className="col-span-4 md:col-span-2">
                            <h2 className="block text-sm font-medium text-gray-700 mb-4">¿Alteración del aparato digestivo?</h2>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">

                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Colitis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.colitis}
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Gastritis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.gastritis}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Gastroenteritis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.gastroenteritis}
                                        readOnly
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <h2 className="block text-sm font-medium text-gray-700 mb-4">¿Dificultades respiratorias?</h2>

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Asma
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.asma}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Bronquitis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.bronquitis}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Neumonía
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.neumonia}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Tuberculosis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.tuberculosis}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Farinoamigdalitis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.farinoamigdalitis}
                                        readOnly
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Cardiopatías?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological1 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Diabetes?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological2 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Hepatitis?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological3 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Padecimientos actuales?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological4 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Embarazos y abortos?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological5 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Alteraciones Neuropsicológicas?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological6 || "N/A"}
                            </p>
                        </div>
                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">¿Convulsiones?</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.pathological7 || "N/A"}
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Exploración de la cavidad oral</h2></div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Tejidos Blandos</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cavity1 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Tejidos Óseos</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cavity2 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Articulación Temporomandibular</label>
                            <p className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100">
                                {formData.cavity3 || "N/A"}
                            </p>
                        </div>

                        <div className="col-span-4 md:col-span-3">

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Dolor
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.dolor}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Luxación
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.luxacion}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Anquilosis
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.anquilosis}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Crepitación
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.crepitacion}
                                        readOnly
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Subluxación
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.subluxacion}
                                        readOnly
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-4 mb-2 md:gap-x-10 lg:gap-0">
                                <div className="col-span-3 md:col-span-2">
                                    <label htmlFor="customCheckbox" className="ml-2 text-gray-700">
                                        Espasmo Muscular
                                    </label>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="customCheckbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={formData.espasmoMuscular}
                                        readOnly
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                )}

                {/* Botones de navegación */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className={`bg-gray-300 px-4 py-2 rounded ${currentStep === 1 ? "cursor-not-allowed" : ""}`}
                        onClick={prevStep}
                        disabled={currentStep === 1}
                    >
                        Atrás
                    </button>
                    {currentStep < 5 && (
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={nextStep}
                        >
                            Siguiente
                        </button>
                    )}
                    {currentStep === 5 && (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleGoBack}
                        >
                            {buttonText}
                        </button>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ViewRecordForm;
