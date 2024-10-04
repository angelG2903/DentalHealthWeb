// pages/index.js
import Cookies from 'js-cookie';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PrivacyNotice from '@/components/PrivacyNotice';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Limpiar error previo

    try {

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Autenticación exitosa:', data);
        
        // Guardar el token en una cookie
        Cookies.set('token', data.token, {
          expires: 7, // La cookie expira en 7 días
          secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
          sameSite: 'Strict', // Protege contra CSRF
        });
        

        router.push('/dashboard');  // Redirigir al dashboard
      } else {
        const errorData = await res.json();
        setError(errorData.error);  // Mostrar mensaje de error
      }
    } catch (err) {
      setError('Hubo un problema con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-11 rounded-lg shadow-md">
          <h2 className="text-2xl text-center mb-8">Bienvenido de nuevo</h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="mt-1 p-2 w-full border rounded" />
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