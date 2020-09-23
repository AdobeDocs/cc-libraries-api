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

const globalNav = require("@adobe/gatsby-theme-parliament/globalNav.json");

globalNav.menus = [globalNav.menus[1]];

module.exports = {
  siteMetadata: {
    globalNav,
    pages: [
      {
        title: "CC Libraries API",
        path: "/",
      },
      {
        title: "Integrate",
        path: "/integrate/",
      },
      {
        title: "Go live",
        path: "/go-live/",
      },
      {
        title: "API Reference",
        path: "/api/",
      },
    ],
    subPages: [
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
            title: "Working with library elements",
            path: "/integrate/guides/working-with-elements/",
            pages: [
              {
                title: "Supported elements",
                path:
                  "/integrate/guides/working-with-elements/supported-elements/",
              },
              {
                title: "Getting data",
                path: "/integrate/guides/working-with-elements/getting-data/",
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
        title: "Go live",
        path: "/go-live/",
        pages: [
          {
            title: "Review process",
            path: "/go-live/review-process-overview/",
          },
          {
            title: "Submission checklist",
            path: "/go-live/submission-checklist/",
          },
          {
            title: "Marketing your integration",
            path: "/go-live/marketing/",
          },
        ],
      },
    ],
  },
  plugins: [`@adobe/gatsby-theme-parliament`],
  pathPrefix:
    process.env.PATH_PREFIX || "/gatsby-theme-parliament-documentation",
};
