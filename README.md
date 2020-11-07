# CC-libraries-API

This is a Gatsby site template built with [Adobe I/O Gatsby Theme](https://github.com/adobe/gatsby-theme-aio).

Follow the [instructions](https://github.com/adobe/gatsby-theme-aio#getting-started) to get started.

## Author quick start (WIP)

1. Clone repo
2. Create your `.env` file ([instructions](https://github.com/adobe/gatsby-theme-aio#env-settings-for-github-contributors))
3. `npm install`
4. `npm run dev`
5. Make a new branch from main
6. Write great things in `src/pages`
7. Configure nav in `gatsby-config.js` as needed ([instructions](https://github.com/adobe/gatsby-theme-aio#global-navigation))

## Deploying

**For the author**

1. Push your changes to a new branch
2. On GitHub, tag the branch with your intended deploy destination
    1. Stage: `deploy:dev`
    2. Prod: `deploy`
3. Assign a reviewer
4. Submit a pull request

**For the reviewer**

1. The reviewer must approve the pull request on GitHub (this triggers the deploy)
2. Merge the pull request to main
3. Delete the branch

### Troubleshooting deploys

**Pull request was merged but changes weren't deployed**

This is likely because: 

- The PR was merged by the author without a reviewer's approval
- The PR wasn't tagged with the appropriate deploy tag
- The review didn't use GitHub's review feature to approve the PR
- You deployed to stage and merged to main before deploying to prod

As a workaround, if all of your changes are already merged to main, you can do the following:

1. Create a new branch from main
2. Bump the version number in `package.json`
3. Follow the deploy steps laid out in the author and reviewer sections
