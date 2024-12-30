# Guía de despliegue

# Requisitos previos

1. Tener instalado:
   - Docker y Docker Compose.
2. La API del backend debe estar corriendo y accesible.

# Archivos necesarios

- Dockerfile
- docker-compose.yml
- nginx.conf

# Pasos para desplegar

1. Configurar el Backend en el Frontend:
   - Asegúrate de que la variable REACT_APP_API_URL apunte al backend.
2. Construir y ejecutar los Contenedores desde la raíz del proyecto:
   docker-compose up --build
3. Verificar el despliegue
   - Acceder a la aplicación en el navegador: http://localhost:3000 (cambiar por la url del servidor donde se realice el despliegue)
