# Patch explanation

In order to use old prism css theme, I have to delete default `theme`.

`prism-react-render` doesn't support css variable for ssr, to make the dark mode perfect, I have to use css theme file instead.

See: https://github.com/FormidableLabs/prism-react-renderer#faq
