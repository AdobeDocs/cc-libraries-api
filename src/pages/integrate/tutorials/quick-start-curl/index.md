# Quick Start: cURL

Welcome to the Creative Cloud Libraries API!

In this Quick Start tutorial, we'll be walking you towards making your first API call via the cURL command-line tool. By the end you'll have constructed a command that looks like this:

```shell
curl --location --request GET \
  https://cc-libraries.adobe.io/api/v1/libraries \
  -H 'x-api-key: <CLIENT_ID_HERE>' \
  -H 'Authorization: Bearer <ACCESS_TOKEN_HERE>'
```

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

By starting with this basic cURL command, you'll have an idea of what's required to make `GET` requests to the Libraries API. From there, you can play with the command to make `GET` requests to different endpoints from the command line, or translate these concepts to your environment of choice, like Node.js or Python.

## Technology Used

- Command-line cURL

## Prerequisites

**Tutorials**

- [How to get your developer credentials](./how-to-get-your-developer-credentials.md)
- [How to get access tokens with OAuth](./tutorials/how-to-get-access-tokens-with-oauth.md)

**Assets**

- At least one Library associated with your Adobe ID.
- A terminal application for a UNIX-based system (like macOS, Linux, or Windows Subsystem for Linux)

## Development Steps

> **Info**
> Complete code for this plugin can be found [on GitHub](https://github.com/cc-libraries-api/code-samples/tree/master/quick-start-curl).

### 1. Create and run your cURL command

In our [How to get your developer credentials](./how-to-get-your-developer-credentials.md) tutorial, we showed you how to get your Client ID and user access token.

You can take both of those values and add them to their respective headers (`-H`) below. Don't include the angle brackets (`< >`) in your command:

```shell
curl --location --request GET \
  https://cc-libraries.adobe.io/api/v1/libraries \
  -H 'x-api-key: <CLIENT_ID_HERE>' \
  -H 'Authorization: Bearer <ACCESS_TOKEN_HERE>'
```

You're ready to make your first API call! Just paste this command into your terminal application and hit enter.

### 2. Get results

Since you've sent a `GET` request to the `/libraries` endpoint, you can probably guess that you're going to get back information about the libraries you have stored in Creative Cloud Libraries—and you're right!

The response will look something like this:

```json
{
  "total_count": 2,
  "libraries": [
    /* Your libraries here */
  ],
  "_links": {}
}
```

Always check [the references](https://cc-libraries-api.github.io/open-api/) for the full details on any request or response.

## Next Steps

- [Quick Start: Node.js](./quick-start-nodejs.md)

## Other Resources

- [Endpoint references](https://cc-libraries-api.github.io/open-api/)
