---
keywords:
  - Creative Cloud
  - API Documentation
  - JavaScript
  - CC Libraries API
  - Creative Cloud Libraries API
---

# How to get your developer credentials

Before using the Libraries API, you'll need to get your developer credentials.

Specifically, you'll need to get your _Client ID_ (also referred to as an _API Key_) and _Client Secret_ from the Adobe Developer Console.

When calling the Libraries API to identify your application to Adobe, these credentials will be used to let your users make informed decisions about granting your application access to their data.

In this tutorial, we'll show you how to get your credentials from the Adobe Developer Console and an easy way to get your own user access token for use during development.

With your developer credentials in hand, you'll be ready to start making API calls.

## Set up your Adobe Developer Console project

Visit the [Adobe Developer Console](https://console.adobe.io/) and log in with your Adobe ID (or create a free Adobe ID if you don't already have one). You can follow the steps in the following sections to get your developer credentials.

### Create your project

**For new projects** on the Adobe Developer Console:

1. After logging in, click the "Create new project" button under the Quick Start section. This will automatically create a blank project for you.
2. Once the project is created, click "Edit project" to change the name and give it a description.
3. Follow the steps in the "Add an API" section just below.

**For existing projects** on the Adobe Developer Console:

1. Select the project that you want to use in the Adobe Developer Console.
2. Follow the steps in the "Add an API" section just below.

### Add an API to your project

1. Click the "Add to Project" button in the upper left-hand corner and select "API".
2. Select the "Creative Cloud Libraries" card from the list and hit "Next" in the lower right-hand corner.
3. Follow the steps in the "Add an authentication method" section just below.

### Add an authentication method to your project

Regardless of which authentication workflow you choose to implement for your project, the [scopes](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/Scopes.md) required to access CC Libraries are: 
`openid,creative_sdk,profile,address,AdobeID,email,cc_files,cc_libraries`.
Make sure the scopes you provide exist in this same comma-delimited (and no spaces) string format. 

1. Select your authentication method (most projects will use OAuth 2.0 Web).
2. Enter a Redirect URI and Redirect URI Pattern. This is the URL that your users will be redirected to after they log in.

   - **If you're using the [OAuth 2.0 Playground](https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html)** (development only):
     - Use the URI indicated on the Playground page for your Redirect URI and Redirect URI Pattern.
     - You can find more information about the OAuth Playground in ["How to get access tokens with OAuth"](../oauth/).
   - **If you're implementing OAuth 2.0 in your application**:
     - You can provide your own Redirect URI and Redirect URI Pattern.
     - You can find more information about the Adobe OAuth 2.0 in Adobe's [OAuth 2.0 Authentication and Authorization](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) documentation.

3. When finished, click "Save configured API".

Now you have access to your Client ID and Secret. 

<InlineAlert variant="info" slots="text"/>

Keep your Client Secret private, and never share it or include it in public repos.

You'll use these credentials as part of your integration, and you can always find them again on the Adobe Developer Console.
