# Usa la imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
