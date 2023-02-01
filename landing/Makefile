# --- Docker
image_name := postpay/landing
container_name := landing
port ?= 8000

# --- App
NODE_ENV ?= staging

help:
	@echo "Please use `make <target>' where <target> is one of"
	@echo "  build          Build docker containers"
	@echo "  run            Run http-server"
	@echo "  export         Create out folder"
	@echo "  deploy         Deploy to \$$S3_BUCKET"

build:
	@docker build \
		--target build \
		--build-arg NODE_ENV=$(NODE_ENV) \
		-t $(image_name):build .
	@docker build -t $(image_name):latest .

build.if:
	@if [ "$$(docker images -q $(image_name):latest 2> /dev/null)" == "" ]; then \
		$(MAKE) -s build; \
	fi

run: build.if
	@docker run --rm -it \
		-v $(PWD)/components:/app/components \
		-v $(PWD)/constants:/app/constants \
		-v $(PWD)/helpers:/app/helpers \
		-v $(PWD)/pages:/app/pages \
		-v $(PWD)/services:/app/services \
		-v $(PWD)/static:/app/static \
		-p $(port):3000 \
		$(image_name)

export:
	@docker run -i \
		-v $(PWD)/out:/build/out \
		--name $(container_name) \
		$(image_name):build \
		/bin/sh -c 'yarn run export'

deploy:
	@./deploy.sh

ci: export deploy

.PHONY: help build run export deploy ci
