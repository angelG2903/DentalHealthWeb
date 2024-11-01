// pages/index.js
import Cookies from 'js-cookie';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PrivacyNotice from '@/components/PrivacyNotice';
import { handleEmailChange, handlePasswordChange } from '@/utils/loginValidations';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    error: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors((prevErrors) => ({
      ...prevErrors,
      error: ''
    }));

    const formDataToSend = new FormData();

    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    const formDataObject = Object.fromEntries(formDataToSend.entries());
    console.log(formDataObject);


    try {

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Autenticación exitosa:', data);

        // Guardar el token en una cookie IMPORTANTE DESCOEMNETAR PARA PODER VERFICICAR BIEN LA AUTENTICACION
        Cookies.set('token', data.token, {
          expires: 30, // La cookie expira en 30 días
          secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
          sameSite: 'Strict', // Protege contra CSRF
        });


        router.push('/home');  // Redirigir al dashboard
      } else {
        console.log(JSON.stringify({ formDataToSend }));
        const errorData = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          error: errorData.error
        }));

      }
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        error: 'Hubo un problema con el servidor.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-11 rounded-lg shadow-md">
          <h2 className="text-2xl text-center mb-8">Bienvenido de nuevo</h2>

          {errors.error && <p className="text-red-500">{errors.error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleEmailChange(e, formData, setFormData, setErrors)}
              className={`mt-1 p-2 w-full border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="flex mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e, formData, setFormData, setErrors)}
              className={`mt-1 p-2 w-full border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`} />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>
          <Link href="/dashboard" className="text-blue-500 hover:underline float-end mb-4 text-sm underline">
            Olvidé mi contraseña
          </Link>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 focus:outline-none hover:bg-blue-600 focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-2 py-2.5 me-2 mb-2"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}

          </button>
          <p className="text-sm mt-1">
            ¿Cuentas con una cuenta?
            <Link href="/formUser" className="text-sm hover:underline ml-1 underline hover:text-blue-500">
              Registrarse
            </Link>
          </p>

        </form>
      </div>
    </Layout>
  );
};

export default Login;