#!/usr/bin/env python
import os
import sys

import dotenv

# Configs for running coverage from https://adamj.eu/tech/2019/04/30/getting-a-django-application-to-100-percent-coverage/

if __name__ == "__main__":
    dotenv.load_dotenv()

    try:
        command = sys.argv[1]
    except IndexError:
        command = "help"

    running_tests = (command == 'test')

    if running_tests:
        os.environ["DJANGO_SETTINGS_MODULE"] = "config.settings.test"
        from coverage import Coverage
        cov = Coverage()
        cov.erase()
        cov.start()
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)

    if running_tests:
        cov.stop()
        cov.combine()
        cov.save()
        covered = cov.report()
        cov.erase()
        # Not sure if we want this. It needs to be kept in sync with our .coveragerc fail value
        # if covered < 80:
        #     sys.exit(1)
