/**
 * Villa Park Journal — News Loader
 * Uses NewsData.io free tier (no key needed for demo) or falls back to curated placeholders.
 * Replace GNEWS_KEY with a real free key from https://gnews.io for live news.
 */

const GNEWS_KEY = db4737cbca37d685136a17b89e23ea5a; // Replace with free key from gnews.io

const CATEGORIES = {
  internacional: { query: 'world news', label: 'Internacional', lang: 'en' },
  financeiro:    { query: 'finance economy markets', label: 'Finanças', lang: 'en' },
  brasil:        { query: 'brasil noticias', label: 'Brasil', lang: 'pt' }
};

// Fallback placeholder articles when API key is not set
const PLACEHOLDERS = {
  internacional: [
    {
      title: 'Líderes mundiais debatem mudanças climáticas em cúpula histórica',
      description: 'Representantes de mais de 150 países se reúnem para discutir metas ambiciosas de redução de emissões.',
      url: 'https://www.reuters.com',
      image: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&q=70',
      source: 'Reuters'
    },
    {
      title: 'Tensões diplomáticas marcam semana de negociações no Médio Oriente',
      description: 'Delegações internacionais buscam acordo de cessar-fogo enquanto pressão humanitária aumenta na região.',
      url: 'https://www.bbc.com/news',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70',
      source: 'BBC News'
    },
    {
      title: 'Avanço tecnológico: nova geração de IA promete revolucionar diagnósticos médicos',
      description: 'Pesquisadores revelam sistema capaz de detectar doenças raras com precisão superior a especialistas humanos.',
      url: 'https://www.theguardian.com',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=70',
      source: 'The Guardian'
    }
  ],
  financeiro: [
    {
      title: 'Mercados asiáticos sobem após dados de inflação mais favoráveis nos EUA',
      description: 'Bolsas de Tóquio e Hong Kong avançam enquanto investidores reavaliam expectativas para política monetária americana.',
      url: 'https://www.ft.com',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=70',
      source: 'Financial Times'
    },
    {
      title: 'Dólar recua frente às principais moedas em sessão volátil',
      description: 'A divisa americana cede terreno após declarações do presidente do Fed sobre o ritmo de cortes de juros.',
      url: 'https://www.bloomberg.com',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&q=70',
      source: 'Bloomberg'
    },
    {
      title: 'Petróleo tem maior queda semanal do ano em meio a excesso de oferta',
      description: 'Barril do Brent encerra a semana abaixo dos US$ 80 pela primeira vez em meses, pressionado por estoques americanos.',
      url: 'https://www.wsj.com',
      image: 'https://images.unsplash.com/photo-1518134346374-184f9d21cea2?w=600&q=70',
      source: 'Wall Street Journal'
    }
  ],
  brasil: [
    {
      title: 'Governo anuncia pacote de investimentos em infraestrutura para o Nordeste',
      description: 'Programa prevê aporte de R$ 15 bilhões em obras de saneamento, habitação e mobilidade urbana nas capitais nordestinas.',
      url: 'https://g1.globo.com',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=70',
      source: 'G1 Globo'
    },
    {
      title: 'IBGE: taxa de desemprego recua para menor nível desde 2012',
      description: 'Mercado de trabalho brasileiro registra recuperação consistente, com geração de vagas formais acima das expectativas.',
      url: 'https://www.folha.uol.com.br',
      image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=70',
      source: 'Folha de S.Paulo'
    },
    {
      title: 'Recife lidera ranking nacional de inovação em turismo sustentável',
      description: 'Capital pernambucana é reconhecida por iniciativas que integram preservação ambiental e desenvolvimento econômico local.',
      url: 'https://www.diariodepernambuco.com.br',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=70',
      source: 'Diário de Pernambuco'
    }
  ]
};

async function fetchNews(category) {
  const containerId = 'news-' + category;
  const container = document.getElementById(containerId);

  // If no real API key, use placeholders immediately
  if (!GNEWS_KEY || GNEWS_KEY === 'YOUR_GNEWS_KEY') {
    renderNews(container, PLACEHOLDERS[category]);
    return;
  }

  try {
    const cat = CATEGORIES[category];
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(cat.query)}&lang=${cat.lang}&max=3&apikey=${GNEWS_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    if (data.articles && data.articles.length > 0) {
      const articles = data.articles.slice(0, 3).map(a => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.image || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70`,
        source: a.source?.name || 'Notícia'
      }));
      renderNews(container, articles);
    } else {
      renderNews(container, PLACEHOLDERS[category]);
    }
  } catch (e) {
    renderNews(container, PLACEHOLDERS[category]);
  }
}

function renderNews(container, articles) {
  container.innerHTML = articles.map(a => `
    <a class="news-card" href="${a.url}" target="_blank" rel="noopener noreferrer">
      <img src="${a.image}" alt="${escapeHtml(a.title)}" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70'" />
      <div class="news-card-body">
        <div class="news-card-source">${escapeHtml(a.source)}</div>
        <div class="news-card-headline">${escapeHtml(a.title)}</div>
        ${a.description ? `<div class="news-card-desc">${escapeHtml(a.description)}</div>` : ''}
      </div>
    </a>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Load all tabs on start
fetchNews('internacional');
fetchNews('financeiro');
fetchNews('brasil');
