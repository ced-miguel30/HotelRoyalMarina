"""Ensure every lang/*.json file contains the same keys as en.json."""

import json
from pathlib import Path


def flatten(value, prefix=""):
    keys = set()
    if isinstance(value, dict):
        for key, item in value.items():
            path = f"{prefix}.{key}" if prefix else key
            keys.update(flatten(item, path))
    elif isinstance(value, str):
        keys.add(prefix)
    return keys


def main():
    lang_dir = Path(__file__).resolve().parent.parent / "lang"
    en = json.loads((lang_dir / "en.json").read_text(encoding="utf-8"))
    en_keys = flatten(en)

    failed = False
    for path in sorted(lang_dir.glob("*.json")):
        if path.name == "en.json":
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        keys = flatten(data)
        missing = sorted(en_keys - keys)
        extra = sorted(keys - en_keys)
        print(f"{path.name}: {len(keys)} keys")
        if missing:
            failed = True
            print(f"  missing ({len(missing)}): {missing[:5]}")
        if extra:
            failed = True
            print(f"  extra ({len(extra)}): {extra[:5]}")

    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
