# syntax=docker/dockerfile:1.2

FROM python:3.9-slim-buster as python
FROM python as python-build-stage

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    # private dependencies
    git openssh-client \
    # psycopg2
    libpq-dev

RUN mkdir -p ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

COPY ./requirements .

RUN --mount=type=ssh pip wheel \
    --wheel-dir /usr/src/app/wheels \
    -r development.txt

FROM python as python-run-stage

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    build-essential \
    # translations
    gettext \
    # cleaning up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/src/app/wheels /wheels

RUN pip install --no-cache-dir --no-index \
    --find-links=/wheels /wheels/* \
    && rm -rf /wheels

RUN echo 'export PS1="🐳 \[\033[1;36m\]/\W\[\033[0;35m\] \[\033[0m\]"' >> ~/.bashrc

COPY ./docker/entrypoint /entrypoint
COPY ./docker/start /start

COPY . .

ENTRYPOINT ["/entrypoint"]
CMD ["/start"]
