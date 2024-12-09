const handleWeightChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, weight: value });

    // Validación del rango de peso
    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            weight: 'El peso es obligatorio.'
        }));
    } else if (parseInt(value, 10) < 20 || parseInt(value, 10) > 120) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            weight: 'El peso debe estar entre 20 y 120 kg.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            weight: ''
        }));
    }

};

const handleSizeChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, size: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            size: 'La talla es obligatoria.'
        }));
    } else if (parseInt(value, 10) < 50 || parseInt(value, 10) > 250) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            size: 'La talla debe estar entre 50 cm y 250 cm.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            size: ''
        }));
    }

}


// Falta ver -----------------------------------------------------
const handleTAChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, tA: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            tA: 'El T.A es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            tA: ''
        }));
    }

}

const handleFCChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, fC: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fC: 'El F.C es obligatorio.'
        }));
    } else if (parseInt(value) < 40 || parseInt(value) > 200) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fC: 'F.C. debe estar entre 40 y 200 lpm'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fC: ''
        }));
    }

}

const handleFRChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, fR: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fR: 'El F.R es obligatorio.'
        }));
    } else if (parseInt(value) < 8 || parseInt(value) > 40) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fR: 'F.R. debe estar entre 8 y 40 respiraciones por minuto.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            fR: ''
        }));
    }

}


const handleTChange = (e, formData, setFormData, setErrors) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, t: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            t: 'El T es obligatorio.'
        }));
    } else if (parseInt(value) < 35 || parseInt(value) > 42) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            t: 'La T debe estar entre 35°C y 42°C.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            t: ''
        }));
    }

}

const handleHistory1Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history1: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history1: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history1: ''
        }));
    }

}
const handleHistory2Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history2: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history2: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history2: ''
        }));
    }

}
const handleHistory3Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history3: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history3: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history3: ''
        }));
    }

}
const handleHistory4Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history4: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history4: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history4: ''
        }));
    }

}
const handleHistory5Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history5: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history5: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history5: ''
        }));
    }

}
const handleHistory6Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history6: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history6: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history6: ''
        }));
    }

}
const handleHistory7Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history7: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history7: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history7: ''
        }));
    }

}
const handleHistory8Change = (e, formData, setFormData, setErrors) => {
    const value = e.target.value;
    setFormData({ ...formData, history8: value });

    if (value.trim() === '') {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history8: 'El campo es obligatorio.'
        }));
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            history8: ''
        }));
    }

}

// -----------------------------------------------------------------------------

const handleCloseAlert = (setErrors) => {
    setErrors((prevErrors) => ({
        ...prevErrors,
        showError: false,
    }));
};

export { handleWeightChange, handleSizeChange, handleTAChange, handleFCChange, handleFRChange, handleTChange
    ,handleHistory1Change, handleHistory2Change, handleHistory3Change, handleHistory4Change, handleHistory5Change
    ,handleHistory6Change, handleHistory7Change, handleHistory8Change, handleCloseAlert
};