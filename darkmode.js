/**
 * Villa Park Journal — Dark Mode
 * Self-contained: injects button + all required styles directly.
 * Works on every page regardless of which CSS file is loaded.
 */
(function () {
  const STORAGE_KEY = 'vp-theme';

  // ── 1. Apply theme immediately (before paint) to avoid flash ──
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const isDark = saved === 'dark';
  applyTheme(isDark);

  // ── 2. Inject all button styles as a <style> tag ──
  //    Done immediately (not waiting for DOMContentLoaded) so styles
  //    are ready before the button is painted.
  const style = document.createElement('style');
  style.textContent = `
    #theme-toggle {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9999;
      background: #0D3D2E;
      border: 2px solid #B8960C;
      border-radius: 40px;
      padding: 8px 10px 6px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      box-shadow: 0 4px 18px rgba(0,0,0,0.4);
      transition: transform 0.15s, border-color 0.2s, background 0.3s;
      /* Reset any browser button defaults */
      font: inherit;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
    }
    #theme-toggle:hover {
      transform: scale(1.07);
      border-color: #D4AF37;
    }
    [data-theme="dark"] #theme-toggle {
      background: #071510;
      border-color: #D4AF37;
    }

    /* SVG icon (sun / moon) */
    .tm-icon {
      width: 16px;
      height: 16px;
      display: block;
      stroke: #D4AF37;
      stroke-width: 2;
      stroke-linecap: round;
      fill: none;
    }
    /* Sun: fill the circle in dark mode */
    [data-theme="dark"] .tm-icon circle {
      fill: #D4AF37;
    }
    /* Moon: fill the path in light mode */
    .tm-icon path {
      fill: #D4AF37;
      stroke: none;
    }

    /* Slider track */
    .tm-track {
      width: 32px;
      height: 16px;
      background: #1A5C45;
      border-radius: 8px;
      position: relative;
      display: block;
      transition: background 0.3s;
      flex-shrink: 0;
    }
    [data-theme="dark"] .tm-track {
      background: #B8960C;
    }

    /* Slider thumb */
    .tm-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #F0DFA0;
      transition: left 0.25s, background 0.3s;
      display: block;
    }
    .tm-thumb.on {
      left: 18px;
      background: #0A2E22;
    }
  `;
  // Inject styles into <head> as early as possible
  (document.head || document.documentElement).appendChild(style);

  // ── 3. Inject button after DOM is ready ──
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Alternar modo escuro');
    btn.innerHTML = buildButtonHTML(isDark);
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = !nowDark;
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      btn.innerHTML = buildButtonHTML(next);
    });
  });

  function buildButtonHTML(dark) {
    const icon = dark
      ? `<svg class="tm-icon" viewBox="0 0 24 24">
           <circle cx="12" cy="12" r="5"/>
           <line x1="12" y1="1"    x2="12" y2="3"/>
           <line x1="12" y1="21"   x2="12" y2="23"/>
           <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
           <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
           <line x1="1"  y1="12"   x2="3"  y2="12"/>
           <line x1="21" y1="12"   x2="23" y2="12"/>
           <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
           <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
         </svg>`
      : `<svg class="tm-icon" viewBox="0 0 24 24">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
         </svg>`;

    const track = `<span class="tm-track"><span class="tm-thumb ${dark ? 'on' : ''}"></span></span>`;
    return icon + track;
  }
})();
