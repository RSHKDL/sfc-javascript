# Symfony with Docker

This is a complete stack for running a Symfony 4 LTS project into Docker containers.

## Requirements

TODO

## Installation

TODO

## Tests

- Connect to php container : `make sh-php`
- Execute all tests suite : `bin\phpunit`
- Check your version : `bin\phpunit -v`

On first use, Phpunit will download all dependencies. More information about Phpunit can be found
on the [Phpunit documentation](https://phpunit.readthedocs.io/en/7.5/) (version dependent)
or on the [Symfony documentation](https://symfony.com/doc/4.4/testing.html).