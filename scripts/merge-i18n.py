import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EN_PATH = ROOT / "lang" / "en.json"

ATTR_PATTERN = re.compile(
    r'<(?P<tag>title|[^>]+)\s(?P<attrs>[^>]*?)data-i18n(?P<kind>-html|-placeholder|-alt|-title)?="(?P<key>[^"]+)"(?P<attrs2>[^>]*?)>(?P<content>.*?)</(?P=tag)>',
    re.IGNORECASE | re.DOTALL,
)

SELF_CLOSING_PATTERN = re.compile(
    r'<(?P<tag>input|textarea|img)\b(?P<attrs>[^>]*?)data-i18n-placeholder="(?P<key>[^"]+)"(?P<attrs2>[^>]*?)(?:placeholder="(?P<placeholder>[^"]*)")?[^>]*/?>',
    re.IGNORECASE | re.DOTALL,
)

ALT_PATTERN = re.compile(
    r'<img\b(?P<attrs>[^>]*?)data-i18n-alt="(?P<key>[^"]+)"(?P<attrs2>[^>]*?)(?:alt="(?P<alt>[^"]*)")?[^>]*/?>',
    re.IGNORECASE | re.DOTALL,
)


def set_nested(obj, key, value):
    parts = key.split(".")
    current = obj
    for part in parts[:-1]:
        if part not in current or not isinstance(current[part], dict):
            if part in current:
                return False
            current[part] = {}
        current = current[part]
    if parts[-1] in current and isinstance(current[parts[-1]], dict):
        return False
    current[parts[-1]] = value
    return True


def get_nested(obj, key):
    current = obj
    for part in key.split("."):
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    return current


def clean_text(value):
    return re.sub(r"\s+", " ", value).strip()


def extract_from_html(html):
    extracted = {}

    for match in ATTR_PATTERN.finditer(html):
        key = match.group("key")
        content = match.group("content")
        kind = match.group("kind") or ""
        value = content.strip() if kind == "-html" else clean_text(content)
        if value:
            extracted[key] = value

    for match in re.finditer(
        r'data-i18n-placeholder="([^"]+)"[^>]*placeholder="([^"]*)"|placeholder="([^"]*)"[^>]*data-i18n-placeholder="([^"]+)"',
        html,
        re.IGNORECASE,
    ):
        key = match.group(1) or match.group(4)
        placeholder = match.group(2) or match.group(3) or ""
        if placeholder:
            extracted[key] = placeholder

    for match in re.finditer(
        r'data-i18n-alt="([^"]+)"[^>]*alt="([^"]*)"|alt="([^"]*)"[^>]*data-i18n-alt="([^"]+)"',
        html,
        re.IGNORECASE,
    ):
        key = match.group(1) or match.group(4)
        alt = match.group(2) or match.group(3) or ""
        if alt:
            extracted[key] = alt

    return extracted


def main():
    en = json.loads(EN_PATH.read_text(encoding="utf-8"))
    merged = json.loads(json.dumps(en))

    for html_path in ROOT.rglob("*.html"):
        if "node_modules" in html_path.parts:
            continue
        html = html_path.read_text(encoding="utf-8")
        for key, value in extract_from_html(html).items():
            if get_nested(merged, key) is None:
                set_nested(merged, key, value)

    EN_PATH.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    all_keys = set()
    for html_path in ROOT.rglob("*.html"):
        if "node_modules" in html_path.parts:
            continue
        html = html_path.read_text(encoding="utf-8")
        for match in re.finditer(r'data-i18n(?:-html|-placeholder|-alt|-title)?="([^"]+)"', html):
            all_keys.add(match.group(1))

    missing = sorted(k for k in all_keys if get_nested(merged, k) is None)
    print(f"Total keys in HTML: {len(all_keys)}")
    print(f"Missing after merge: {len(missing)}")
    if missing:
        print("\n".join(missing[:50]))
        if len(missing) > 50:
            print(f"... and {len(missing) - 50} more")


if __name__ == "__main__":
    main()
