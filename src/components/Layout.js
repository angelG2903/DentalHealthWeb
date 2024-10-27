// components/Layout.js
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos de FontAwesome
config.autoAddCss = false; // Desactiva la adición automática de CSS (ya que estás importando los estilos manualmente)

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
