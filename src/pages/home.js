import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Carousel } from 'react-responsive-carousel';
import ModalMessages from '@/components/ModalMessages';
import ModalContact from "@/components/ModalContact";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for the carousel
import Image from 'next/image';
/* import logo1 from '@@/img/logo3.png';
import logo2 from '@@/img/logo4.png'; */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token; // Obtén el token desde las cookies

  if (!token) {
    // Si no hay token, redirige al login
    return {
      redirect: {
        destination: '/',
        permanent: false, // Redirección temporal
      },
    };
  }

  try {
    // Decodifica el token para verificar su validez
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener una clave secreta configurada

    // Si el token es válido, permite el acceso
    return {
      props: {},
    };
  } catch (error) {
    // Si el token es inválido o ha caducado, redirige al login
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState(null); // Estado para almacenar los datos
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenMess, setIsOpenMess] = useState(false);
  const [isOpenContacts, setIsOpenContacts] = useState(false);

  useEffect(() => {
    // Función para hacer la solicitud GET
    const fetchData = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/promotion/get`); // URL de la API
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json(); // Convierte la respuesta en un objeto JSON
            setData(data); // Guarda los datos en el estado
        } catch (error) {
            setError(error.message); // Guarda el error en el estado
        } finally {
            setLoading(false); // Oculta el indicador de carga
        }
    };
    
    fetchData(); // Llama a la función fetchData cuando se monta el componente
}, []);



  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

        {/* Título */}
        <h1 className="text-2xl font-bold mb-4">Tus promociones publicadas</h1>

        {/* Carrusel */}
        {loading ? (
          <div className="flex justify-center items-center h-56">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ): (
          <div className="w-full max-w-96 md:max-w-xl">
            {data.length > 0 ? (
              <Carousel
                showStatus={false}
                showThumbs={false}
                infiniteLoop
                autoPlay
                interval={3000}
                showArrows
                showIndicators={false}
              >
                {data.map((promotion, index) => (
                  <div key={index} className="flex flex-col bg-white rounded-xl overflow-hidden">
                    {/* Imagen */}
                    <div className="relative w-full max-h-full overflow-hidden bg-gray-200">
                      <Image
                        src={promotion.promotionalImageUrl || "/img/logo4.png"} // Usa una imagen por defecto si no hay src
                        alt={"Imagen por defecto"}
                        width={16}
                        height={9}
                        priority={true}
                        layout="responsive"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Card content */}
                    <div className="p-4">
                      {/* Título */}
                      <h3 className="text-xl font-bold text-gray-800 break-words w-full">{promotion.title || "Título por defecto"}</h3>
                      {/* Descripción */}
                      <p className="text-gray-600 mt-2 break-words w-full">{promotion.description || "Descripción por defecto"}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="flex justify-center items-center">
                <Image
                  src={"/img/Logo3.png"}
                  alt="Imagen de promoción por defecto"
                  width={16}
                  height={9}
                  className="rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}



      </div>

      {/* Botón de mensaje estático */}
      <button
        className="fixed bottom-20 right-10 bg-blue-500 text-white py-3.5 px-4 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setIsOpenContacts(true)}
      >
        <FontAwesomeIcon
          icon={faMessage}
          size="lg"
          className={`cursor-pointer text-white`}
        />
      </button>

      <ModalMessages isOpen={isOpenMess} closeModal={() => setIsOpenMess(false)} />
        
      <ModalContact isOpen={isOpenContacts} closeModal={() => setIsOpenContacts(false)}/>
    </Layout>
  );
};

export default Home;
