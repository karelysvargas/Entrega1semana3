# Etapa 1: Construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar todo el código fuente del proyecto
COPY . .

# Compilar la aplicación para producción (genera la carpeta dist/)
RUN npm run build

# Etapa 2: Servidor web ligero de producción con Nginx
FROM nginx:alpine

# Configuración de Nginx para Single Page Application (SPA)
# Redirige rutas a index.html para evitar errores 404
RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    error_page 500 502 503 504 /50x.html;\n\
    location = /50x.html {\n\
        root /usr/share/nginx/html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto estándar HTTP
EXPOSE 80

# Iniciar el servidor Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
