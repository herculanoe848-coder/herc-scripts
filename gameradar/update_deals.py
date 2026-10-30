#!/usr/bin/env python3
"""Atualiza o catálogo de ofertas brasileiras da Steam para o GameRadar BR."""
import json
import os
import urllib.request
from datetime import datetime, timezone

URL = "https://store.steampowered.com/api/featuredcategories/?cc=br&l=brazilian"
OUTPUT = "gameradar/deals.json"


def main():
    request = urllib.request.Request(
        URL,
        headers={"User-Agent": "GameRadarBR/1.0 (+https://herculanoe848-coder.github.io/herc-scripts/gameradar/)"}
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))

    deals = []
    seen = set()
    for category in ("specials", "top_sellers", "new_releases"):
        bucket = payload.get(category) or {}
        for item in bucket.get("items") or []:
            app_id = str(item.get("id") or item.get("appid") or "")
            currency = str(item.get("currency") or "").upper()
            if not app_id or app_id in seen or currency != "BRL":
                continue
            original_raw = item.get("original_price")
            sale_raw = item.get("final_price")
            if original_raw is None or sale_raw is None:
                continue
            original = int(original_raw) / 100
            sale = int(sale_raw) / 100
            discount = int(item.get("discount_percent") or 0)
            if not (sale > 0 and original > sale and discount > 0):
                continue
            seen.add(app_id)
            deals.append({
                "dealID": "steam-" + app_id,
                "storeID": "steam",
                "storeName": "Steam (Brasil)",
                "title": item.get("name") or "Jogo Steam",
                "salePrice": round(sale, 2),
                "normalPrice": round(original, 2),
                "savings": discount,
                "dealRating": 0,
                "thumb": item.get("header_image") or "",
                "dealURL": "https://store.steampowered.com/app/" + app_id + "/?l=brazilian&cc=br",
                "currency": "BRL"
            })

    output = {
        "source": URL,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(deals),
        "deals": deals
    }
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as file:
        json.dump(output, file, ensure_ascii=False, indent=2)
    print(f"Catálogo atualizado: {len(deals)} ofertas brasileiras verificadas.")


if __name__ == "__main__":
    main()
