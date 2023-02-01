, := ,

# --- Application
stage ?= dev
bucket_name := postpay-config
REQUIREMENTS_FILES ?= development

# --- Docker
image_name := postpay/api
docker_image := $(image_name):latest
lambda_image := $(image_name):lambda

# --- Compose
DOCKER_COMPOSE_FILE ?= docker-compose.yml
compose := docker-compose -f $(DOCKER_COMPOSE_FILE)
profile ?= api

ifneq (,$(wildcard development.yml))
	compose := $(compose) -f development.yml
endif

ifeq (,$(wildcard /.dockerenv))
	exec := $(compose) exec django
	tty := t
endif

# --- Django
manage := $(exec) python manage.py
django_locales := ar


help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo "  build          Build docker image"
	@echo "  up             Run the docker containers and build the images"
	@echo "  start          Restart docker containers"
	@echo "  rm             Remove docker containers"
	@echo "  logs           View output from docker containers"
	@echo "  sh             Run bash shell on the app container"
	@echo "  shell          Start the Python interactive interpreter"
	@echo "  check          Inspect the entire Django project for common problems"
	@echo "  migrate        Update database schema"
	@echo "  migration      Make migration and migrate shortcut"
	@echo "  static         Collect the static files into STATIC_ROOT"
	@echo "  po             Pull out all strings marked for translation"
	@echo "  mo             Compile .po files to .mo files"
	@echo "  cypher-shell   Run cypher shell on the neo4j container"
	@echo "  cypher-import  Import cypher data from a file"
	@echo "  requirements   Install pip requirements from \$$REQUIREMENTS_FILES variable"
	@echo "  upgrade        Upgrade pip requirements"
	@echo "  lambda         Build λ docker container"
	@echo "  zappa          Run zappa command (usage: make zappa cmd={command} stage={dev|prod})"
	@echo "  test           Run unit tests"
	@echo "  coverage       Run unit tests and measure code coverage"
	@echo "  flake8         Check the code syntax"
	@echo "  isort          Check isort recursively from the current directory"
	@echo "  bandit         Find common security issues"


rsa:
	@if [ ! -f "id_rsa" ]; then \
		aws s3 cp s3://$(bucket_name)/id_rsa.encrypted . && \
		aws kms decrypt \
			--ciphertext-blob fileb://id_rsa.encrypted \
			--output text \
			--query Plaintext | \
			base64 --decode > id_rsa && \
		rm id_rsa.encrypted; \
	fi

secrets:
	aws s3 sync s3://$(bucket_name)/api/$(stage)/secrets secrets

build: rsa
	@DOCKER_BUILDKIT=1 docker build \
		-t $(docker_image) \
		--ssh default=id_rsa .

build.if:
	@if [ "$$(docker images -q $(docker_image) 2> /dev/null)" = "" ]; then \
		$(MAKE) -s build; \
	fi

up: build.if
	@$(compose) --profile $(profile) up -d

start:
	@$(compose) restart $(services)

rm:
	@$(compose) rm -sf $(services)

logs:
	@$(compose) logs -f

sh:
	@$(exec) /bin/bash

shell:
	@$(manage) shell_plus --quiet-load

check:
	@$(manage) check

migrate:
	@$(manage) migrate

migration:
	@$(manage) makemigrations
	@$(manage) migrate

static:
	@$(manage) collectstatic --noinput

po:
	@for locale in $(subst $(,), ,$(django_locales)); do \
		$(manage) makemessages \
			-l $$locale \
			--extension=html,mjml,py,txt; \
	done

mo:
	@$(manage) compilemessages

cypher-shell:
	@$(compose) exec neo4j cypher-shell

cypher-import:
	@$(compose) exec neo4j bash -c 'cat import/$(file) | cypher-shell'

requirements:
	@for requirement in $(subst $(,), ,$(REQUIREMENTS_FILES)); do \
		$(exec) pip install -r requirements/$$requirement.txt; \
	done

upgrade:
	@pip-upgrade --skip-virtualenv-check requirements/*

lambda: rsa
	@DOCKER_BUILDKIT=1 docker build \
		-t $(lambda_image) \
		-f lambda/Dockerfile \
		--ssh default=id_rsa .

zappa:
	@docker run -i$(tty) --rm \
		-v $(PWD):/var/task \
		-v ~/.aws:/root/.aws \
		-e AWS_CONTAINER_CREDENTIALS_RELATIVE_URI=$(AWS_CONTAINER_CREDENTIALS_RELATIVE_URI) \
		$(lambda_image) zappa $(cmd) $(stage) $(options)

test.requirements:
	@if ! [ $(shell $(exec) which pytest) ]; then \
		REQUIREMENTS_FILES=test $(MAKE) -s requirements; \
	fi

test: test.requirements
	@$(exec) pytest

coverage: test.requirements
	@$(exec) pytest $(options) \
		--cov=postpay \
		--cov-report term \
		--cov-report xml

flake8: test.requirements
	@$(exec) flake8

isort: test.requirements
	@$(exec) isort -c .

bandit: test.requirements
	@$(exec) bandit -r .

lint: test.requirements
	@$(exec) black --check .

ci:
	@$(compose) up -d
	$(compose) exec -T django /bin/bash -c \
		'source /entrypoint && make coverage flake8 isort bandit mo lint'

.PHONY: help rsa secrets build build.if up start rm logs sh shell check migrate migration static po mo cypher-shell cypher-import requirements upgrade lambda zappa test.requirements test coverage flake8 isort bandit ci
