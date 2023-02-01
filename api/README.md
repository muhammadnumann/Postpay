<p align="center">
  <a href="https://ap-south-1.console.aws.amazon.com/codesuite/codebuild/projects/api"><img src="https://codebuild.ap-south-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiejhXcXNOL3F3MVJoVnllQ2s1bERCaSsyK2lFQ0FqSmhXa0I4YVJMc2ZHK3JuOEl4SFVFMGdaSlBwLzhNdUx2MlIxM0pWU3F2cTVJUmtBWnF0bTQ1NFZJPSIsIml2UGFyYW1ldGVyU3BlYyI6IkgwaHhJV0ZXTXpkVkIvdmsiLCJtYXRlcmlhbFNldFNlcmlhbCI6Mn0%3D&branch=main" alt="CodeBuild" /></a> <a href="https://app.codacy.com/app/mongkok/api/issues/index"><img src="https://api.codacy.com/project/badge/Grade/8d1a1ad985ff4988b725d4cd7f7a3b4c" alt="Codacy" /></a> <a href="https://app.codacy.com/project/mongkok/api/dashboard"><img src="https://api.codacy.com/project/badge/Coverage/8d1a1ad985ff4988b725d4cd7f7a3b4c" alt="Coverage" /></a>
</p>


# PostPay API

Application that make up the official PostPay API.

## Requirements

*   [Docker 18.09+](https://docs.docker.com/install/)

## Configure your Application

Create and configure the `.envs` directory.

🐣 Build the local environment:

```sh
make up
```

## AWS Lambda Deployment

Install [AWS Command Line Interface](https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-install.html) and configure the aws default profile:

```sh
pip install awscli --upgrade --user
aws configure
```

🐣 Build the λ docker container:

```sh
make lambda
```

🚀 Here we go!

```sh
make zappa cmd=deploy
```

### Commands

```sh
make help
```

```text
Please use 'make <target>' where <target> is one of
  build          Build docker image
  up             Run the docker containers and build the images
  start          Restart docker containers
  rm             Remove docker containers
  logs           View output from docker containers
  sh             Run bash shell on the app container
  shell          Start the Python interactive interpreter
  check          Inspect the entire Django project for common problems
  migrate        Update database schema
  migration      Make migration and migrate shortcut
  static         Collect the static files into STATIC_ROOT
  po             Pull out all strings marked for translation
  mo             Compile .po files to .mo files
  cypher-shell   Run cypher shell on the neo4j container
  cypher-import  Import cypher data from a file
  requirements   Install pip requirements from $REQUIREMENTS_FILES variable
  upgrade        Upgrade pip requirements
  lambda         Build λ docker container
  zappa          Run zappa command (usage: make zappa cmd={command} stage={dev|prod})
  test           Run unit tests
  coverage       Run unit tests and measure code coverage
  flake8         Check the code syntax
  isort          Check isort recursively from the current directory
  bandit         Find common security issues
```
"# Postpay-APi" 
# Postpay-APi
