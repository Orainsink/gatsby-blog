const rootElement = 'document.body';

export const DarkModeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
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
  ></script>
);