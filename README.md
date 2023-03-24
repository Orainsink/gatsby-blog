<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# Orainsink's Blog - SSG, Responsive, WebGL, Dark Mode, Typescript, loadable

**Site url: [blog.foolishrobot.xyz](https://blog.foolishrobot.xyz/)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/5ce41f8f-7767-400e-86c5-233b5e728209/deploy-status)](https://app.netlify.com/sites/verdant-medovik-584e44/deploys)
![preview](./preview.gif)

## 👷Built with

- Typescript + styled-components
- [gatsby 5.x](https://www.gatsbyjs.org/)
- [react-three-fiber 9.x](https://github.com/react-spring/react-three-fiber)
- [howler.js](https://howlerjs.com/)
- [Antd 5.x](https://ant.design/)
- [React 18.x](https://reactjs.org/)

## :sparkle:Quick Start

```sh
# install Gatsby-CLI
yarn add -g gatsby-cli
# clone repo
git clone https://github.com/Orainsink/gatsby-blog.git
# download dependences
yarn
# start dev server at localhost:8000
yarn start
# build project
yarn build
# write a new post
yarn new your-post-name
```

> This blog is a personal project for practicing, so there are no special optimizations for extensibility or customization.
>
> But if you are interested in it , you can clone this repo and then follow the steps above.

**Warning:** Due to firewalls, gatsby may fail to install, you need to change the host. see: https://www.ioiox.com/archives/62.html, may help.

## :hammer:Custimize​

### How to write posts

```shell
yarn new your-post-name
```

### MDX code block meta usage

use `live` to start a live code block in mdx file:

````text
```js live filename=demo.md
````

use `line` to highlight lines

````text
```js line={1,2,3-4} filename=demo.md
````

### How to change styles and components

You can change global styles by modifying `src/assets/theme/`

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
