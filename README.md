<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# Orainsink's Blog - SSR, Responsive, WebGL, Dark Mode, Typescript, loadable

**Site url: [blog.foolishrobot.xyz](https://blog.foolishrobot.xyz/)**

[![Build Status](https://travis-ci.org/Orainsink/gatsby-blog.svg?branch=master)](https://travis-ci.org/Orainsink/gatsby-blog)

![preview](./preview.gif)

## 👷Built with

- Typescript + less modules
- [gatsby 3.0](https://www.gatsbyjs.org/)
- [react-three-fiber](https://github.com/react-spring/react-three-fiber)
- [howler.js](https://howlerjs.com/)
- [Antd 4.0](https://ant.design/)

## :sparkle:Quick Start

```sh
# install Gatsby-CLI
yarn add -g gatsby-cli
# clone repo
git clone https://github.com/Orainsink/gatsby-blog.git
# add dependences
yarn
# start dev server at localhost:8000
yarn start
# build project
yarn build
# write a new post, default category is "tech"
yarn new your-post-name
# or if your post contains imgs, use
yarn new /your-post-folder-name
# new post with category in ["tech","essay","leetcode","snippet"]
yarn new your-post-name##essay
#or
yarn new /your-postfolder-name##essay
```

> This blog is a personal project for practicing, so there are no special optimizations for extensibility or customization.
>
> But if you are interested in it , you can clone this repo and then follow the steps above.

**Warning:** Due to firewalls, gatsby may fail to install, you need to change the host. see: https://www.ioiox.com/archives/62.html, may help.

## :hammer:Custimize​

### How to write posts

```shell
yarn new aaa
```

this command will create a `aaa.mdx` file in `/content/tech`

```shell
yarn new /aaa
```

this will create a path `/content/tech/aaa/` and generate a `aaa.mdx` file.

### How to change styles and components

You can change global styles by modifying `scripts/less-vars.js` and `src/assets/css/`

### Enviroment variables

List of environment variables and associated plugins, which can be removed if not needed.

.env

```.env
TRACKING_ID=xxx
GATSBY_ALGOLIA_APP_ID=xxx
GATSBY_ALGOLIA_SEARCH_KEY=xxx
ALGOLIA_INDEX_NAME=xxx
ALGOLIA_ADMIN_KEY=xxx
GATSBY_HEWEATHER_KEY=xxx
GATSBY_SENTRY_DSN=xxx
GATSBY_SENTRY_AUTH=xxx
```

#### Google analytics

`TRACKING_ID` : Google analytics tracking id

#### Algolia search

https://www.algolia.com/

`GATSBY_ALGOLIA_APP_ID`

`GATSBY_ALGOLIA_SEARCH_KEY`

`ALGOLIA_ADMIN_KEY`

`ALGOLIA_INDEX_NAME`

Used by `gatsby-plugin-algolia` option.

#### 和风天气

https://dev.qweather.com/docs/start/get-key/

`GATSBY_HEWEATHER_KEY`

Used by index animation

#### SENTRY

https://docs.sentry.io/platforms/javascript/guides/gatsby/

`GATSBY_SENTRY_DSN`: sentry dsn

`GATSBY_SENTRY_AUTH`: sentry auth id

Used by `@sentry/gatsby` plugin

#### Github

https://docs.github.com/en/actions/reference/authentication-in-a-workflow

`GH_TOKEN`: GITHUB_TOKEN

Used by `gh-pages` plugin.

<!-- AUTO-GENERATED-CONTENT:END -->
