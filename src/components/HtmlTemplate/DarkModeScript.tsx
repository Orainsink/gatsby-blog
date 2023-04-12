const rootElement = 'document.documentElement';

export const DarkModeScript = () => (
  <script
    key="dark-mode-script"
    dangerouslySetInnerHTML={{
      __html: `
    void function() {
      window.__onThemeChange = function() {}
      var preferredTheme
      try {
        preferredTheme = localStorage.getItem('theme')
      } catch (err) { }
      function setTheme(newTheme) {
        ${rootElement}.setAttribute("data-theme", newTheme)
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
