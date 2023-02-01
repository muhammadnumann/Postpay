# --- Docker
image_name := postpay/dashboard
container_name := dashboard
port ?= 8000

help:
	@echo "Please use `make <target>' where <target> is one of"
	@echo "  build          Build docker containers"
	@echo "  run            Run http-server"
	@echo "  dist           Copy dist files from docker container"
	@echo "  deploy         Deploy to \$$S3_BUCKET"

env:
	@aws s3 cp s3://$(S3_BUCKET)/.env .

build:
	@docker build --target build -t $(image_name):build .
	@docker build -t $(image_name):latest .

build.if:
	@if [ "$$(docker images -q $(image_name):latest 2> /dev/null)" == "" ]; then \
		$(MAKE) -s build; \
	fi

run: build.if
	@docker run --rm -it \
		-v $(PWD)/schema:/app/schema \
		-v $(PWD)/src:/app/src \
		-v $(PWD)/types:/app/types \
		-v $(PWD)/webpack:/app/webpack \
		-p $(port):4000 \
		--env-file=.env \
		$(image_name)

dist:
	@docker create -it --name $(container_name) $(image_name):build bash
	@docker cp $(container_name):/build/dist .
	@docker rm -f $(container_name)

deploy:
	@./deploy.sh

ci: env build dist deploy

.PHONY: help env build run dist deploy ci
