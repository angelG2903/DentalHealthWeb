import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Carousel } from 'react-responsive-carousel';
import ModalMessages from '@/components/ModalMessages';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for the carousel
import Image from 'next/image';
import logo1 from '@@/img/logo3.png';
import logo2 from '@@/img/logo4.png';
import logo3 from '@@/img/logo5.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [images, setImages] = useState([
    { src: logo1, alt: "Promoción 1" },
    { src: logo2, alt: "Promoción 2" },
    { src: logo3, alt: "Promoción 3" },
  ]); // Array con imágenes y descripciones

  const [isOpenMess, setIsOpenMess] = useState(false);

  const router = useRouter();



  return (
    <Layout>
    
      <div className="min-h-screen flex flex-col items-center justify-center py-4">

        {/* Título */}
        <h1 className="text-2xl font-bold mb-4">Tus promociones publicadas</h1>

        {/* Carrusel */}
        <div className="w-full max-w-96">
          {images.length > 0 ? (
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={3000}
              showArrows
            >
              {images.map((img, index) => (
                <div key={index}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    priority={true}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex justify-center items-center">
              <Image
                src={logo1}
                alt="Imagen de promoción por defecto"
                width={800}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>


      </div>

      {/* Botón de mensaje estático */}
      <button
        className="fixed bottom-20 right-10 bg-blue-500 text-white py-3.5 px-4 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setIsOpenMess(true)}
      >
        <FontAwesomeIcon
          icon={faMessage}
          size="lg"
          className={`cursor-pointer text-white`}
        />
      </button>

      <ModalMessages isOpen={isOpenMess} closeModal={() => setIsOpenMess(false)} />
    </Layout>
  );
};

export default Home;
