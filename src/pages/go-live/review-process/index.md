# Submission and review

Congratulations! You've built a great Adobe integration and you're ready to release it to your customers.

To be granted production status for a Client ID, **your integration must first go through a review process**.

By reviewing every integration, Adobe aims to help developers get ready for primetime and ensure that users have great experiences with the integrations they consume.

This document will give you an idea of what we’re checking for during the review process. While lengthy, working through the points below will help you make sure you’ve accounted for all of the requirements, and avoid having to fix things and resubmit before being granted production status.

## Pre-submission checklist

Our goal is to balance providing you the best developer experience during review that we can, while helping ensure that approved integrations offer a great user experience for our mutual customers.

This list will give you an overview of the kinds of things we check for during review. The list will change over time, and cannot cover absolutely everything we look at. 

### Metadata

As part of submission, you will enter two kinds of metadata on the [Adobe Developer Console](https://console.adobe.io): a publisher profile and details about the specific integration you are submitting. 

For specifics regarding character lengths, image dimensions, and required fields, always refer to the Adobe Developer Console submission form for the latest requirements.

<InlineAlert variant="info" slots="text"/>

We recommend that you draft this metadata in a text editor, and not directly in the Adobe Developer Console. This will help you avoid losing your writing if your browser refreshes before submission. 

#### Publisher profile

You publisher profile is about you as a company or developer as whole. Once you've submitted this information and it has been approved by Adobe, it is shown for _all plugins and integrations you publish with Adobe_.

Your publisher profile includes required details like:

- Your publisher public name (often company name or, for individuals, your own name)
- Your publisher marketing website (usually not the same as your "App website", which is covered in the next section)
- A description of you, the publisher
- A logo

**Your publisher profile is an important thing to get right the first time!** After it is approved, changing it is not easy or fast: you will have to email us via the "View public profile" link on your [Adobe Developer Console](https://console.adobe.io) project. Doing so will trigger a new review of your publisher details, and possibly of your integration as well.

Frequently changing your publisher profile will confuse users and erode trust. Please be sure you're ready before entering this information.

<InlineAlert variant="info" slots="text"/>

**You must complete your publisher profile** in order to submit your first integration. Next time you submit an integration, your publisher profile will already be set, so you won't need to do this again.

#### Integration details

Your integration details are information you provide to Adobe, and in some cases your users, about the specific integration you are currently submitting. Each integration you submit will have its own set of integration details that you provide.

Always check the [Adobe Developer Console](https://console.adobe.io) for the latest list of required details. At the time of writing, those details include the following lists.

**Consent screen details**

The consent screen details appear on the post-login Adobe authorization screen to help users make an informed decision when granting access to your integration.

- Public app name
- App website
- Privacy policy
- Terms of use

**Approval details**

The approval details help Adobe learn more about the integration you are submitting.

- App description
- Publish to Adobe Enterprise Admin Console?
- Notes to reviewer
- Screenshots

<InlineAlert variant="info" slots="text"/>

**Test accounts:** If your app or service requires a user account to test the Adobe integration, you must provide credentials for a test account in the "Notes to reviewer" field. If we are unable to access the integration, the submission will be rejected and you will need to resubmit.

<InlineAlert variant="info" slots="text"/>

**Instructions and screenshots:** We see a lot of integrations! It's possible this is the first time we're seeing your app (welcome!), or maybe we haven't seen it in a while (welcome back!). Please help our review team find the Adobe integration within your app by providing detailed **instructions** and **screenshots**. If we are unable to find the integration, the submission will be rejected and you will need to resubmit.

### Auth

When an integration involves a logged in Adobe user, we will be reviewing the experience related to authentication and authorization.

#### Authentication

Integrations that require access to a logged in Adobe user and their stored data should implement an appropriate authentication workflow, usually OAuth 2.0. 

The user must also be able to log out of their Adobe account from your integration. 

Your users can also revoke access from your application on the [Connected accounts page](https://account.adobe.com/connected-accounts) of their Adobe account.

#### Authorization

After the user first logs in to your integration, they will be prompted to authorize access to their data with a consent screen. 

The consent screen must present correct and complete information to the user about you, the publisher, and the integration. This data is set when you submit your publisher profile and integration details via the [Adobe Developer Console](https://console.adobe.io) (see the Metadata section of this page for details).

#### Scopes

The auth scopes your integration uses will determine the level of access the user is asked to grant on the consent screen. We require that all integrations use the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege); never ask for more access than you need.

Integrations asking for more access than necessary _at the time of submission_ will be rejected.

### Content

Content within, and associated with, your integration with be reviewed.

#### Adobe Branding

See our ["Marketing your integration"](../marketing) page for guidelines on using Adobe brand assets and messaging your integration to customers.

#### Inappropriate content

Your integration and associated marketing surfaces must not include any intense violence, blood, gore, sexual content, nudity, or strong language. 

Your integration must not promote or conduct phishing, spamming, hacking, password trafficking, or spyware, nor contain malware, trojans, or viruses.

### User experience

Checking the integration's user experience is the core of our review process. 

Since all applications and integrations are different, there are fewer concrete guidelines we can provide. However, we are generally looking at these three things: functionality, user interface, and performance.

- **Functionality:** Does the integration do what it suggests in the associated content and the user interface?
- **User interface:** Is the user able to find the integration and complete basic tasks? Is the UI broken or distorted in any way? Is the user made aware of what is (or isn't) happening?
- **Performance:** Are system or account resources misused or overused? Is the user left waiting for an abnormal amount of time?

## How to submit

You can submit your integration for approval and review on the [Adobe Developer Console](https://console.adobe.io). 

The following is a basic overview of the steps:

1. [Visit the Adobe Developer Console](https://console.adobe.io)
2. Go to the _Projects_ tab
3. Find and select the project that contains the Client ID you are seeking production approval for
3. On your project page, select _Approval_
4. (First time only) Complete your publisher profile via the "View public profile" button, and save
5. Fill out the "Submit for approval" form, and submit

Further details on the data you are required to sumbit can be found in the [Pre-submission checklist](#pre-submission-checklist) section of this page.

## Timelines and outcomes

We aim to respond to all submissions within 10 business days, but we are typically much faster on average. 

Ultimately, your submission will either be approved or rejected. In some cases, we may reach out to you with questions before we send you the outcome of the review.

If your submission is rejected, we will provide the reasons. You can ask for clarifications, if you need any. Once you have addressed the reasons for rejection in your integration and associated content, you are welcome to resubmit.

Again, our goal is to provide you the best developer experience during review that we can, while helping ensure that approved integrations offer a great user experience for our mutual customers.