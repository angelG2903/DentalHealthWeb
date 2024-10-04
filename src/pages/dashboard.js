// pages/dashboard.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import axios from 'axios';


const Dashboard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // Si no hay token, redirigir al login
      router.push('/');
    } else {
      // Obtener datos del usuario con el token
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      axios.get(`${apiUrl}/api/auth/userInfo`, { withCredentials: true })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la información del usuario', error);
          // Redirigir al login si hay un error (por ejemplo, token inválido)
          router.push('/');
        });
    }
  }, [router]);

  if (!userInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <div>
        <h1>Bienvenido al Dashboard</h1>
        <p>ID de Usuario: {userInfo.loginId}</p>
        <p>ID de Usuario: {userInfo.role}</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
