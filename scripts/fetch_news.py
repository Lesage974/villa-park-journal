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
    url = f"https://gnews.io/api/v4/search?q={cat['query']}&lang={cat['lang']}&max=5&apikey={API_KEY}"
    
    res = requests.get(url)
    data = res.json()

    articles = data.get("articles", [])

cleaned = [
    {
        "title": a.get("title"),
        "description": a.get("description"),
        "url": a.get("url"),
        "image": a.get("image"),
        "source": a.get("source", {}).get("name", "Notícia")
    }
    for a in articles
]

# 👉 This part FIXES empty categories
while len(cleaned) < 3:
    cleaned.append({
        "title": "Mais notícias em breve",
        "description": "Conteúdo indisponível no momento",
        "url": "#",
        "image": None,
        "source": "Sistema"
    })

result[key] = cleaned[:3]

os.makedirs("data", exist_ok=True)

with open("data/news.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
