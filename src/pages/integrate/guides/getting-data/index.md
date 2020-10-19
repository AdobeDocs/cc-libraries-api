# Getting Library and Element Data

Any integration with the Libraries API will involve reading information about a user's stored libraries and elements.

For example, you may want answers to questions like:

- What libraries or elements were created in the last week?
- What is the name of each element in a given library?
- Where is the thumbnail for a given library element?

As you might imagine, you can accomplish all of this and much more with `GET` requests to the Libraries API.

Depending on your use case, you may prefer to make your Libraries API calls from the client or from your server. In this tutorial, we're going to focus on how to make calls from your server with Node.js and Express.

In each step, we'll set up an Express route to make an API call and talk a little about the response we get. The accompanying sample repo will embellish slightly on what we cover here by making simple use of the API responses in the browser.

Reading through this tutorial will give you a simple jumping off point for learning more about our `GET` endpoints in the API references.

## Before you start

### Technology Used

- Node.js
- npm
- Express
- Axios

### Prerequisites

- [How to get your developer credentials](./how-to-get-your-developer-credentials.md)
- [How to get access tokens with OAuth](./tutorials/how-to-get-access-tokens-with-oauth.md)
- [Quick Start: Node.js](./quick-start-nodejs.md)

## Development Steps

> **Info**
> Complete code for this tutorial can be found [on GitHub](https://github.com/cc-libraries-api/code-samples/tree/master/getting-data-nodejs).

### 1. Bootstrap an Express app

We'll start by using `express-generator`, a scaffolding tool provided by Express, a popular server-side framework for Node.js. In your terminal, create your project:

```shell
npx express-generator --ejs --git myapp
```

> **Info**
> You can learn more about `express-generator` in [their docs](https://expressjs.com/en/starter/generator.html). For our purposes here, this is all we need to do before digging in.

Then navigate to your new project, install dependencies, and start your app:

```shell
cd myapp
npm install --save axios dotenv
touch .env
npm start
```

> **Info**
> For setting up your `.env` file, see the ["Set up your environment variables" section](https://github.com/cc-libraries-api/api-docs/blob/master/tutorials/quick-start-nodejs.md#1-set-up-your-environment-variables) in our _Quick Start: Node.js_ tutorial.

In your browser, if you navigate to `localhost:3000`, you'll see the default home page created by `express-generator`. (We won't be working with UI in this tutorial, but the accompanying sample repo makes very basic use of the API responses in the browser.)

### 2. Get metadata about your user's Libraries

We'll get started with the Libraries API by getting a top-level view of the libraries that the user has stored.

**Creating the route**

In the app we just generated, we'll create a new route in the `routes/index.js` file:

```javascript
require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios"); // Be sure to require axios

const baseURL = "https://cc-libraries.adobe.io/api/v1/libraries";

// The default GET route provided by express-generator
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Creative Cloud Libraries API" });
});

// Our new route
router.get("/cc-libraries/data", async (req, res, next) => {
  const options = {
    headers: {
      "x-api-key": process.env.API_KEY,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(baseURL, options);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
```

> **Info**
> Above this route, we've also set the `baseURL` variable. We'll use this variable in other routes later on, so make sure you've set it outside of the route as you see above.

**What it does**

The heart of the `"/cc-libraries/data"` route is where we make the API call (for this example, we're using the `axios` module for making HTTP requests):

```javascript
const response = await axios.get(baseURL, options);
res.json(response.data);
```

If everything goes well, we'll get a response from the Libraries API that contains JSON data (in this example, within `response.data`) that we return to the browser.

**Try it out**

You can access this endpoint by navigating your browser to:

```shell
http://localhost:3000/cc-libraries/data
```

The response will look something like this:

```json
{
  "total_count": 2,
  "libraries": [
    /* Your libraries here */
  ]
}
```

The `libraries` array contains a JSON object full of metadata related to each of your user's Libraries. Each object in this array will have a unique `id` property for that specific library:

```json
{
  "id": "AAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
  "name": "My Libraray",
  "created_date": 1565044330560,
  "modified_date": 1568329791348
  /* More library metadata */
}
```

Go ahead and copy an `id` from one of your libraries. We'll use it in the next step.

### 3. Get metadata for elements in a specific Library

Next we'll get a list of elements contained in a given library.

**Creating the route**

Back in `routes/index.js`, we'll create a route for retreiving metadata for a specific Library's elements:

```javascript
router.get("/cc-libraries/data/:libraryId", async (req, res, next) => {
  const { libraryId } = req.params;

  const options = {
    headers: {
      "x-api-key": process.env.API_KEY,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(
      `${baseURL}/${libraryId}/elements`,
      options
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
```

**What it does**

Our route above takes a `libraryId` parameter. This parameter is then used to create the Libraries API endpoint we want to call:

```javascript
`${baseURL}/${libraryId}/elements`;
// Or, https://cc-libraries.adobe.io/api/v1/libraries/AAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA/elements
```

As in the first route, we use the `axios` module to make the HTTP request. If the request is successful, we get a JSON object from the Libraries API that we send back to the browser.

**Try it out**

You can access this endpoint by navigating your browser to this URL (be sure to swap in the library ID you copied in the previous step):

```shell
http://localhost:3000/cc-libraries/data/AAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA
```

The response will look something like this:

```json
{
  "total_count": 60,
  "elements": [
    /* Library elements here */
  ]
}
```

The `elements` array contains a JSON object full of metadata related to each of the elements stored in a given Library:

```json
{
  "id": "BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBB",
  "name": "An Element Name",
  "created_date": 1565044330560,
  "modified_date": 1568329791348,
  "type": "application/vnd.adobe.element.pattern+dcx",
  "thumbnail": {},
  "groups": [],
  "assetSubType": "element"
}
```

> **Info**
> It's worth noting that if you already have a specific element ID that you want metadata for, you can request it directly using the element ID (e.g., `${baseURL}/${libraryId}/elements/${elementId}`). See the endpoint references for more details.

### 4. Getting image renditions and thumbnails

Next we'll get an image rendition for a specific element.

**Creating the route**

Back in `routes/index.js`, we'll create a route for retreiving an image representation of a Library element:

```javascript
router.get("/cc-libraries/image", async (req, res, next) => {
  let { url } = req.query;
  url = url.slice(0, url.lastIndexOf("/")); // See the Info box below

  const options = {
    responseType: "arraybuffer",
    headers: {
      "x-api-key": process.env.API_KEY,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    const dataUrl = getBase64dataUrl(response);

    res.set("Content-Type", response.headers["content-type"]);
    res.set("Content-Length", response.headers["content-length"]);
    res.send(dataUrl);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

const getBase64dataUrl = (response) => {
  const base64flag = `data:${response.headers["content-type"]};base64,`;
  const base64string = Buffer.from(response.data, "binary").toString("base64");

  return `${base64flag}${base64string}`;
};
```

> **Info**
> Note that above, for simplicity we are naively slicing off from the `url` query the rendition argument the Libraries API provides by default, which is `:rendition;size=200`. Slicing this off gives you a full-size image, which in many cases may not be ideal due to size. If you have a specific size in mind, you can change `200` to another value, or keep the query in tact.

**What it does**

Our route above takes a `url` query (`/cc-libraries/image?url=https://url-here`). The value of this query (which is the element's thumbnail URL we copied in the previous step) is then used to call the Adobe storage service:

```javascript
const response = await axios.get(url, options);
```

Again, we use the `axios` module to make the HTTP request. If the request is successful, we receive image data that we can do further work with.

> **Info**
> Note that, unlike in our previous routes, here we are not using the Libraries API `baseURL` variable that we defined earlier. Images come from another service which we will call directly.

The route will then transform the response data from an array buffer to a base64 data URL (`dataUrl`) that can be used as the `src` of an image element in the browser. This step is just for the purpose of demonstration; you might have other uses for the image data.

**Try it out**

You can access this endpoint by navigating your browser to this URL (be sure to swap in the thumbnail URL you copied in the previous step):

```shell
http://localhost:3000/cc-libraries/image?url=https://url-here
```

Your browser will receive a base64 string representing the image data. Since we haven't set up an image element to display the image data, you'll need to have a look in your browser's developer tools to see the data. In Chome DevTools for example, you can find the data string in the _Sources_ tab, under _top > localhost:{port} > cc-libraries > image?url=https://url-here_:

```base64
data:image/jpeg;base64,base64stringhere...
```

If we wanted to display the image, this base64 data URL (`dataUrl`) could be used as the `src` of an image element. In fact, the accompanying sample repo does this if it's something you're interested in seeing.

## Next Steps

- [Creating Library Elements](./tutorials/creating-library-elements.md)

## Other Resources

- [Endpoint references](https://cc-libraries-api.github.io/open-api/)
