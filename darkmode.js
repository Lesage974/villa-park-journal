/**
 * Villa Park Journal — Dark Mode
 * Injects a floating toggle button and persists preference in localStorage.
 * Add <script src="/darkmode.js"></script> (or relative path) to every page.
 */
(function () {
  const STORAGE_KEY = 'vp-theme';

  // Apply theme immediately (before paint) to avoid flash
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const isDark = saved === 'dark';
  applyTheme(isDark);

  // Inject button after DOM ready
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
    // Icon above the track: sun when dark mode ON (click to turn off), moon when OFF
    const icon = dark
      ? '<svg class="tm-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg class="tm-icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const track = `<span class="tm-track"><span class="tm-thumb ${dark ? 'on' : ''}"></span></span>`;
    return icon + track;
  }
})();
