# Gunakan image resmi PHP dengan Apache
FROM php:8.1-apache-buster

# Install ekstensi yang diperlukan
RUN docker-php-ext-install pdo_mysql

# Aktifkan mod_rewrite untuk Apache
RUN a2enmod rewrite

# Instalasi Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Pindahkan ke direktori kerja proyek
WORKDIR /var/www/html

# Salin file composer.json dan composer.lock terlebih dahulu
COPY composer.json composer.lock /var/www/html/

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && \
    apt-get install -y zip unzip

# Install dependensi PHP menggunakan Composer
RUN composer install --no-scripts --no-autoloader --ignore-platform-reqs

# Salin seluruh proyek ke dalam kontainer
COPY . /var/www/html/

# Buat autoload dan optimize Composer
RUN composer dump-autoload --optimize

# Salin konfigurasi Apache
COPY docker/apache2.conf /etc/apache2/sites-available/000-default.conf

# Install Node.js dan npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm

# Hapus versi Node.js yang tidak didukung
RUN npm cache clean -f
RUN npm install -g n
RUN n stable


# Install dependensi JavaScript
RUN npm install

# Compile aset JavaScript menggunakan Laravel Mix
# RUN npm run build
EXPOSE 3000

# Set hak akses untuk storage dan bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Jalankan migrasi dan seeder
RUN php artisan migrate:fresh --seed --force

# Jalankan queue:work dan npm run dev dalam latar belakang
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000 & php artisan queue:work --tries=3 & npm run dev"]