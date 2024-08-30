# Etapa 1: Construcción
FROM node:16-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copia los archivos de la aplicación construida desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]