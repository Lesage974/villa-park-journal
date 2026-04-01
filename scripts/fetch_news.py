import requests
import json
import os

API_KEY = os.getenv("GNEWS_API_KEY")

categories = {
    "internacional": "world news",
    "financeiro": "finance economy markets",
    "brasil": "brasil noticias"
}

result = {}

for key, query in categories.items():
    url = f"https://gnews.io/api/v4/search?q={query}&lang=pt&max=3&apikey={API_KEY}"
    
    res = requests.get(url)
    data = res.json()

    result[key] = [
        {
            "title": a.get("title"),
            "description": a.get("description"),
            "url": a.get("url"),
            "image": a.get("image"),
            "source": a.get("source", {}).get("name", "Notícia")
        }
        for a in data.get("articles", [])
    ]

os.makedirs("data", exist_ok=True)

with open("data/news.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
