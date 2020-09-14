# How to get access tokens with OAuth

All calls to the CC Libraries API must include an access token in the headers. In a production integration, you can get a user's access token through an OAuth 2.0 workflow.

Optionally, we offer the OAuth 2.0 Playground as a convenience during development so you can start making API calls before you implement OAuth in your application.

Details on both options are provided in this document.

## Prerequisite

- [How to get your developer credentials](./how-to-get-your-developer-credentials.md)

## Adobe OAuth 2.0

You can find more infomation about Adobe OAuth 2.0 in Adobe's [OAuth 2.0 Authentication and Authorization](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) documentation.

We also offer a basic [OAuth implementation example](https://github.com/cc-libraries-api/code-samples/tree/master/oauth) as part of our body of sample code.

## OAuth 2.0 Playground

For a production integration, you must set up an [OAuth workflow](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md). However, during development, you may want to temporarily skip that step and just start calling the API.

Even during development you'll need to include an access token with every API call. To simplify the process of getting your own access token, we provide the [OAuth 2.0 Playground](https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html).

To use the OAuth 2.0 Playground:

1. Follow the steps on the OAuth 2.0 Playground's _Authorization_ tab.
2. In the "Scopes" field, enter `openid,creative_sdk`.
3. On the [Adobe Developer Console](https://console.adobe.io), find your project, and modify or create an OAuth Web credential with the URI indicated on the OAuth 2.0 Playground page.

Now that everything is set up, you can return to the OAuth 2.0 Playground and click the "Generate Tokens" button.

From the _Tokens_ tab, all you'll need is the access token (what you do with it will depend on what your next step is). When the token expires, you can use the OAuth 2.0 Playground to create a new one.

> **Info**
> The OAuth 2.0 Playground is provided as a convenience for you during development. Production integrations must support a proper [OAuth 2.0 workflow](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md).

# Next Steps

- [Quick Start: cURL](./quick-start-curl.md)
- [Quick Start: Node.js](./quick-start-nodejs.md)

# Other Resources

- [Endpoint references](https://cc-libraries-api.github.io/open-api/)
