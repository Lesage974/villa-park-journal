/**
 * Villa Park Journal — News Loader (STATIC JSON VERSION)
 * No API calls — reads from /data/news.json
 */

async function loadNews() {
  try {
    const res = await fetch('data/news.json');
    if (!res.ok) throw new Error("No news file");

    const data = await res.json();
    renderAll(data);

  } catch (e) {
    console.warn("Fallback news used");
    renderFallback();
  }
}

// ==========================
// RENDERING
// ==========================
function renderAll(data) {
  for (const key in data) {
    const container = document.getElementById('news-' + key);
    renderNews(container, data[key]);
  }
}

function renderNews(container, articles) {
  if (!container) return;

  container.innerHTML = articles.map(a => `
    <a class="news-card" href="${a.url}" target="_blank">
      <img src="${a.image || fallbackImage()}" 
           onerror="this.src='${fallbackImage()}'" />
      <div class="news-card-body">
        <div class="news-card-source">${escapeHtml(a.source)}</div>
        <div class="news-card-headline">${escapeHtml(a.title)}</div>
        ${a.description ? `<div class="news-card-desc">${escapeHtml(a.description)}</div>` : ''}
      </div>
    </a>
  `).join('');
}

function fallbackImage() {
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;');
}

function renderFallback() {
  const fallback = {
    internacional: [],
    financeiro: [],
    brasil: []
  };
  renderAll(fallback);
}

// ==========================
loadNews();
