const handleEmailChange = async (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Correo electrónico invalido."
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: '',
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

export { handleEmailChange, handlePasswordChange }