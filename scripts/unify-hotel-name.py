"""Replace legacy hotel name variants with Royal Marina Suites."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REPLACEMENTS = [
    ("Royal Marina Suites Boutique Hotel Lanzarote", "Royal Marina Suites"),
    ("Royal Marina Suites Boutique Hotel", "Royal Marina Suites"),
    ("Royal Marina Suites Boutique", "Royal Marina Suites"),
]

LOGO_UPDATES = {
    "en": "Lanzarote",
    "es": "Lanzarote",
    "de": "Lanzarote",
    "fr": "Lanzarote",
    "it": "Lanzarote",
}

SUBTITLE_UPDATES = {
    "en": "Family-Owned Suites",
    "es": "Suites de propiedad familiar",
    "de": "Familiengeführte Suites",
    "fr": "Suites familiales",
    "it": "Suite a conduzione familiare",
}


def replace_in_text(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text


def main():
    updated_files = []

    for path in sorted(ROOT.rglob("*")):
        if path.suffix not in {".html", ".json", ".js", ".md"}:
            continue
        if "node_modules" in path.parts:
            continue

        original = path.read_text(encoding="utf-8")
        updated = replace_in_text(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            updated_files.append(path.relative_to(ROOT))

    import json

    for lang_file in sorted((ROOT / "lang").glob("*.json")):
        lang = lang_file.stem
        data = json.loads(lang_file.read_text(encoding="utf-8"))
        changed = False

        if lang in LOGO_UPDATES:
            hero = data.get("home", {}).get("hero", {})
            if hero.get("logo") != LOGO_UPDATES[lang]:
                hero["logo"] = LOGO_UPDATES[lang]
                changed = True

        if lang in SUBTITLE_UPDATES:
            about_hero = data.get("about", {}).get("hero", {})
            if about_hero.get("subtitle") != SUBTITLE_UPDATES[lang]:
                about_hero["subtitle"] = SUBTITLE_UPDATES[lang]
                changed = True

        if changed:
            lang_file.write_text(
                json.dumps(data, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            rel = lang_file.relative_to(ROOT)
            if rel not in updated_files:
                updated_files.append(rel)

    print(f"Updated {len(updated_files)} files:")
    for rel in updated_files:
        print(f"  - {rel}")


if __name__ == "__main__":
    main()
