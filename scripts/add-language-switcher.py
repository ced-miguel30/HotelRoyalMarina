"""Add language switcher markup to HTML pages that do not already have one."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SWITCHER = """
<div class="language-switcher">
  <a href="?lang=en" data-lang="en">EN</a>
  <a href="?lang=es" data-lang="es">ES</a>
  <a href="?lang=de" data-lang="de">DE</a>
  <a href="?lang=it" data-lang="it">IT</a>
  <a href="?lang=fr" data-lang="fr">FR</a>
</div>
""".strip()


def css_link(depth: int) -> str:
    prefix = "../" * depth
    return f'<link rel="stylesheet" href="{prefix}css/language-switcher.css">'


def update_file(path: Path) -> bool:
    html = path.read_text(encoding="utf-8")
    if "language-switcher" in html:
        return False

    depth = len(path.relative_to(ROOT).parts) - 1
    css = css_link(depth)

    if css not in html:
        html = html.replace("</head>", f"{css}\n</head>", 1)

    html = html.replace("<body>", f"<body>\n\n{SWITCHER}\n", 1)
    path.write_text(html, encoding="utf-8")
    return True


def main() -> None:
    updated = 0
    for path in ROOT.rglob("*.html"):
        if update_file(path):
            updated += 1
            print(f"Updated {path.relative_to(ROOT)}")
    print(f"Added switcher to {updated} files")


if __name__ == "__main__":
    main()
