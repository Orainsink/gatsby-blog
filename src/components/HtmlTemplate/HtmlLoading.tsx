/**
 * @deprecated To make SSR perfect, ban html loading
 * <HtmlLoading />
 */
export const HtmlLoading = () => (
  <>
    <div
      id="___loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#0a0a0a',
        transition: 'opacity 0.3s Linear',
        opacity: 1,
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <iframe
        title="loading-iframe"
        width="261px"
        height="261px"
        style={{ border: 0, margin: 0, padding: 0, overflow: 'hidden' }}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI2MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBmaWxsPSJ0cmFuc3BhcmVudCIgc3Ryb2tlPSJ0cmFuc3BhcmVudCIgc3Ryb2tlLXdpZHRoPSIuMSIgc3Ryb2tlLW9wYWNpdHk9IjAiIGQ9Ik0uMjcxLS4yODhjLTkuMiAwLTE2LjY2IDMuMjg0LTE2LjY2IDcuMzM1czcuNDYgNy4zMzUgMTYuNjYgNy4zMzUgMTYuNjYxLTMuMjg0IDE2LjY2MS03LjMzNUMxNi45MzEgMi45OTcgOS40NzItLjI4OC4yNzItLjI4OHoiIGlkPSJhIi8+PGNpcmNsZSByPSIxIiBjeD0iMjAiIGN5PSIxNiIgZmlsbD0iI2ZmZiI+PGFuaW1hdGVNb3Rpb24gZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjxtcGF0aCB4bGluazpocmVmPSIjYSIvPjwvYW5pbWF0ZU1vdGlvbj48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
      ></iframe>
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(){
            var loaderIframe = document.getElementById('___loader')
            if (
              typeof window === "object" && window.location.pathname === "/" && (!!window.localStorage.getItem('SCENE') ||
              !window.localStorage.getItem('SKIP'))
            ) {
              loaderIframe.style.display = 'flex';
            } else {
              loaderIframe.style.display = 'none';
            }
          })()
        `,
      }}
    />
  </>
);
