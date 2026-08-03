"""Update snacks menu i18n keys across all lang files."""

import json
from pathlib import Path

LANG_DIR = Path(__file__).resolve().parent.parent / "lang"

REMOVE_KEYS = ["artisanIceCream", "artisanIceCreamDesc", "cheesecakeBlueberriesDesc"]

SNACKS_UPDATES = {
    "en": {
        "frenchFries": "French Fries",
        "canarianPotatoes": "Canarian Potatoes",
        "brokenEggsHam": "Huevos rotos",
        "brokenEggsHamDesc": "Traditional Spanish dish with eggs, chips and ham.",
        "crispyKingPrawn": "Fried Shrimp",
        "artisanIceCreamLaLechera": "Artisan Ice Cream <em>La lechera</em>®",
        "iceCreamOneScoop": "1 scoop",
        "iceCreamThreeScoops": "3 scoops",
        "tiramisu": "Tiramisu",
        "cheesecakeBlueberries": "Blueberry Cheesecake with Ice Cream",
        "bananaSplit": "Banana Split",
    },
    "es": {
        "frenchFries": "Patatas fritas",
        "brokenEggsHam": "Huevos rotos",
        "brokenEggsHamDesc": "Plato tradicional español con huevos, patatas fritas y jamón.",
        "crispyKingPrawn": "Gambas fritas",
        "artisanIceCreamLaLechera": "Helado artesanal <em>La lechera</em>®",
        "iceCreamOneScoop": "1 bola",
        "iceCreamThreeScoops": "3 bolas",
        "tiramisu": "Tiramisú",
        "cheesecakeBlueberries": "Tarta de queso con arándanos y helado",
        "bananaSplit": "Banana Split",
    },
    "de": {
        "frenchFries": "Pommes frites",
        "canarianPotatoes": "Kanarische Kartoffeln",
        "brokenEggsHam": "Huevos rotos",
        "brokenEggsHamDesc": "Traditionelles spanisches Gericht mit Eiern, Pommes und Schinken.",
        "crispyKingPrawn": "Frittierte Garnelen",
        "artisanIceCreamLaLechera": "Handgemachtes Eis <em>La lechera</em>®",
        "iceCreamOneScoop": "1 Kugel",
        "iceCreamThreeScoops": "3 Kugeln",
        "tiramisu": "Tiramisu",
        "cheesecakeBlueberries": "Blaubeer-Käsekuchen mit Eis",
        "bananaSplit": "Banana Split",
    },
    "fr": {
        "frenchFries": "Frites",
        "canarianPotatoes": "Pommes de terre canariennes",
        "brokenEggsHam": "Huevos rotos",
        "brokenEggsHamDesc": "Plat traditionnel espagnol aux œufs, frites et jambon.",
        "crispyKingPrawn": "Crevettes frites",
        "artisanIceCreamLaLechera": "Glace artisanale <em>La lechera</em>®",
        "iceCreamOneScoop": "1 boule",
        "iceCreamThreeScoops": "3 boules",
        "tiramisu": "Tiramisu",
        "cheesecakeBlueberries": "Cheesecake aux myrtilles avec glace",
        "bananaSplit": "Banana Split",
    },
    "it": {
        "frenchFries": "Patatine fritte",
        "canarianPotatoes": "Patate canarie",
        "brokenEggsHam": "Huevos rotos",
        "brokenEggsHamDesc": "Piatto tradizionale spagnolo con uova, patatine fritte e prosciutto.",
        "crispyKingPrawn": "Gamberi fritti",
        "artisanIceCreamLaLechera": "Gelato artigianale <em>La lechera</em>®",
        "iceCreamOneScoop": "1 pallina",
        "iceCreamThreeScoops": "3 palline",
        "tiramisu": "Tiramisù",
        "cheesecakeBlueberries": "Cheesecake ai mirtilli con gelato",
        "bananaSplit": "Banana Split",
    },
}


def main():
    for lang_file in sorted(LANG_DIR.glob("*.json")):
        lang = lang_file.stem
        data = json.loads(lang_file.read_text(encoding="utf-8"))
        items = data["marinaRestaurant"]["snacks"]["items"]

        for key in REMOVE_KEYS:
            items.pop(key, None)

        if lang in SNACKS_UPDATES:
            items.update(SNACKS_UPDATES[lang])

        lang_file.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Updated {lang_file.name}")


if __name__ == "__main__":
    main()
