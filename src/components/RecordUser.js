import { useState, useEffect } from "react";
import {
    handleNameChange, handleLastNameChange, handleGenderChange, handleBirthDateChange,
    handlePhoneNumberChange, handleRemoveFile, handleFileChange, handleAuthorizationFileChange,
    handleClinicAddressChange, handleClinicLogoChange, handleClinicNameChange, handleCloseAlert,
    handleEmailChange, handleConfirmPasswordChange, handleDegreeChange, handlePasswordChange,
    handleProfessionalLicenseChange, handleRemoveAuthorization, handleRemoveClinicLogo,
    handleSpecialtyChange, handleSpecialtyLicenseChange, handleCloseAlertGeneral
} from '@/utils/formValidations';

import { useRouter } from 'next/router';

const RecordUser = ({ initialData = {}, onSubmit, title, editUser }) => {
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

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        gender: '',
        birthDate: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (validarStep()) {
            if (currentStep < 3) {
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
        if ((currentStep === 1) && (editUser === false)) {

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

        if ((currentStep === 1) && (editUser === true)) {

            if ((errors.name.length > 0) || (errors.lastName.length > 0)
                || (errors.gender.length > 0) || (errors.birthDate.length > 0)
                || (errors.phoneNumber.length > 0)
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

    useEffect(() => {
        setFormData((prevData) => ({ ...prevData, ...initialData }));
    }, []);

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

            setFormData({
                name: '',
                lastName: '',
                gender: '',
                birthDate: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
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
            
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
            <div className="w-3/4 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">{title}{console.log(formData)}</h2>

                {/* Stepper */}
                <div className="flex justify-center items-center mb-6">
                    {[1, 2, 3].map((step) => (
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
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2"><h2 className="font-semibold mb-4 text-center">Datos personales</h2></div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 
                                            rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                            focus:border-blue-300 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => handleLastNameChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md 
                                        shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300
                                        ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Genero</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleGenderChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                                {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => handleBirthDateChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3
                                     focus:outline-none focus:ring focus:border-blue-300
                                     ${errors.birthDate ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.birthDate && <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handlePhoneNumberChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Ingresa tu número de teléfono"
                                    maxLength={10}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Fotografía (opcional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100
                                        ${errors.profilePicture ? "border-red-500" : "border-gray-300"}`}
                                    accept='image/*'
                                />
                                {formData.profilePicture && (
                                    <div className="mt-2 flex items-center">
                                        <p className="text-sm ms-2">Imagen seleccionada: {formData.profilePicture.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(setFormData, setErrors)}
                                            className="ml-3 text-xs text-red-500 hover:text-red-700"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                )}
                                {errors.profilePicture && <p className="text-red-500 text-xs mt-1">{errors.profilePicture}</p>}

                            </div>
                            {editUser === false && (
                                <>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleEmailChange(e, formData, setFormData, setErrors)}
                                            className={`mt-1 block w-full border border-gray-300 
                                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                                    focus:border-blue-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handlePasswordChange(e, formData, setFormData, setErrors)}
                                            className={`mt-1 block w-full border border-gray-300 
                                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                                    focus:border-blue-300 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleConfirmPasswordChange(e, formData, setFormData, setErrors)}
                                            className={`mt-1 block w-full border border-gray-300 
                                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring
                                                    focus:border-blue-300 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                                    </div>
                                </>

                            )}

                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Licenciatura</label>
                                <input
                                    type="text"
                                    value={formData.degree}
                                    onChange={(e) => handleDegreeChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.degree ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={51}
                                />
                                {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Cedula profesional</label>
                                <input
                                    type="text"
                                    value={formData.professionalLicense}
                                    onChange={(e) => handleProfessionalLicenseChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.professionalLicense ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={8}
                                />
                                {errors.professionalLicense && <p className="text-red-500 text-xs mt-1">{errors.professionalLicense}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Especialidad</label>
                                <input
                                    type="text"
                                    value={formData.specialty}
                                    onChange={(e) => handleSpecialtyChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.specialty ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={51}
                                />
                                {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Cedula de especialidad</label>
                                <input
                                    type="text"
                                    value={formData.specialtyLicense}
                                    onChange={(e) => handleSpecialtyLicenseChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                    focus:outline-none focus:ring focus:border-blue-300
                                    ${errors.specialtyLicense ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={8}
                                />
                                {errors.specialtyLicense && <p className="text-red-500 text-xs mt-1">{errors.specialtyLicense}</p>}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Nombre del consultorio</label>
                                <input
                                    type="text"
                                    value={formData.clinicName}
                                    onChange={(e) => handleClinicNameChange(e, formData, setFormData, setErrors)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                                focus:outline-none focus:ring focus:border-blue-300
                                                ${errors.clinicName ? "border-red-500" : "border-gray-300"}`}
                                    maxLength={50}
                                />
                                {errors.clinicName && <p className="text-red-500 text-xs mt-1">{errors.clinicName}</p>}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Logo del consultorio</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleClinicLogoChange(e, formData, setFormData, setErrors)}
                                    className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                    accept='image/*'
                                />
                                {formData.clinicLogo && (
                                    <div className="mt-2 flex items-center">
                                        <p className="text-sm ms-2">Imagen seleccionada: {formData.clinicLogo.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveClinicLogo(setFormData, setErrors)}
                                            className="ml-3 text-xs text-red-500 hover:text-red-700"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                )}
                                {errors.clinicLogo && <p className="text-red-500 text-xs mt-1">{errors.clinicLogo}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Dirección del consultorio</label>
                                <textarea
                                    value={formData.clinicAddress}
                                    onChange={(e) => handleClinicAddressChange(e, formData, setFormData, setErrors)}
                                    rows="4"  // Puedes ajustar el número de filas según sea necesario
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 
                                            focus:outline-none focus:ring focus:border-blue-300
                                            ${errors.clinicAddress ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.clinicAddress && <p className="text-red-500 text-xs mt-1">{errors.clinicAddress}</p>}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Archivo de autorización</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleAuthorizationFileChange(e, formData, setFormData, setErrors)}
                                    className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                />
                                {formData.authorizationFile && (
                                    <div className="mt-2 flex items-center">
                                        <p className="text-sm ms-2">Imagen seleccionada: {formData.authorizationFile.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAuthorization(setFormData, setErrors)}
                                            className="ml-3 text-xs text-red-500 hover:text-red-700"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                )}
                                {errors.authorizationFile && <p className="text-red-500 text-xs mt-1">{errors.authorizationFile}</p>}
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
                        {currentStep < 3 && (
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={nextStep}
                            >
                                Siguiente
                            </button>
                        )}
                        {currentStep === 3 && (
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
    )
}

export default RecordUser;
