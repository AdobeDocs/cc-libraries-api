---
keywords:
  - Creative Cloud
  - API Documentation
  - JavaScript
  - CC Libraries API
  - Creative Cloud Libraries API
---

# Quick Start: Node.js

Welcome to the Creative Cloud Libraries API!

In this Quick Start tutorial, we'll be walking you towards making your first API call from a Node.js script. By the end you'll have a self-invoking function that makes a call to the Libraries API when you run the script.

This API call will return information about the libraries you have stored in Libraries:

```json
{
  "total_count": 2,
  "libraries": [
    /* Your libraries here */
  ],
  "_links": {}
}
```

By starting with this basic Node.js script, you'll have an idea of what's required to make `GET` requests to the Libraries API. From there, you can play with the script to make `GET` requests to different endpoints from Node.js, or translate these concepts to your environment of choice, with Node.js server frameworks like Express and beyond.

## Before you start

### Technology Used

- Node.js
- npm
- Axios

### Prerequisites

**Tutorials**

- [How to get your developer credentials](../../setup/developer-credentials/index.md)
- [How to get access tokens with OAuth](../../setup/oauth/index.md)

**Assets**

- At least one Library associated with your Adobe ID.
- A terminal application for a UNIX-based system (like macOS, Linux, or Windows Subsystem for Linux)

## Development Steps

> **Info**
> Complete code for this plugin can be found [on GitHub](https://github.com/AdobeDocs/cc-libraries-api-samples/tree/main/quick-start-nodejs).

### 1. Set up your environment variables

The Node.js script we create here will read environment variables from a `.env` file, so start by creating a file named `.env`:

```shell
touch .env
echo .env >> .gitignore # Don't track your .env file in version control
```

In our [How to get your developer credentials](../../setup/developer-credentials/index.md) tutorial, we showed you how to get your API key from the Adobe Developer Console and user access token from the OAuth 2.0 Playground. You can take both of those values and add them to their respective variables in the `.env` file as seen below. Don't include the angle brackets (`< >`) in your values:

```env
API_KEY=<CLIENT_ID_HERE>
ACCESS_TOKEN=<ACCESS_TOKEN_HERE>
```

Note that we are storing the access token as a value in an `.env` file for convience in getting started making API calls. Production integrations must support a proper [OAuth workflow](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) and should never store user access tokens this way. Always avoid sharing your token or committing it to a public repo.

### 2. Install dependencies

First, we'll create an npm package and install dependencies:

```shell
npm init -y
npm install --save axios dotenv
```

We'll use `axios` to make HTTP requests, and `dotenv` to read in our environement variables from the `.env` file we created in the previous step.

### 3. Create your JavaScript file and import your dependencies

Now we create the only JavaScript file we'll need for this basic script example:

```shell
touch index.js
```

At the top of this file, we import the two packages we installed in the previous step:

```javascript
require("dotenv").config(); // Read in your .env variables
const axios = require("axios");
```

Your environment variables will now be available on Node.js's `process.env` object.

### 4. Set up your request headers

We'll start by focusing on constructing the core API call.

First, we need to set up our headers:

```javascript
const options = {
  headers: {
    "x-api-key": process.env.API_KEY,
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
};
```

As you can see, we've created an `options` object with a `headers` property. The `headers` property contains key/value fields for our API key and user access token (which are read from Node.js's `process.env` object).

The structure of these options is defined by the `axios` module, which we'll use in the next step to set up our HTTP request.

### 5. Set up your API call

Now all we need to do is write the request itself. We'll do this with the `axios` module:

```javascript
const response = await axios.get(
  "https://cc-libraries.adobe.io/api/v1/libraries/",
  options
);
```

Here, we're making a GET request, passing in the endpoint (`https://cc-libraries.adobe.io/api/v1/libraries/`), and the `options` object containing our headers.

The `axios` module returns promises, so we can opt for async/await syntax, or then/catch chains. Either is fine, but since we've opted for async/await, we'll need to wrap this call in an `async` function in the next step (unless you're using Node.js 14.3.0 or above, where top-level `await` is supported).

### 6. Bring it all together

This is the last step, where we'll embellish on the basic setup we've done so far:

```javascript
// Wrap everything in a self-invoking async function
(async () => {
  // Set up your request headers
  const options = {
    headers: {
      "x-api-key": process.env.API_KEY,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    // Make your API call
    const response = await axios.get(baseURL, options);
    console.log(response.data);
  } catch (error) {
    // Catch errors
    console.log(error.toJSON());
  }
})();
```

A success response will look something like this:

```json
{
  "total_count": 2,
  "libraries": [
    /* Your libraries here */
  ],
  "_links": {}
}
```

Always check [the references](/api/) for the full details on any request or response.
