# Aplicación en Node.js con Docker

Este proyecto utiliza Docker para construir y ejecutar una aplicación en Node.js. La configuración del contenedor se basa en la imagen `node:16` y se estructura para instalar las dependencias y ejecutar la aplicación en un entorno aislado.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina local:

- [Docker](https://www.docker.com/get-started) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (opcional, si deseas administrar múltiples servicios)

## Configuración del Dockerfile

El Dockerfile en este proyecto ejecuta los siguientes pasos:

1. **Usa una imagen base**:
    - Usa `node:16` como imagen base.

2. **Establece el directorio de trabajo**:
    - Configura `/app` como el directorio de trabajo dentro del contenedor.

3. **Instala dependencias**:
    - Copia `package.json` y `package-lock.json` al contenedor.
    - Ejecuta `npm install` para instalar todas las dependencias.

4. **Copia el código de la aplicación**:
    - Copia el resto de los archivos al directorio de trabajo.

5. **Expone el puerto**:
    - Expone el puerto `3000` para que la aplicación esté disponible externamente.

6. **Inicia la aplicación**:
    - Ejecuta el comando `npm run dev` para iniciar la aplicación en modo de desarrollo.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local.
2. En la raíz del proyecto, ejecuta el siguiente comando para construir la imagen de Docker:

   ```bash
   docker build -t nombre-de-tu-imagen .
