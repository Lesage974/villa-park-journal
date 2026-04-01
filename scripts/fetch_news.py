import requests
import json
import os

API_KEY = os.getenv("GNEWS_API_KEY")

FINANCE_KEYWORDS = [
    "economia", "mercado", "finance", "banco", "juros",
    "inflação", "dólar", "bolsa", "invest", "pib",
    "taxa", "crédito", "ações"
]

categories = {
    "internacional": {"query": "world OR international news", "lang": "en"},
    "financeiro": {"query": "financas OR banco OR taxa OR inflação", "lang": "pt"},
    "brasil": {"query": "noticias brasil", "lang": "pt"}
}

result = {}
valid = True  # ✅ controls whether we overwrite the file

for key, cat in categories.items():
    query = cat["query"]
    lang = cat["lang"]

    url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&max=5&apikey={API_KEY}"

    try:
        res = requests.get(url)
        data = res.json()
    except Exception as e:
        print(f"Request failed for {key}: {e}")
        valid = False
        continue

    # 🚨 Detect API errors (quota, etc.)
    if "errors" in data:
        print(f"API error for {key}: {data['errors']}")
        valid = False
        continue

    if "articles" not in data:
        print(f"Invalid response for {key}: {data}")
        valid = False
        continue

    articles = data.get("articles", [])
    cleaned = []

    for a in articles:
        title = (a.get("title") or "").lower()
        desc = (a.get("description") or "").lower()

        # ✅ Finance filter
        if key == "financeiro":
            if not any(word in title or word in desc for word in FINANCE_KEYWORDS):
                continue

        if not a.get("title") or not a.get("url"):
            continue

        cleaned.append({
            "title": a.get("title", "Sem título"),
            "description": a.get("description", ""),
            "url": a.get("url", "#"),
            "image": a.get("image") or "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70",
            "source": a.get("source", {}).get("name", "Notícia")
        })

    # Ensure always 3 (visual stability)
    while len(cleaned) < 3:
        cleaned.append({
            "title": "Mais notícias em breve",
            "description": "Conteúdo indisponível no momento",
            "url": "#",
            "image": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70",
            "source": "Sistema"
        })

    result[key] = cleaned[:3]

# 📁 Ensure folder exists
os.makedirs("data", exist_ok=True)

# 🚨 FINAL VALIDATION (critical)
if not result or any(len(result[k]) == 0 for k in result):
    print("Invalid or incomplete data — keeping old news.json")
    valid = False

# ✅ FIRST RUN SAFETY (always create file if missing)
if not os.path.exists("data/news.json"):
    print("No previous file — forcing first write")
    valid = True

# ✅ SAFE WRITE
if valid:
    print("Writing new news.json")
    with open("data/news.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
else:
    print("Skipped update — keeping previous data")
