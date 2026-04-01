import requests
import json
import os

API_KEY = os.getenv("GNEWS_API_KEY")

categories = {
    "internacional": {"query": "world OR international news", "lang": "en"},
    "financeiro": {"query": "economia OR mercado OR financas", "lang": "pt"},
    "brasil": {"query": "noticias brasil", "lang": "pt"}
}

result = {}

for key, cat in categories.items():
    query = cat["query"]
    lang = cat["lang"]

    url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&max=5&apikey={API_KEY}"

    res = requests.get(url)
    data = res.json()

    articles = data.get("articles", [])

    cleaned = []

    for a in articles:
        if not a.get("title") or not a.get("url"):
            continue

        cleaned.append({
            "title": a.get("title", "Sem título"),
            "description": a.get("description", ""),
            "url": a.get("url", "#"),
            "image": a.get("image") or "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70",
            "source": a.get("source", {}).get("name", "Notícia")
        })

    # Ensure always 3
    while len(cleaned) < 3:
        cleaned.append({
            "title": "Mais notícias em breve",
            "description": "Conteúdo indisponível no momento",
            "url": "#",
            "image": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70",
            "source": "Sistema"
        })

    result[key] = cleaned[:3]

os.makedirs("data", exist_ok=True)

with open("data/news.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
