const handleNameChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value});
   
    
    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: 'El nombre es requerido.',
        }));
    } else if (value.length < 2) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: 'El nombre debe tener al menos 2 caracteres.',
        }));
    } else if (value.length >= 30) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: 'El nombre no debe exceder los 30 caracteres.',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: '',
        }));
    }
};

const handleLastNameChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, lastName: value});

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: 'El apellido es requerido',
        }));
    } else if (value.length < 2) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: 'El apellido debe tener al menos 2 caracteres.',
        }));
    } else if (value.length >= 30) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: 'El apellido no debe exceder los 30 caracteres.',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: '',
        }));
    }
};

const handleGenderChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, gender: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            gender: 'El genero es requerido',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            gender: '',
        }));
    }
};

const handleBirthDateChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    const birthDate = new Date(value);  // Convertir la fecha ingresada a un objeto Date
    const today = new Date();  // Fecha actual

    setFormData({ ...formData, birthDate: value });

    // Validación para fecha vacía
    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            birthDate: 'La fecha de nacimiento es requerida.',
        }));
    }
    // Validación para fecha en el futuro o igual a hoy
    else if (birthDate > today) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            birthDate: 'La fecha de nacimiento no puede ser hoy o en el futuro.',
        }));
    }
    // Validación para menor de edad
    else {
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        if (age < 18) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                birthDate: 'Debes tener al menos 18 años.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                birthDate: '',
            }));
        }
    }
};

const handlePhoneNumberChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phoneNumber: value });

    // Validación para número de teléfono de 10 dígitos
    if (!/^\d{10}$/.test(value)) {
        setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'El número debe tener 10 dígitos.',
        }));
    } else {
        setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: '',
        }));
    }
};

const handleDegreeChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, degree: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            degree: 'La Licenciatura es requerido',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            degree: '',
        }));
    }
};

const handleProfessionalLicenseChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, professionalLicense: value });

    
    if (!/^\d{8}$/.test(value)) {
        setErrors((prevErrors) => ({
        ...prevErrors,
        professionalLicense: 'La Cedula profesional debe tener 8 dígitos.',
        }));
    } else {
        setErrors((prevErrors) => ({
        ...prevErrors,
        professionalLicense: '',
        }));
    }
};

const handleSpecialtyChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, specialty: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            specialty: 'La Especialidad es requerido',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            specialty: '',
        }));
    }
};

const handleSpecialtyLicenseChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, specialtyLicense: value });

    
    if (!/^\d{8}$/.test(value)) {
        setErrors((prevErrors) => ({
        ...prevErrors,
        specialtyLicense: 'La Cedula de especialidad debe tener 8 dígitos.',
        }));
    } else {
        setErrors((prevErrors) => ({
        ...prevErrors,
        specialtyLicense: '',
        }));
    }
};

const handlePasswordChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });

    if (value.length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'La contraseña debe tener al menos 6 caracteres.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: '',
        }));
    }
};

const handleConfirmPasswordChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, confirmPassword: value });

    if (formData.password !== value || !formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Las contraseñas no coinciden."
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: ""
        }));
    }
};

const handleEmailChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Por favor, introduce un correo electrónico válido."
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: ""
        }));
    }
};

const handleFileChange = (e, formData, setFormData, setErrors) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setFormData({ ...formData, profilePicture: file });
        setErrors((prevErrors) => ({
            ...prevErrors,
            profilePicture: ""
        }));
    } else {
        setFormData({ ...formData, profilePicture: null });
        setErrors((prevErrors) => ({
            ...prevErrors,
            profilePicture: "Por favor, selecciona una imagen válida"
        }));

    }
};

const handleClinicLogoChange = (e, formData, setFormData, setErrors) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setFormData({ ...formData, clinicLogo: file });
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicLogo: ""
        }));
    } else {
        setFormData({ ...formData, clinicLogo: null });
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicLogo: "Por favor, selecciona una imagen válida"
        }));

    }
};

const handleAuthorizationFileChange = (e, formData, setFormData, setErrors) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || 
             file.type === "application/msword" || 
             file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        ) {
        setFormData({ ...formData, authorizationFile: file });
        setErrors((prevErrors) => ({
            ...prevErrors,
            authorizationFile: ""
        }));
    } else {
        setFormData({ ...formData, authorizationFile: null });
        setErrors((prevErrors) => ({
            ...prevErrors,
            authorizationFile: "Por favor, selecciona un archivo correcto (PDF o Word)"
        }));

    }
};

const handleRemoveFile = (setFormData, setErrors) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: null, // Limpiar la imagen seleccionada
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: ""
    })); 
};
const handleRemoveClinicLogo = (setFormData, setErrors) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clinicLogo: null,
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        clinicLogo: ""
    })); 
};
const handleRemoveAuthorization = (setFormData, setErrors) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      authorizationFile: null, 
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        authorizationFile: ""
    })); 
};

const handleClinicNameChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, clinicName: value});
   
    
    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicName: 'El nombre del consultorio es requerido.',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicName: '',
        }));
    }
};

const handleClinicAddressChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, clinicAddress: value});
   
    
    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicAddress: 'La dirección es requerido.',
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            clinicAddress: '',
        }));
    }
};

const handleCloseAlert = (setErrors) => {
    setErrors((prevErrors) => ({
        ...prevErrors,
        showError: false,
    }));
};

export {
    handleNameChange, handleLastNameChange, handleAuthorizationFileChange, handleBirthDateChange, 
    handleClinicAddressChange, handleClinicLogoChange, handleClinicNameChange, handleCloseAlert,
    handleConfirmPasswordChange, handlePasswordChange, handlePhoneNumberChange, handleDegreeChange,
    handleEmailChange, handleGenderChange, handleProfessionalLicenseChange, handleRemoveFile, 
    handleRemoveAuthorization, handleRemoveClinicLogo, handleFileChange, handleSpecialtyLicenseChange,
    handleSpecialtyChange
}