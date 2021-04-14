/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    pages: [
      {
        title: "Creative Cloud Libraries API",
        path: "/",
      },
      {
        title: "Overview",
        path: "/overview/",
      },
      {
        title: "Integrate",
        path: "/integrate/",
      },
      {
        title: "API Reference",
        path: "/api/",
      },
      {
        title: "Go live",
        path: "/go-live/",
      },
      {
        title: "Community",
        path: "/community/",
      },
    ],
    subPages: [
      {
        title: "Overview",
        path: "/overview/",
        pages: [
          {
            title: "What are Creative Cloud Libraries?",
            path: "/overview/product-overview/",
          },
          {
            title: "Sample Libraries",
            path: "/overview/sample-libraries/",
          },
        ],
      },
      {
        title: "Setup",
        path: "/integrate/setup/",
        pages: [
          {
            title: "How to get your developer credentials",
            path: "/integrate/setup/developer-credentials/",
          },
          {
            title: "How to get access tokens with OAuth",
            path: "/integrate/setup/oauth/",
          },
        ],
      },
      {
        title: "Tutorials",
        path: "/integrate/tutorials/",
        pages: [
          {
            title: "Quick start with cURL",
            path: "/integrate/tutorials/quick-start-curl/",
          },
          {
            title: "Quick start with Node.js",
            path: "/integrate/tutorials/quick-start-nodejs/",
          },
        ],
      },
      {
        title: "Guides",
        path: "/integrate/guides/",
        pages: [
          {
            title: "Getting data",
            path: "/integrate/guides/getting-data/",
          },
          {
            title: "Working with library elements",
            path: "/integrate/guides/working-with-elements/",
            pages: [
              {
                title: "Supported elements",
                path:
                  "/integrate/guides/working-with-elements/supported-elements/",
              },
              {
                title: "Accessing file formats",
                path:
                  "/integrate/guides/working-with-elements/accessing-file-formats/",
              },
              {
                title: "Creating elements",
                path:
                  "/integrate/guides/working-with-elements/creating-elements/",
              },
              {
                title: "Element validations",
                path:
                  "/integrate/guides/working-with-elements/element-validations/",
              },
            ],
          },
          {
            title: "Configuring webhooks for events",
            path: "/integrate/guides/configuring-events-webhooks/",
          },
        ],
      },
      {
        title: "References",
        path: "/integrate/references/",
        pages: [
          {
            title: "API Reference",
            path: "/api/"
          },
          {
            title: "I/O Events Properties",
            path: "/integrate/references/event-properties/",
          },
          {
            title: "Glossary",
            path: "/integrate/references/glossary",
          }
        ],
      },
      {
        title: "Go live",
        path: "/go-live/",
        pages: [
          {
            title: "Submission and review",
            path: "/go-live/review-process/",
          },
          {
            title: "Marketing your integration",
            path: "/go-live/marketing/",
          },
        ],
      },
      {
        title: "Community",
        path: "/community/",
      },
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || "/creative-cloud-libraries/docs/",
};
