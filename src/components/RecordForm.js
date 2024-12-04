import { useState, useEffect } from 'react';
import {
    handleWeightChange, handleSizeChange, handleTAChange, handleFCChange, handleFRChange, handleTChange,
    handleHistory1Change, handleHistory2Change, handleHistory3Change, handleHistory4Change, handleHistory5Change
    , handleHistory6Change, handleHistory7Change, handleHistory8Change, handleCloseAlert
} from '@/utils/formExpediente';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const RecordForm = ({ initialData = {}, dataPatient = {}, onSubmit, title, buttonText, loading }) => {

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

    const [errors, setErrors] = useState({
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
        showError: false,
    });

    const [notification, setNotification] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    // Funciones para manejar el cambio de pasos
    const nextStep = () => {
        if (validarStep()) {
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const validarStep = () => {
        if (currentStep === 1) {

            if ((errors.weight.length > 0) || (errors.size.length > 0)
                || (errors.tA.length > 0) || (errors.fC.length > 0)
                || (errors.fR.length > 0) || (errors.t.length > 0)
                || (errors.history1.length > 0) || (errors.history2.length > 0)
                || (errors.history3.length > 0) || (errors.history4.length > 0)
                || (errors.history5.length > 0) || (errors.history6.length > 0)
                || (errors.history7.length > 0) || (errors.history8.length > 0)

                || (formData.weight === '') || (formData.size === '')
                || (formData.tA === '') || (formData.fC === '')
                || (formData.fR === '') || (formData.t === '')
                || (formData.history1.trim() === '') || (formData.history2.trim() === '')
                || (formData.history3.trim() === '') || (formData.history4.trim() === '')
                || (formData.history5.trim() === '') || (formData.history6.trim() === '')
                || (formData.history7.trim() === '') || (formData.history8.trim() === '')

            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    showError: true,
                }));
                return false;
            }
            setNotification('Estos campos puedes omitirlos si así deseas, solo presiona siguiente.');
            setTimeout(() => setNotification(''), 3000);

        }

        if (currentStep === 2) {
            setNotification('Estos campos puedes omitirlos si así deseas, solo presiona siguiente.');
            setTimeout(() => setNotification(''), 3000);
        }
        if (currentStep === 3) {
            setNotification('Estos campos puedes omitirlos si así deseas, solo presiona siguiente.');
            setTimeout(() => setNotification(''), 3000);
        }
        if (currentStep === 4) {
            setNotification('Estos campos puedes omitirlos si así deseas, solo presiona Enviar.');
            setTimeout(() => setNotification(''), 3000);
        }

        return true;
    };

    const handleStepClick = (step) => {
        if (step > currentStep) {
            // Si se intenta avanzar, valida los pasos anteriores
            if (validarStep()) {
                setCurrentStep(step);
            }
        } else {
            // Permitir retroceder sin validaciones
            setCurrentStep(step);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Agregar los campos de texto
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('size', formData.size);
        formDataToSend.append('tA', formData.tA);
        formDataToSend.append('fC', formData.fC);
        formDataToSend.append('fR', formData.fR);
        formDataToSend.append('t', formData.t);
        formDataToSend.append('history1', formData.history1);
        formDataToSend.append('history2', formData.history2);
        formDataToSend.append('history3', formData.history3);
        formDataToSend.append('history4', formData.history4);
        formDataToSend.append('history5', formData.history5);
        formDataToSend.append('history6', formData.history6);
        formDataToSend.append('history7', formData.history7);
        formDataToSend.append('history8', formData.history8);

        formDataToSend.append('cardiovascular1', formData.cardiovascular1);
        formDataToSend.append('cardiovascular2', formData.cardiovascular2);
        formDataToSend.append('cardiovascular3', formData.cardiovascular3);
        formDataToSend.append('cardiovascular4', formData.cardiovascular4);
        formDataToSend.append('cardiovascular5', formData.cardiovascular5);
        formDataToSend.append('cardiovascular6', formData.cardiovascular6);

        formDataToSend.append('disease1', formData.disease1);
        formDataToSend.append('disease2', formData.disease2);
        formDataToSend.append('disease3', formData.disease3);
        formDataToSend.append('disease4', formData.disease4);

        formDataToSend.append('colitis', formData.colitis);
        formDataToSend.append('gastritis', formData.gastritis);
        formDataToSend.append('gastroenteritis', formData.gastroenteritis);
        formDataToSend.append('asma', formData.asma);
        formDataToSend.append('bronquitis', formData.bronquitis);
        formDataToSend.append('neumonia', formData.neumonia);
        formDataToSend.append('tuberculosis', formData.tuberculosis);
        formDataToSend.append('farinoamigdalitis', formData.farinoamigdalitis);

        formDataToSend.append('pathological1', formData.pathological1);
        formDataToSend.append('pathological2', formData.pathological2);
        formDataToSend.append('pathological3', formData.pathological3);
        formDataToSend.append('pathological4', formData.pathological4);
        formDataToSend.append('pathological5', formData.pathological5);
        formDataToSend.append('pathological6', formData.pathological6);
        formDataToSend.append('pathological7', formData.pathological7);

        formDataToSend.append('cavity1', formData.cavity1);
        formDataToSend.append('cavity2', formData.cavity2);
        formDataToSend.append('cavity3', formData.cavity3);

        formDataToSend.append('dolor', formData.dolor);
        formDataToSend.append('luxacion', formData.luxacion);
        formDataToSend.append('anquilosis', formData.anquilosis);
        formDataToSend.append('crepitacion', formData.crepitacion);
        formDataToSend.append('subluxacion', formData.subluxacion);
        formDataToSend.append('espasmoMuscular', formData.espasmoMuscular);


        setFormData({
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
            colitis: false,
            gastritis: false,
            gastroenteritis: false,
            asma: false,
            bronquitis: false,
            neumonia: false,
            tuberculosis: false,
            farinoamigdalitis: false,
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
        setErrors({
            name: '',
            lastName: '',
            gender: '',
            birthDate: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            degree: '',
            professionalLicense: '',
            specialty: '',
            specialtyLicense: '',
            clinicName: '',
            clinicAddress: '',
            profilePicture: null,
            clinicLogo: null,
            authorizationFile: null,
            showError: false,
        });

        onSubmit(formDataToSend);
    };
    const handleGoBack = () => {
        router.back();  // Regresa a la página anterior
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
                            onClick={() => handleStepClick(step)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full mx-2 cursor-pointer
                                ${currentStep === step ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    {errors.showError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                            <strong className="font-bold">¡Error!</strong>
                            <span className="block sm:inline"> Todos los campos deben ser llenados correctamente antes de continuar.</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => handleCloseAlert(setErrors)}>
                                    <title>Cerrar</title>
                                    <path d="M14.348 5.652a.5.5 0 1 1 .707.707L10.707 10l4.348 4.348a.5.5 0 0 1-.707.707L10 10.707l-4.348 4.348a.5.5 0 1 1-.707-.707L9.293 10 4.945 5.652a.5.5 0 1 1 .707-.707L10 9.293l4.348-4.348z" />
                                </svg>
                            </span>
                        </div>
                    )}



                    {currentStep === 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Historia médica</h2></div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Peso</label>
                                <input
                                    type="text"
                                    value={formData.weight}
                                    onChange={(e) => handleWeightChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.weight ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={3}
                                />
                                {errors.weight && <p className="mt-2 text-sm text-red-600">{errors.weight}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Talla</label>
                                <input
                                    type="text"
                                    value={formData.size}
                                    onChange={(e) => handleSizeChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.size ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={3}
                                />
                                {errors.size && <p className="mt-2 text-sm text-red-600">{errors.size}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">T.A</label>
                                <input
                                    type="text"
                                    value={formData.tA}
                                    onChange={(e) => handleTAChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.tA ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.tA && <p className="mt-2 text-sm text-red-600">{errors.tA}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">F.C</label>
                                <input
                                    type="text"
                                    value={formData.fC}
                                    onChange={(e) => handleFCChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.fC ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.fC && <p className="mt-2 text-sm text-red-600">{errors.fC}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">F.R</label>
                                <input
                                    type="text"
                                    value={formData.fR}
                                    onChange={(e) => handleFRChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.fR ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.fR && <p className="mt-2 text-sm text-red-600">{errors.fR}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">T</label>
                                <input
                                    type="text"
                                    value={formData.t}
                                    onChange={(e) => handleTChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300 ${errors.t ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.t && <p className="mt-2 text-sm text-red-600">{errors.t}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Motivo de la consulta?</label>
                                <input
                                    type="text"
                                    value={formData.history1}
                                    onChange={(e) => handleHistory1Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history1 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history1 && <p className="mt-2 text-sm text-red-600">{errors.history1}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Qué medida de higiene oral acostumbra?</label>
                                <input
                                    type="text"
                                    value={formData.history2}
                                    onChange={(e) => handleHistory2Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history2 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history2 && <p className="mt-2 text-sm text-red-600">{errors.history2}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Cómo se encuentra usted de salud?</label>
                                <input
                                    type="text"
                                    value={formData.history3}
                                    onChange={(e) => handleHistory3Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history3 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history3 && <p className="mt-2 text-sm text-red-600">{errors.history3}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Padecimiento actual?</label>
                                <input
                                    type="text"
                                    value={formData.history4}
                                    onChange={(e) => handleHistory4Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history4 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history4 && <p className="mt-2 text-sm text-red-600">{errors.history4}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Esta bajo tratamiento médico?</label>
                                <input
                                    type="text"
                                    value={formData.history5}
                                    onChange={(e) => handleHistory5Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history5 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history5 && <p className="mt-2 text-sm text-red-600">{errors.history5}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Está tomando un tipo de medicamento o droga?</label>
                                <input
                                    type="text"
                                    value={formData.history6}
                                    onChange={(e) => handleHistory6Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history6 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history6 && <p className="mt-2 text-sm text-red-600">{errors.history6}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Ha sido hospitalizado quirúrgicamente?</label>
                                <input
                                    type="text"
                                    value={formData.history8}
                                    onChange={(e) => handleHistory8Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history8 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history8 && <p className="mt-2 text-sm text-red-600">{errors.history8}</p>}
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Es Ud. alérgico o intolerante a los medicamentos , alimentos u otras sustancias?</label>
                                <input
                                    type="text"
                                    value={formData.history7}
                                    onChange={(e) => handleHistory7Change(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.history7 ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.history7 && <p className="mt-2 text-sm text-red-600">{errors.history7}</p>}
                            </div>

                        </div>

                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Aparato Cardiovascular</h2></div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Presión arterial?</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular1}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular1: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Fiebre reumática?</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular2}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular2: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Hemorragias</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular3}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular3: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Anemia?</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular4}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular4: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Infartos</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular5}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular5: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Otros?</label>
                                <input
                                    type="text"
                                    value={formData.cardiovascular6}
                                    onChange={(e) => setFormData({ ...formData, cardiovascular6: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                        rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                        focus:border-blue-300 `}
                                />
                            </div>

                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Enfermedades de transmisión sexual</h2></div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Herpes?</label>
                                <input
                                    type="text"
                                    value={formData.disease1}
                                    onChange={(e) => setFormData({ ...formData, disease1: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Tuberculosis?</label>
                                <input
                                    type="text"
                                    value={formData.disease2}
                                    onChange={(e) => setFormData({ ...formData, disease2: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿VIH?</label>
                                <input
                                    type="text"
                                    value={formData.disease3}
                                    onChange={(e) => setFormData({ ...formData, disease3: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Otros?</label>
                                <input
                                    type="text"
                                    value={formData.disease4}
                                    onChange={(e) => setFormData({ ...formData, disease4: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
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
                                            onChange={(e) => setFormData({ ...formData, colitis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, gastritis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, gastroenteritis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, asma: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, bronquitis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, neumonia: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, tuberculosis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, farinoamigdalitis: e.target.checked })}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Cardiopatías?</label>
                                <input
                                    type="text"
                                    value={formData.pathological1}
                                    onChange={(e) => setFormData({ ...formData, pathological1: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Diabetes?</label>
                                <input
                                    type="text"
                                    value={formData.pathological2}
                                    onChange={(e) => setFormData({ ...formData, pathological2: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Hepatitis?</label>
                                <input
                                    type="text"
                                    value={formData.pathological3}
                                    onChange={(e) => setFormData({ ...formData, pathological3: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Padecimientos actuales?</label>
                                <input
                                    type="text"
                                    value={formData.pathological4}
                                    onChange={(e) => setFormData({ ...formData, pathological4: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Embarazos y abortos?</label>
                                <input
                                    type="text"
                                    value={formData.pathological5}
                                    onChange={(e) => setFormData({ ...formData, pathological5: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Alteraciones Neuropsicológicas?</label>
                                <input
                                    type="text"
                                    value={formData.pathological6}
                                    onChange={(e) => setFormData({ ...formData, pathological6: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">¿Convulsiones?</label>
                                <input
                                    type="text"
                                    value={formData.pathological7}
                                    onChange={(e) => setFormData({ ...formData, pathological7: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>



                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4"><h2 className="font-semibold mb-4 text-center">Exploración de la cavidad oral</h2></div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tejidos Blandos</label>
                                <input
                                    type="text"
                                    value={formData.cavity1}
                                    onChange={(e) => setFormData({ ...formData, cavity1: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tejidos Óseos</label>
                                <input
                                    type="text"
                                    value={formData.cavity2}
                                    onChange={(e) => setFormData({ ...formData, cavity2: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Articulación Temporomandibular</label>
                                <input
                                    type="text"
                                    value={formData.cavity3}
                                    onChange={(e) => setFormData({ ...formData, cavity3: e.target.value })}
                                    className={`mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                    focus:border-blue-300 `}
                                />
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
                                            onChange={(e) => setFormData({ ...formData, dolor: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, luxacion: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, anquilosis: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, crepitacion: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, subluxacion: e.target.checked })}
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
                                            onChange={(e) => setFormData({ ...formData, espasmoMuscular: e.target.checked })}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}


                    {notification && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
                            {notification}
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
                                type="submit" // Enviar el formulario en el último paso
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                {!loading ? 'Cargando...' : buttonText}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecordForm;
