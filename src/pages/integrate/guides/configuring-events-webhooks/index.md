# Configuring Webhooks for Created Cloud Libraries Events

I/O Events makes it possible to listen for changes to Creative Cloud Libraries and get a notification when those changes occur. Developers can subscribe to _create_, _delete_, and _update_ events for a user's Creative Cloud Libraries. This tutorial will walk through how to set up and configure your project to listen for Creative Cloud Libraries events.

## Creative Cloud Library Event Type Descriptions

| Event Type                     | Description                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Creative Cloud Library Created | Triggers whenever a user creates a new Library including adding a public library to "Your Work"                                          |
| Creative Cloud Library Deleted | Triggers when a user deletes a Library                                                                                                   |
| Creative Cloud Library Updated | Triggers whenever there is a change to a Library including an element being added/deleted/updated or metadata of a Library being changed |

_Note: Currently there is no way to listen for element-level changes only on a Library. This is on the roadmap._

## Before you start

Subscribing to Adobe I/O Events requires a URL that can be publicly accessible by the Events service. That means the URL provided for the Webhook URL in the Adobe Developer Console needs to be accessible via the internet. For doing local testing, this tutorial uses [ngrok](https://ngrok.com/) which provides a publicly addressable URL to a locally running service.

### Technology Used

- [ngrok](https://ngrok.com/) which requires a free account
- Node and NPM to run the [sample webhook project](https://github.com/adobeio/io-event-sample-webhook)

### Prerequisites

- Clone the [I/O Events Sample Webhook project](https://github.com/adobeio/io-event-sample-webhook) into a local directory
- Create an [ngrok](https://ngrok.com/) account then [download and install ngrok](https://ngrok.com/download)

## Development Steps

### 1. Preparing the Webhook URLs

When creating an Event Registration, Adobe I/O Events will send a challenge to the given Webhook URL before sending it events. So a valid Webhook URL needs to be set up and defined before creating the registration. In production, this URL will be a publicly accessible URL that responds correctly to the challenge. This tutorial will be using ngrok.

Open a terminal window to the location where the [I/O Events Sample Webhook project](https://github.com/adobeio/io-event-sample-webhook) was cloned. In that directory, run

```shell
npm install
npm start
```

This will create a local service that responds correctly to the I/O Events challenge and will show logging information about events received. Once running, it can be accessed at http://localhost:3000. Browse to that URL. In the webhook URI input box, put `libraries` and press the "Connect" button. This will setup a webhook URL and will display logging information whenever an events call is made. The logging box should say _Connected to: http://localhost:3000/webhook/libraries_.

The next step is to make it available to the internet using ngrok. Open another terminal window in the location where ngrok was installed and run

```shell
 ./ngrok http 3000
```

That should result in an output that looks like this

```shell
Session Status                online
Account                       <Your Name>
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://a7ad21255b75.ngrok.io -> http://localhost:3000
Forwarding                    https://a7ad21255b75.ngrok.io -> http://localhost:3000
```

Note the `Forwarding` URLs as these will be used to set up the event registration in the next step.

### 2. Create Event Registrations

Creating the event registrations required for listening for Creative Cloud Libraries events happens in the Adobe Developer Console. Once logged in to the Developer Console, select the project currently used for your Creative Cloud Libraries integration.

In the project, click "Add to Project" and select "Event". On the next screen, select "Creative Cloud Libraries" and push the Next button.

The next screen shows the different event types that are available. Applications can listen for one or more event types from a single webhook URL. Select all three event types: Creative Cloud Library Deleted, Creative Cloud Library Updated, and Creative Cloud Library Created, then push Next.

User consent is required to listen for events on their Libraries, so developers need to define OAuth credentials for users to explicitly authorize that consent. To do that, developers need to define a set of OAuth credentials by providing a redirect URI and redirect URI pattern. More information about the OAuth flow is available in [How to get an Access Token with OAuth](https://github.com/cc-libraries-api/api-docs/blob/master/tutorials/.how-to-get-access-tokens-with-oauth.md).

If the integration has an existing set of OAuth credentials, this information should already be filled out. If not, correct URIs for this tutorial are:

- Redirect URI: `https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/cb`
- Redirect URI Pattern: `https://adobeioruntime\\.net`

Give the Event Registration a name and optionally a description. In the webhook URL field, enter the https line from the `Forwarding` output in previous step follwed by `/webhook/libraries`. It should look something like `https://a7ad21255b75.ngrok.io/webhoook/libraries`. When finished, press "Save Configured Events".

On the next screen, a successful setup will show the status of "Active" under Registration Details. The logging information in the Webhook app running on http://localhost:3000/ should show a single `GET` request with a `challenge` query param.

### 3. Authorizing Events

As mentioned, in order to receive a user's events, the user needs to explicitly authorize an application to listen for events via an OAuth flow. The next step is to set up that authorization. This example will use the [OAuth Playground](https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html) but any method of initiating the OAuth flow can be used.

_Note: When using OAuth to call APIs, an access token is generated and that access token is passed in the header to successfully call the API. In the case of Events, the access token isn't used. I/O Events registers the authorization and Events will be sent to the application until the user revokes their consent._

To initiate the consent workflow, open a new browser window and browse to https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html. Find the integration's API key by selecting the "Credentials" item on the page confirming the Event Registration, copy the Client ID, and paste it in the API Key field of the OAuth Playground. Do the same for the client secret. In the "Scopes" field, add `creative_sdk,profile,address,AdobeID,email,cc_files,cc_libraries` so that it reads `openid,creative_sdk,profile,address,AdobeID,email,cc_files,cc_libraries` then press the "Generate Tokens" button.

The OAuth Playground will show an Adobe login screen. Login with a valid username and password and then hit "Allow Access" to allow the application to listen for events from the authorized account.

### 4. Testing and Verifying Events

Now the webhook has been configured successfully and an account has authorized the sending of events to the specified webhook URL. Any changes to Libraries in that account will trigger events.

To test, browse to https://assets.adobe.com/public/06cb8dc3-921f-4be6-64fa-f04de9b0a752 in the same browser that was used to initiate the OAuth flow. Once loaded, click the "Copy to your Work" button. This will trigger a _create_ event.

The Webhook app (http://localhost:3000/) should now show a `POST` request that includes a JSON `body` with information about the event including what kind of event was triggered (`event:action`), the id of the newly created Library (`repo:id`), and the user who caused the event to trigger (`repo:modifiedBy`).

This information can also be seen in the Developer Console by selecting the "Debug Tracing" tab after selecting the event registration on the Project screen. (If the "Debug Tracing" section is greyed out, try refreshing the page). The Debug Tracing area provides the ability to filter by status code as well as information about how long the request took and the headers/payload that were sent with the event.

To trigger an update event, rename the Library. Deleting the library will trigger a delete event.

## Next Steps

This tutorial provides a working local application to receive (and log) events. When re-implementing this in production, remember the need to respond to the challenge and get user authorization. More information can be found in the [Adobe I/O Events documentation](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/readme.md).
