import logging
import time
from contextlib import ContextDecorator

import structlog

log = structlog.getLogger(__name__)


# TODO: A similar decorator using cProfile: https://docs.python.org/3/library/profile.html#the-python-profilers
# yes, class but all lowercase. This is normal for context decorators.
class log_execution_time(ContextDecorator):
    """
    A context processor and decorator for logging timings. May not work nested yet.

    logger = logging.getLogger(__name__)
    @log_execution_time('my_func', logger, logging.DEBUG)
    def my_func():
        print('Doing things')
    def func_with_statement():
        print('Did some stuff')
        with log_execution_time('func_with_statement.section', logger, logging.DEBUG)
            print('doing more stuff')
        print('and more stuff.')
    """

    def __init__(self, name: str, logger: logging.Logger = None, log_level: int = logging.DEBUG, *args, **kwargs):
        self.name = name
        self.start_time = None
        self.end_time = None
        self.log_level = log_level
        self.logger = logger if logger else logging.getLogger('execution_timing')
        super().__init__(*args, **kwargs)

    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, *exc):
        self.end_time = time.time()
        self.logger.log(
            self.log_level,
            'Timing log for %s: started: %.6f; finished: %6f; total: %s.6f seconds',
            self.name,
            self.start_time,
            self.end_time,
            self.end_time - self.start_time,
        )
        return False
