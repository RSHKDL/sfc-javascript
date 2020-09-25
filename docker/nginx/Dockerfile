FROM alpine:3.12

LABEL maintainer="Julien Helfer <julien.helfer@mda-company.com>" \
      version="1.0.0" \
      description="This image start the nginx container"

RUN addgroup -S www-data \
    && adduser -S -G www-data www-data

RUN apk add --update nginx
RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

ADD nginx.conf /etc/nginx/
ADD symfony.conf /etc/nginx/conf.d/default.conf
RUN echo "upstream php-upstream { server php:9000; }" > /etc/nginx/conf.d/upstream.conf

EXPOSE 80

# Run nginx at the start of the container
CMD ["nginx"]