import React from 'react';
import { GatsbySSR, PluginOptions as GatsbyPluginOptions } from 'gatsby';

export interface PluginOptions extends GatsbyPluginOptions {
  rootElement?: string;
  script?: string | null;
}

export const onRenderBody: GatsbySSR['onRenderBody'] = (
  { setPreBodyComponents },
  options: PluginOptions
) => {
  const { rootElement = 'document.body', script } = options;

  if (script === null) {
    return;
  }
  setPreBodyComponents([
    <script
      key="gatsby-plugin-dark-mode"
      dangerouslySetInnerHTML={{
        __html:
          script ??
          `
void function() {
  window.__onThemeChange = function() {}
  var preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) { }
  function setTheme(newTheme) {
    if (preferredTheme && ${rootElement}.classList.contains(preferredTheme)) {
      ${rootElement}.classList.replace(preferredTheme, newTheme)
    } else {
      ${rootElement}.classList.add(newTheme)
    }
    window.__theme = newTheme
    preferredTheme = newTheme
    window.__onThemeChange(newTheme)
  }
  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {}
  }
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  })
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
}()
    `,
      }}
    />,
  ]);
};
