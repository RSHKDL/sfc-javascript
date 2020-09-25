FROM php:7.4-fpm-alpine

LABEL maintainer="Julien Helfer <julien.helfer@mda-company.com>" \
      version="1.0.0" \
      description="This image start the web container"

# Install some packages we need using Alpine Linux package management
RUN apk add --update \
    make \
    curl

# Type docker-php-ext-install to see available extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    ln -s $(composer config --global home) /root/composer
ENV PATH=$PATH:/root/composer/vendor/bin COMPOSER_ALLOW_SUPERUSER=1

ADD php.ini /etc/php/conf.d/
ADD php.ini /etc/php/cli/conf.d/
ADD php-fpm.conf /etc/php/php-fpm.d/

WORKDIR /var/www/symfony

EXPOSE 9000

# Run php-fpm in the foreground at the start of the container
CMD ["php-fpm", "-F"]