<p align="center">
  <a href="https://ap-south-1.console.aws.amazon.com/codesuite/codebuild/projects/postpay-js"><img src="https://codebuild.ap-south-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWll4MExHMWxqMkt4djdzSTRuQmpqTE54cTBSenpJeDVsZjdHTlVaTGZmL3ZmYWZlREQ0VzNWSjJKT1lWaVdhM05YdDl4dUVHa25EUWR1eUphT0RvdFZRPSIsIml2UGFyYW1ldGVyU3BlYyI6IlhHWWg5YTc3bGk5OW1xMHYiLCJtYXRlcmlhbFNldFNlcmlhbCI6Mn0%3D&branch=master" alt="CodeBuild" /></a>
</p>

# postpay-js

A Javascript client to integrate postpay components to your website.

## Quickstart

Create and configure the `.env` file:

```sh
cp .env.example .env
```

Install all dependencies for the project:

```sh
yarn
```

Run development server:

```sh
yarn dev
```

Build *dist* folder:

```sh
yarn run build
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

## Usage

Initialize postpay-js:

```js
postpay.init({
  merchantId: 'your merchant id',
  sandbox: true,
});
```

Open checkout modal:

```js
postpay.checkout('order id');
```

Postpay widget:

```html
<div
  class="postpay-widget"
  data-type="product"
  data-amount="12385"
  data-currency="AED"
></div>
```

Refresh widget:

```js
postpay.widget.refresh();
```
