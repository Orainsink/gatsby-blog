<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

# Orainsink's Blog - Quick, Responsive, WebGL

**Site url: [foolishrobot.xyz/gatsby-blog](https://foolishrobot.xyz/gatsby-blog)**

[![Build Status](https://travis-ci.org/Orainsink/gatsby-blog.svg?branch=master)](https://travis-ci.org/Orainsink/gatsby-blog)

## 👷Built with

- Typescript + less modules
- [gatsbyjs](https://www.gatsbyjs.org/)
- [react-three-fiber](https://github.com/react-spring/react-three-fiber)
- [howler.js](https://howlerjs.com/)
- [Antd 4.0](https://ant.design/)

> This blog is a personal project for practicing, so there are no special optimizations for extensibility or customization.
>
> But if you are interested in it , you can clone this repo and then follow the steps above.

## :sparkle:Quick Start

```shell
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
# write a new post
yarn new your-post-name
# or if your post contains imgs, use
yarn new /your-post-folder-name
```

## :hammer:Custimize​

1. how to deploy

   change package.json

   ```json
   "scripts": {
   	...
   	"deploy": "gatsby build --prefix-paths && gh-pages -d public -r https:......",
   }
   ```

   Maybe you need to read [this article](https://www.gatsbyjs.org/docs/deploying-and-hosting/)

2. How to write posts

   ```shell
   yarn new aaa
   ```

   this command will create a `aaa.md` file in `/content/blog`

   ```shell
   yarn new /aaa
   ```

   this will create a path `/content/blog/aaa/` and generate a `aaa.md` file.

3. How to change styles and components

   This blog isn't complex at all, each component has a `less` module file in `styles/` corresponding to it. You can easily change them if you know how to write react hooks.

   You can change global less vars by modifying `gatsby-config.js`

4. As I say, this blog is a personal project for practicing, so there are no special optimizations for extensibility or customization. you need to change a few details yourself .

<!-- AUTO-GENERATED-CONTENT:END -->
