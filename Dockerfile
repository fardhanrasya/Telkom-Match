# Menggunakan image Node.js untuk build tahap awal
FROM node:18 AS build-stage

# Set working directory untuk build
WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive
# Copy file package.json dan package-lock.json untuk menginstal dependencies
COPY package*.json ./

# Instal dependencies
RUN npm install

# Copy semua file project ke dalam container
COPY . .

# Build aplikasi menggunakan npm
RUN npm run build

# Tahap akhir menggunakan image Apache
FROM httpd:2.4

# Copy hasil build dari tahap sebelumnya ke direktori Apache
COPY --from=build-stage /app/build/ /usr/local/apache2/htdocs/

# Expose port 80 untuk Apache
EXPOSE 80

# Jalankan Apache di foreground
CMD ["httpd-foreground"]

