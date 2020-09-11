# How to get your developer credentials

Before using the CC Libraries API you'll need to get your developer credentials: specifically your _Client ID_ (also referred to as an _API Key_) and _Client Secret_.

These credentials will be used when calling the CC Libraries API to identify your application to Adobe and let your users make informed decisions about granting your application access to their data.

In this tutorial, we'll show you how to get your credentials from the Adobe Developer Console as well as an easy way to get your own user access token for use during development.

With your developer credentials in hand, you'll be ready to start making API calls.

## Get your Client ID and Secret

Visit the [Adobe Developer Console](https://console.adobe.io/) and log in with your Adobe ID (or create a free Adobe ID if you don't already have one). From there you can follow the steps in the following sections to get your developer credentials.

### Set up your Adobe Developer Console project

If you're creating a **new project** on the Adobe Developer Console:

1. After logging in, click the "Create new project" button under the Quick Start section. This will automatically create a blank project for you.
2. Once the project is created, click "Edit project" to change the name and give it a description.
3. Follow the steps in the "Add an authentication method" section just below.

If you're planning to use credentials from an **existing project** on the Adobe Developer Console:

1. Select the project that you want to use in the Adobe Developer Console.
2. Follow the steps in the "Add an authentication method" section just below.

### Add an authentication method to your Adobe Developer Console project

3. Click the "Add to Project" button in the upper left hand corner and select "API".
4. Select the "Creative SDK" card from the list and hit "Next" in the lower right hand corner.
5. Select your authentication method (most projects will use OAuth 2.0 Web).
6. Enter a Redirect URI and Redirect URI Pattern. This is the URL that your users will be redirected to after they log in.

   - **If you're using the [OAuth 2.0 Playground](https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html)** (development only):
     - Use the URI indicated on the Playground page for your Redirect URI and Redirect URI Pattern.
     - You can find more infomation about the OAuth Playground in ["How to get access tokens with OAuth"](./tutorials/how-to-get-access-tokens-with-oauth.md).
   - **If you're implementing OAuth 2.0 in your application**:
     - You can provide your own Redirect URI and Redirect URI Pattern.
     - You can find more infomation about the Adobe OAuth 2.0 in Adobe's [OAuth 2.0 Authentication and Authorization](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) documentation.

7. When finished, click "Save configured API".

Now you have access to your Client ID and Secret.

> **Info**
> Keep your client secret private, and never share it or include it in public repos.

You'll use these credentials as part of your integration, and you can always find them again on the Adobe Developer Console.

## For private prerelease developers: tell us your Client ID

Before the APIs are released publicly, we'll have to manually enable your _Client ID_ for the CC Libraries API.

Once you have your Client ID, email us, and we'll add you to our allow list for the CC Libraries API.

# Next Steps

- [How to get access tokens with OAuth](./how-to-get-access-tokens-with-oauth.md)

# Other Resources

- [Endpoint references](https://cc-libraries-api.github.io/open-api/)
