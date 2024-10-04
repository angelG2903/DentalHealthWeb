import logo from '@@/img/logo.svg';
import Image from 'next/image';
// components/Header.js
const Header = () => {
    return (
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 h-32 md:h-40">
      {/* Wavy background */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#2D82EE", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#1A4A88", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            fillOpacity="1"
            d="M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,197.3C1120,181,1280,203,1360,213.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Logo in the center */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="rounded-full shadow-lg">
          <Image
            src={logo} // Replace with your logo path
            alt="Dental Health Logo"
            width={120}
            priority={true}
            className="rounded-full"
          />
        </div>
      </div>
      </header>
    );
  };
  
  export default Header;
  