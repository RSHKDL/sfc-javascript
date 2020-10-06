# Symfony with Docker

This is a complete stack for running a Symfony 4 LTS project with Docker.

## Requirements

TODO

## Stack

- PHP 7.4
- NGINX
- MySQL 8
- Symfony 4.4 LTS
- Webpack encore

The images are build upon [Alpine Linux](https://alpinelinux.org/). If you want to
update the Dockerfiles, you may need to refer to the Alpine Linux documentation.

## Installation

1. Clone this repository.

    `git clone git@github.com:RSHKDL/docker-symfony.git`

2. Create your docker-compose.

    `cp docker-compose.yml.dist docker-compose.yml`

3. Replace the `<variables>` with your own values.

4. TODO

## Tests

- Connect to php container : `make sh-php`
- Execute all tests suite : `bin\phpunit`
- Check your version : `bin\phpunit -v`

On first use, Phpunit will download all dependencies. More information about Phpunit can be found
on the [Phpunit documentation](https://phpunit.readthedocs.io/en/7.5/) (version dependent)
or on the [Symfony documentation](https://symfony.com/doc/4.4/testing.html).