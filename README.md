# Wyzplan

System Architecture and Technical Requirements: https://mobelux.atlassian.net/l/c/uCGSQa0A

## Initial Startup
When the project is first created:

* `make dev`
* `make venv`
* `make requirements.txt`
* `make install`
* `python manage.py makemigrations`

The final `python manage.py makemigrations` is to create the db migrations for the `accounts` app.

## Development
WHen developing after initial creation

* `make dev`
* `make install`
* `make migrate`

From this point all standard django management commands are available. Additionally `make run` is available to start the dev server and listen on correct interfaces and ports.

You will also likely want another shell building the front end React app

* Open another terminal
* `make shell`
* `make watch`

### Pre-commit steps

#### djhtml
`djhtml` is intended to be made into an automatic git pre-commit hook, but until then we can easily run it manually.

* run `make djhtml` to ensure all Django templates are formatted
* Review the changes

#### Linters and static analysis

* Run `make lint` which run checks using flake8, djhtml, isort, and mypy to report any issues

### Updating Python Dependencies
* Update `requirements.in` or `requirements.dev.in` to add a new dependency or update version specifications
* `make requirements.txt` to make new `requirements.txt` and `requirements.dev.txt` which add new dependencies but do not update anything which is currently installed.
* `make upgrade-requirements.txt` to build new requirements files and update any already installed requirements to the latest version allowed by version pinning.

### Test cases
* ```manage.py test --parallel```.  Add `--keepdb` to speed things up if you do not need to start with a fresh db schema
* ```coverage run --source="." manage.py test --keepdb```: Runs the above tests but also Records code coverage statistics for test cases
* ```coverage report -m --skip-covered```: Show code coverage report for files which are not 100% covered
* ```coverage html```: Generates an HTML report in `./coverage_html_report/`, although less detailed than `coverage report -m`


# Heroku Deployment

## Development

* Run tests and linters locally
  * Hint: `make lint` for the linters
* Create Pull Request to merge the desired feature branch into `main`
* Review changes on pull request
* Wait for tests on current feature branch to pass on CI
* Request review from another developer
* Merge feature branch into `main`
* Github Actions will run tests again on `main`
* Github Actions will deploy images to the heroku development pipeline

## UAT / Staging
* Create a branch names `release-YYYYMMDD.N` from `main` where `N` is a number starting with 1. This will allow for multiple release branches per day. If a release branch is being updated which has not yet been deployed to production then we do not need to create a new branch, changes may be merged into the current staging release branch.
* Github Actions will run tests and linters, build the image, and deploy to the heroku staging pipeline app

## Production
* Validate on the staging/uat environment
* Run manual `Deploy To Production` workflow on the current release branch
* GitHub Actions will pull current image from the staging/uat environment and push it to the production environment
