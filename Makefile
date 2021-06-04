.DEFAULT_GOAL := help

COMPOSE=docker-compose
PROJECT_PATH=/var/www/symfony

## -- MAKEFILE INFO --

## This help message
.PHONY: help
help:
	@printf "Usage: make <target>\n";

	@awk '{ \
		if ($$0 ~ /^.PHONY: [a-zA-Z\-\_0-9]+$$/) { \
			helpCommand = substr($$0, index($$0, ":") + 2); \
			if (helpMessage) { \
				printf "\033[36m%-20s\033[0m %s\n", \
					helpCommand, helpMessage; \
				helpMessage = ""; \
			} \
		} else if ($$0 ~ /^[a-zA-Z\-\_0-9.]+:/) { \
			helpCommand = substr($$0, 0, index($$0, ":")); \
			if (helpMessage) { \
				printf "\033[36m%-20s\033[0m %s\n", \
					helpCommand, helpMessage; \
				helpMessage = ""; \
			} \
		} else if ($$0 ~ /^##/) { \
			if (helpMessage) { \
				helpMessage = helpMessage"\n                     "substr($$0, 3); \
			} else { \
				helpMessage = substr($$0, 3); \
			} \
		} else { \
			if (helpMessage) { \
				print "\n                     "helpMessage"\n" \
			} \
			helpMessage = ""; \
		} \
	}' \
	$(MAKEFILE_LIST)

## -- DOCKER SETUP --

.PHONY: project-build project-start project-stop project-down project-destroy

## Build and start the project
project-build:
	docker-compose up --build -d

## Start the project
project-start:
	docker-compose up -d --no-recreate

## Stop the project
project-stop:
	docker-compose stop

## Stop the project and remove containers
project-down:
	docker-compose down --remove-orphans

## Completely remove the project (containers, images, volumes)
project-destroy:
	docker-compose down --rmi local --volumes --remove-orphans

## -- SHELL ACCESS --

.PHONY: sh-web sh-php sh-php-su sh-node

## Connect to the nginx container as uid 1000
sh-web:
	$(COMPOSE) exec -u 1000 nginx /bin/sh

## Connect to the php container as default user
sh-php:
	$(COMPOSE) exec php /bin/sh && "cd ${PROJECT_PATH}"

## Connect to the php container as root user
sh-php-su:
	$(COMPOSE) exec -u root php /bin/sh && "cd ${PROJECT_PATH}"

## Connect to the node container as uid 1000
sh-node:
	docker-compose exec -u 1000 node /bin/sh

## -- YARN --

.PHONY: assets-compile assets-compile-watch

## Compile assets once
assets-compile:
	docker-compose exec -u 1000 node yarn encore dev

## Recompile assets automatically when file change
assets-watch:
	docker-compose exec -u 1000 node yarn encore dev --watch