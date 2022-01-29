.PHONY: requirements.txt

venv:
	python3 -m venv /app/.venv
	pip install -U pip pip-tools wheel

pip-sync:
	pip-sync requirements.txt requirements.dev.txt

npm-ci:
	cd frontend; bash -c '[[ -f package-lock.json ]] && npm ci || npm i'; cd ..

install: venv pip-sync npm-ci

watch:
	cd frontend; npm run watch

run:
	# temporarily using --skip-checks because there seems to be a bug with the autoreloader
	# which is hanging up the system checks when checking on caches
	python manage.py runserver --skip-checks 0.0.0.0:8000

migrate:
	python manage.py migrate

setup-and-run: install migrate run

requirements.txt:
	pip-compile --generate-hashes --allow-unsafe --output-file requirements.txt requirements.in
	pip-compile --generate-hashes --allow-unsafe --output-file requirements.dev.txt requirements.dev.in

upgrade-requirements.txt:
	pip-compile --generate-hashes --upgrade --allow-unsafe --output-file requirements.txt requirements.in
	pip-compile --generate-hashes --upgrade --allow-unsafe --output-file requirements.dev.txt requirements.dev.in

# TODO: add in pre-commit python module and use these with that
djhtml:
	find . -path **/.venv -prune -o -path node_modules -prune -o -wholename '*/templates*.html' -exec djhtml -t2 -i '{}' +

djhtml-check:
	find . -path **/.venv -prune -o -path **/frontend/src -path node_modules -prune -o -wholename '*/templates*.html' -exec djhtml -t2 -c '{}' +

mypy:
	mypy .

pyupgrade:
	find ./ -path '**/.venv' -prune -o -path node_modules -prune -o -path '**/migrations' -prune -o -wholename '*/*.py' -exec pyupgrade --py310-plus '{}' +

django-upgrade:
	find . -path '**/.venv' -prune -o -path node_modules -prune -o -path '**/migrations' -prune -o -wholename '*/*.py' -exec django-upgrade --target-version=4.0 '{}' +

flake8:
	flake8 . --select=E9,F63,F7,F82 --show-source --exclude="documentation, .venv, node_modules, media, .parcel-cache, .git, __pycache__, staticfiles"
	flake8 --ignore=E501,E123,E126,E128,E124,E133,W503,E121 --max-line-length=120 --exclude="documentation, .venv, node_modules, media, .parcel-cache, .git, __pycache__, staticfiles, migrations" wyzplan/

isort-check:
	isort --check -q --sg **/migrations/* wyzplan/

lint: flake8 isort-check djhtml-check mypy

test:
	# Finding that django-cors-headers can cause problems reporting actual failures sometimes when using --parallel
	python manage.py test --keepdb --failfast --parallel
