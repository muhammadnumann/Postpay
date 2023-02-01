<p align="center">
  <a href="https://ap-south-1.console.aws.amazon.com/codesuite/codebuild/projects/checkout"><img src="https://codebuild.ap-south-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoibkIvTXZDaE1sMWZIckxtOFREVXkvSCtVdFpzeVVEY2ZsSmsvaHo5R1U1TDh3bFREZi9uaVhpekdqdFVyV1M5NlFEYWpjUFM5ODlITnFQU1NmNm4yampJPSIsIml2UGFyYW1ldGVyU3BlYyI6IjRQaG5Td2hvZFJGbGhnay8iLCJtYXRlcmlhbFNldFNlcmlhbCI6Mn0%3D&branch=master" alt="CodeBuild" /></a>
</p>


# Postpay Checkout

## Stack

- React
- GraphQL
- Apollo
- Typescript
- styled-components

## Quickstart

Create the `.env` file:

```sh
cp .env.example .env
```

Install all dependencies for the project:

```sh
yarn
```

Run development server:

```sh
yarn start
```

Add new GraphQL query:

```sh
yarn run gen:graphql
```

## Docker

Run development server:

```sh
make run
```

Copy *dist* folder from docker container:

```sh
make dist
```

## Developers

- David Tran (david@postpay.io)
