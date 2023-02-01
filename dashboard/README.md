<p align="center">
  <a href="https://ap-south-1.console.aws.amazon.com/codesuite/codebuild/projects/dashboard"><img src="https://codebuild.ap-south-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiSHZ4WitCL3U2WWo5eHBZdjZSOEVhWHUyWnQwZW9uQiszTnBSRjgvUVNOaEY2SndGbVNsalBaS01jODVnZFBEcnY4YWN0UEJ5ZHp3L0VKT1JYQkU1NEJjPSIsIml2UGFyYW1ldGVyU3BlYyI6InpiZTJHKzB1SGpIc1IzVUsiLCJtYXRlcmlhbFNldFNlcmlhbCI6Mn0%3D&branch=master" alt="CodeBuild" /></a>
</p>

# Postpay Dashboard

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
# Postpay-Dashboard
