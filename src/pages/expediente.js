import Layout from '@/components/Layout';
import { useState } from "react";
import { useRouter } from 'next/router';

const expediente = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
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

    const [errors, setErrors] = useState({
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
        general: '',
    });

    const [currentStep, setCurrentStep] = useState(1);

    // Funciones para manejar el cambio de pasos
    const nextStep = () => {
        /* if (validarStep()) {
        } */
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    const validarStep = () => {
        if (currentStep === 1) {

            if ((errors.name.length > 0) || (errors.lastName.length > 0)
                || (errors.gender.length > 0) || (errors.birthDate.length > 0)
                || (errors.phoneNumber.length > 0) || (errors.email.length > 0)
                || (errors.password.length > 0) || (errors.confirmPassword.length > 0)
                || (formData.confirmPassword.trim() === '')
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    showError: true,
                }));
                return false;
            }

        }

        if (currentStep === 2) {

            if ((errors.degree.length > 0) || (errors.professionalLicense.length > 0)
                || (errors.specialty.length > 0) || (errors.specialtyLicense.length > 0)
                || (formData.professionalLicense.trim() === '')
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    showError: true,
                }));
                return false;
            }
        }

        if (currentStep === 3) {

            if ((formData.clinicName.trim() === '')
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    showError: true,
                }));
                return false;
            }
        }

        return true;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.clinicName.trim() === '' || formData.clinicAddress.trim() === ''
            || errors.clinicName.length > 0 || errors.clinicAddress.length > 0
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                showError: true,
            }));

        } else {

            // Crear una instancia de FormData
            const formDataToSend = new FormData();

            // Agregar los campos de texto
            formDataToSend.append('name', formData.name);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('birthDate', formData.birthDate);
            formDataToSend.append('phoneNumber', formData.phoneNumber);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('confirmPassword', formData.confirmPassword);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('degree', formData.degree);
            formDataToSend.append('professionalLicense', formData.professionalLicense);
            formDataToSend.append('specialty', formData.specialty);
            formDataToSend.append('specialtyLicense', formData.specialtyLicense);
            formDataToSend.append('clinicName', formData.clinicName);
            formDataToSend.append('clinicAddress', formData.clinicAddress);

            // Agregar los archivos opcionales
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
            if (formData.clinicLogo) {
                formDataToSend.append('clinicLogo', formData.clinicLogo);
            }
            if (formData.authorizationFile) {
                formDataToSend.append('authorizationFile', formData.authorizationFile);
            }

            try {
                // Enviar el formulario al servidor
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/auth/registerDoctor`, {
                    method: 'POST',
                    body: formDataToSend,  // Enviar el objeto FormData
                });

                if (response.ok) {
                    console.log('Formulario enviado con éxito');

                    // Limpiar el formulario reseteando el estado
                    setFormData({
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

                    // Redirigir al login
                    router.push('/');

                } else {
                    console.error('Error al enviar el formulario');
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: 'Error al enviar el formulario. Inténtalo de nuevo.',
                    }));
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: `Ocurrió un error al enviar la solicitud. ${error}`,
                }));
            }
        }
    };
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
                <div className="w-3/4 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Expediente Clinico</h2>

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

                        {errors.general && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                                <strong className="font-bold">¡Error!</strong>
                                <span className="block sm:inline"> {errors.general} </span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => handleCloseAlertGeneral(setErrors)}>
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
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">Talla</label>
                                    <input
                                        type="text"
                                        value={formData.size}
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">T.A</label>
                                    <input
                                        type="text"
                                        value={formData.tA}
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">F.C</label>
                                    <input
                                        type="text"
                                        value={formData.fC}
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">F.R</label>
                                    <input
                                        type="text"
                                        value={formData.fR}
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">T</label>
                                    <input
                                        type="text"
                                        value={formData.t}
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300`}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Motivo de la consulta?</label>
                                    <input
                                        type="text"
                                        value={formData.history1}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Qué medida de higiene oral acostumbra?</label>
                                    <input
                                        type="text"
                                        value={formData.history2}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Cómo se encuentra usted de salud?</label>
                                    <input
                                        type="text"
                                        value={formData.history3}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Padecimiento actual?</label>
                                    <input
                                        type="text"
                                        value={formData.history4}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Esta bajo tratamiento médico?</label>
                                    <input
                                        type="text"
                                        value={formData.history5}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Está tomando un tipo de medicamento o droga?</label>
                                    <input
                                        type="text"
                                        value={formData.history6}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Ha sido hospitalizado quirúrgicamente?</label>
                                    <input
                                        type="text"
                                        value={formData.history8}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Es Ud. alérgico o intolerante a los medicamentos , alimentos u otras sustancias?</label>
                                    <input
                                        type="text"
                                        value={formData.history7}
                                        className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 `}
                                    />
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
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">¿Cardiopatías?</label>
                                    <input
                                        type="text"
                                        value={formData.pathological1}
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
                                    type="submit" // Enviar el formulario en el último paso
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Enviar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default expediente;