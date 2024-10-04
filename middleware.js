// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Extraer las cookies del request
  const token = req.cookies.get('token');  // Acceder al token de autenticación

  // Si no hay token, redirigir al login
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Si el token está presente, continuar con la solicitud
  return NextResponse.next();
}

// Configurar las rutas protegidas
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],  // Proteger estas rutas
};
