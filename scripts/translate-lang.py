"""Generate es.json, de.json, it.json, fr.json from lang/en.json."""

from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

try:
    from deep_translator import GoogleTranslator
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "deep-translator", "-q"])
    from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parent.parent
EN_PATH = ROOT / "lang" / "en.json"
LANG_DIR = ROOT / "lang"
BATCH_SIZE = 40

TARGETS = {
    "es": "es",
    "de": "de",
    "it": "it",
    "fr": "fr",
}

TAG_PATTERN = re.compile(r"(<[^>]+>)")


def protect_markup(text: str) -> tuple[str, list[str]]:
    parts = TAG_PATTERN.split(text)
    placeholders: list[str] = []
    protected_parts: list[str] = []

    for part in parts:
        if part.startswith("<") and part.endswith(">"):
            placeholders.append(part)
            protected_parts.append(f"__TAG_{len(placeholders) - 1}__")
        else:
            protected_parts.append(part)

    return "".join(protected_parts), placeholders


def restore_markup(text: str, placeholders: list[str]) -> str:
    for index, tag in enumerate(placeholders):
        text = text.replace(f"__TAG_{index}__", tag)
    return text


def collect_strings(value, collected: list[str]) -> None:
    if isinstance(value, dict):
        for item in value.values():
            collect_strings(item, collected)
    elif isinstance(value, str) and value.strip():
        collected.append(value)


def rebuild_structure(value, mapping: dict[str, str]):
    if isinstance(value, dict):
        return {key: rebuild_structure(item, mapping) for key, item in value.items()}
    if isinstance(value, str):
        return mapping.get(value, value)
    return value


def translate_unique_strings(strings: list[str], target: str) -> dict[str, str]:
    translator = GoogleTranslator(source="en", target=target)
    unique_strings = list(dict.fromkeys(strings))
    mapping: dict[str, str] = {}
    protected_map: dict[str, tuple[str, list[str]]] = {}

    for text in unique_strings:
        protected_map[text] = protect_markup(text)

    protected_values = [protected_map[text][0] for text in unique_strings]

    print(f"  Translating {len(unique_strings)} unique strings...", flush=True)

    for start in range(0, len(protected_values), BATCH_SIZE):
        batch_original = unique_strings[start : start + BATCH_SIZE]
        batch_protected = protected_values[start : start + BATCH_SIZE]

        for attempt in range(3):
            try:
                translated_batch = translator.translate_batch(batch_protected)
                break
            except Exception as error:
                print(f"  Batch retry {attempt + 1}: {error}", flush=True)
                time.sleep(2 * (attempt + 1))
        else:
            translated_batch = []
            for item in batch_protected:
                translated_batch.append(translator.translate(item))

        for original, translated in zip(batch_original, translated_batch, strict=True):
            _, placeholders = protected_map[original]
            mapping[original] = restore_markup(translated, placeholders)

        print(f"  Progress: {min(start + BATCH_SIZE, len(unique_strings))}/{len(unique_strings)}", flush=True)
        time.sleep(0.4)

    return mapping


def main() -> None:
    en_data = json.loads(EN_PATH.read_text(encoding="utf-8"))
    all_strings: list[str] = []
    collect_strings(en_data, all_strings)

    for lang_code, target in TARGETS.items():
        output_path = LANG_DIR / f"{lang_code}.json"
        if output_path.exists() and output_path.stat().st_size > 1000:
            print(f"Skipping {lang_code}.json (already exists)", flush=True)
            continue

        print(f"Translating to {lang_code}...", flush=True)
        mapping = translate_unique_strings(all_strings, target)
        translated = rebuild_structure(en_data, mapping)
        output_path.write_text(
            json.dumps(translated, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Wrote {output_path}", flush=True)


if __name__ == "__main__":
    main()
