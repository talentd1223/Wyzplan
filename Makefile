.PHONY: requirements.txt

dev:
	docker-compose run --service-ports --rm django /bin/bash

stop:
	docker compose down --remove-orphans

shell:
	docker compose exec django bash
