"""Apply menu copy corrections across all lang/*.json files."""

import json
from pathlib import Path


def deep_update(target: dict, updates: dict) -> None:
    for key, value in updates.items():
        if isinstance(value, dict) and isinstance(target.get(key), dict):
            deep_update(target[key], value)
        else:
            target[key] = value


def delete_key(data: dict, path: str) -> None:
    parts = path.split(".")
    node = data
    for part in parts[:-1]:
        node = node[part]
    node.pop(parts[-1], None)


LANG_DIR = Path(__file__).resolve().parent.parent / "lang"

# Keys to remove from all languages (must stay in sync)
DELETE_PATHS = [
    "marinaRestaurant.breakfast.items.colaCao",
    "marinaRestaurant.breakfastInSuite.form.options.colaCao",
    "marinaRestaurant.poolBar.items.colaCao",
]

UPDATES = {
    "en": {
        "marinaRestaurant": {
            "breakfast": {
                "items": {
                    "illyCoffeeDesc": "Prepared to your preference.",
                    "espresso": "Espresso",
                    "americano": "Americano",
                    "latte": "Latte — 3.50€",
                    "cappuccino": "Cappuccino",
                    "mochaccino": "Mochaccino",
                    "decaffeinatedCoffee": "Decaffeinated Coffee",
                    "teaHerbalInfusions": "Tea Selection",
                },
            },
            "breakfastInSuite": {
                "form": {
                    "options": {
                        "mochaccino": "Mochaccino",
                    }
                }
            },
            "poolBar": {
                "items": {
                    "cavaSangriaHalfL": "Cava Sangria 1/2L",
                }
            },
            "snacks": {
                "items": {
                    "baoBunTeriyaki": "Bao Bun with Teriyaki",
                    "crispyKingPrawn": "Crispy Prawns",
                }
            },
            "bbqNight": {
                "intro": {
                    "text": "Enjoy a grill experience for a relaxed Friday evening. Guests may choose between a vegetable, fish or meat option, subject to availability."
                }
            },
        },
        "guide": {
            "beaches": {"famara": {"title": "Famara"}},
        },
        "hotelInfo": {
            "minibar": {
                "oceanMarina": "<strong>Ocean Suites & Marina Suites:</strong> Complimentary bottle of water & two premium illy® coffee capsules."
            },
            "housekeeping": {
                "daily": "<strong>Daily Housekeeping</strong><br>\n        Our housekeeping service is available until <strong>3:00 PM.</strong>",
                "doNotDisturb": "<strong>Do Not Disturb Sign</strong><br>\n        We kindly ask guests not to leave the \"Do Not Disturb\" sign outside the room after <strong>1:30 PM</strong>.",
            },
        },
        "reception": {
            "excursions": {
                "firstMinuteTours": "First Minute Tours",
                "waterbus": "Waterbus",
                "submarineSafaris": "Submarine Safaris",
                "canarytrip": "Canarytrip",
                "catlanza": "Catlanza",
            }
        },
    },
    "es": {
        "marinaRestaurant": {
            "breakfast": {
                "categories": {"toasts": "Tostadas"},
                "items": {
                    "friedEggs": "Huevos fritos",
                    "poachedEggs": "Huevos escalfados",
                    "boiledEggs": "Huevos duros",
                    "softBoiledEggs": "Huevos pasados por agua",
                    "toastOfTheDay": "Tostada del día",
                    "frenchToast": "Tostada francesa",
                    "illyCoffee": "Café Illy",
                    "illyCoffeeDesc": "Preparado a tu preferencia.",
                    "espresso": "Expreso",
                    "americano": "Americano",
                    "latte": "Café con leche — 3,50 €",
                    "cappuccino": "Capuchino",
                    "mochaccino": "Moccachino",
                    "decaffeinatedCoffee": "Descafeinado",
                    "freshOrangeJuice": "Zumo de naranja recién exprimido",
                    "teaHerbalInfusions": "Selección de tés",
                },
            },
            "breakfastInSuite": {
                "form": {
                    "options": {
                        "friedEggs": "Huevos fritos",
                        "poachedEggs": "Huevos escalfados",
                        "boiledEggs": "Huevos duros",
                        "softBoiledEggs": "Huevos pasados por agua",
                        "toastOfTheDay": "Tostada del día",
                        "frenchToast": "Tostada francesa",
                        "espresso": "Expreso",
                        "americano": "Americano",
                        "latte": "Café con leche",
                        "mochaccino": "Moccachino",
                        "decaffeinatedCoffee": "Descafeinado",
                        "freshOrangeJuice": "Zumo de naranja fresco",
                        "wholeMilk": "Leche entera",
                        "oatMilk": "Leche de avena",
                        "soyMilk": "Leche de soja",
                        "almondMilk": "Leche de almendras",
                        "noMilk": "Sin leche",
                    }
                }
            },
            "poolBar": {
                "nav": {
                    "spirits": "Licores",
                    "smoothies": "Batidos",
                },
                "items": {
                    "pinaColada": "Piña Colada",
                    "royalMarina": "Royal Marina",
                    "sexOnTheBeach": "Sex on the Beach",
                    "cavaSangriaHalfL": "Sangría de cava 1/2L",
                    "glassOfWine": "Copa de vino",
                    "ederraRueda": "Ederra D.O. Rueda",
                    "coronita": "Coronita",
                    "largeNaoDraft": "Cerveza de barril Nao grande",
                    "beefeater": "Beefeater",
                    "gordons": "Gordon's",
                    "tanqueray": "Tanqueray",
                    "martinMillers": "Martin Miller's",
                    "magno": "Magno",
                    "carlosI": "Carlos I",
                    "absolut": "Absolut",
                    "greyGoose": "Grey Goose",
                    "martiniBianco": "Martini Bianco",
                    "espresso": "Expreso",
                    "americano": "Americano",
                    "latte": "Café con leche",
                    "irishCoffee": "Café irlandés",
                    "hotChocolateWithCream": "Chocolate caliente con crema",
                    "forestFruitsSmoothie": "Batido de frutas del bosque",
                    "cocaCola": "Coca-Cola",
                    "fantaOrange": "Fanta Naranja",
                    "fantaLemon": "Fanta Limón",
                    "sprite": "Sprite",
                    "royalBlissTonic": "Royal Bliss Tonic",
                },
            },
            "snacks": {
                "items": {
                    "goatCheeseSalad": "Ensalada de queso de cabra y fresas",
                    "caesarSaladDesc": "Pollo empanado, tocino crujiente, tomates cherry, virutas de parmesano y picatostes de pan crujiente.",
                    "canarianPotatoesDesc": "Servido con salsa mojo tradicional de la isla.",
                    "iberianHamCroquettes": "Croquetas caseras de jamón ibérico",
                    "baoBunTeriyaki": "Pan Bao con Teriyaki",
                    "baoBunTeriyakiDesc": "Pan bao con semillas de sésamo, pechuga de pollo, cebolla, salsa teriyaki, salsa de soja y aceite de oliva virgen extra.",
                    "salmonTartare": "Tartar de salmón con aguacate",
                    "crispyKingPrawn": "Langostinos crujientes",
                },
            },
            "bbqNight": {
                "intro": {
                    "text": "Disfrute de una experiencia de parrilla para una relajada noche de viernes. Los huéspedes podrán elegir entre opción de verdura, pescado o carne, sujeto a disponibilidad."
                },
                "options": {
                    "meat": {"title": "Parrilla de carne"},
                },
            },
        },
        "guide": {
            "beaches": {"famara": {"title": "Famara"}},
            "diningOutside": {
                "bodegaDeUga": {
                    "title": "Bodega de Uga",
                    "imageAlt": "Bodega de Uga",
                }
            },
        },
        "hotelInfo": {
            "minibar": {
                "oceanMarina": "<strong>Suites Océano y Suites Marina:</strong> Botella de agua y dos cápsulas de café illy® premium de cortesía."
            },
            "housekeeping": {
                "daily": "<strong>Limpieza diaria</strong><br>\n        Nuestro servicio de limpieza está disponible hasta las <strong>3:00 p. m.</strong>",
                "doNotDisturb": "<strong>Señal de No molestar</strong><br>\n        Rogamos a los huéspedes que no dejen el cartel de \"No molestar\" fuera de la habitación después de las <strong>1:30 p. m.</strong>",
            },
        },
        "reception": {
            "excursions": {
                "firstMinuteTours": "First Minute Tours",
                "waterbus": "Waterbus",
                "submarineSafaris": "Submarine Safaris",
                "canarytrip": "Canarytrip",
                "catlanza": "Catlanza",
            }
        },
    },
    "de": {
        "marinaRestaurant": {
            "breakfast": {
                "items": {
                    "illyCoffeeDesc": "Nach Ihren Wünschen zubereitet.",
                    "espresso": "Espresso",
                    "americano": "Americano",
                    "latte": "Milchkaffee — 3,50 €",
                    "cappuccino": "Cappuccino",
                    "mochaccino": "Mokaccino",
                    "decaffeinatedCoffee": "Entkoffeinierter Kaffee",
                    "teaHerbalInfusions": "Teeauswahl",
                }
            },
            "breakfastInSuite": {
                "form": {
                    "options": {
                        "toastOfTheDay": "Toast des Tages",
                        "mochaccino": "Mokaccino",
                    }
                }
            },
            "poolBar": {
                "nav": {"spirits": "Spirituosen"},
                "items": {
                    "sexOnTheBeach": "Sex on the Beach",
                    "cavaSangriaHalfL": "Cava-Sangria 1/2L",
                    "espresso": "Espresso",
                    "orangeJuice": "Orangensaft",
                },
            },
            "snacks": {
                "items": {
                    "baoBunTeriyaki": "Bao-Bun mit Teriyaki",
                    "crispyKingPrawn": "Knusprige Garnelen",
                }
            },
            "bbqNight": {
                "intro": {
                    "text": "Genießen Sie ein Grill-Erlebnis für einen entspannten Freitagabend. Gäste können je nach Verfügbarkeit zwischen Gemüse-, Fisch- oder Fleischoption wählen."
                }
            },
        },
        "guide": {"beaches": {"famara": {"title": "Famara"}}},
        "hotelInfo": {
            "minibar": {
                "oceanMarina": "<strong>Ocean-Suites & Marina-Suites:</strong> Kostenlose Flasche Wasser und zwei Premium-illy®-Kaffeekapseln."
            }
        },
        "reception": {
            "excursions": {
                "firstMinuteTours": "First Minute Tours",
                "waterbus": "Waterbus",
                "submarineSafaris": "Submarine Safaris",
                "canarytrip": "Canarytrip",
                "catlanza": "Catlanza",
            }
        },
    },
    "fr": {
        "marinaRestaurant": {
            "breakfast": {
                "items": {
                    "illyCoffeeDesc": "Préparé selon vos préférences.",
                    "espresso": "Expresso",
                    "americano": "Américano",
                    "latte": "Café au lait — 3,50 €",
                    "cappuccino": "Cappuccino",
                    "mochaccino": "Mochaccino",
                    "decaffeinatedCoffee": "Café décaféiné",
                    "teaHerbalInfusions": "Sélection de thés",
                }
            },
            "breakfastInSuite": {
                "form": {"options": {"mochaccino": "Mochaccino"}}
            },
            "poolBar": {
                "nav": {"spirits": "Spiritueux"},
                "items": {
                    "sexOnTheBeach": "Sex on the Beach",
                    "cavaSangriaHalfL": "Sangria au cava 1/2L",
                    "espresso": "Expresso",
                    "orangeJuice": "Jus d'orange",
                },
            },
            "snacks": {
                "items": {
                    "baoBunTeriyaki": "Bao Bun au Teriyaki",
                    "crispyKingPrawn": "Crevettes croustillantes",
                }
            },
            "bbqNight": {
                "intro": {
                    "text": "Profitez d'une expérience grill pour une soirée du vendredi détendue. Les clients peuvent choisir entre une option légumes, poisson ou viande, sous réserve de disponibilité."
                }
            },
        },
        "guide": {"beaches": {"famara": {"title": "Famara"}}},
        "hotelInfo": {
            "minibar": {
                "oceanMarina": "<strong>Suites Océan et Suites Marina :</strong> Bouteille d'eau et deux capsules de café illy® premium offertes."
            }
        },
        "reception": {
            "excursions": {
                "firstMinuteTours": "First Minute Tours",
                "waterbus": "Waterbus",
                "submarineSafaris": "Submarine Safaris",
                "canarytrip": "Canarytrip",
                "catlanza": "Catlanza",
            }
        },
    },
    "it": {
        "marinaRestaurant": {
            "breakfast": {
                "items": {
                    "toastOfTheDay": "Toast del giorno",
                    "illyCoffeeDesc": "Preparato secondo le tue preferenze.",
                    "espresso": "Espresso",
                    "americano": "Americano",
                    "latte": "Caffè latte — 3,50 €",
                    "cappuccino": "Cappuccino",
                    "mochaccino": "Mochaccino",
                    "decaffeinatedCoffee": "Caffè decaffeinato",
                    "teaHerbalInfusions": "Selezione di tè",
                }
            },
            "breakfastInSuite": {
                "form": {
                    "options": {
                        "toastOfTheDay": "Toast del giorno",
                        "mochaccino": "Mochaccino",
                    }
                }
            },
            "poolBar": {
                "nav": {"spirits": "Liquori"},
                "items": {
                    "sexOnTheBeach": "Sex on the Beach",
                    "cavaSangriaHalfL": "Sangria al cava 1/2L",
                    "espresso": "Espresso",
                    "orangeJuice": "Succo d'arancia",
                },
            },
            "snacks": {
                "items": {
                    "baoBunTeriyaki": "Pan Bao con Teriyaki",
                    "baoBunTeriyakiDesc": "Pan bao con semi di sesamo, petto di pollo, cipolla, salsa teriyaki, salsa di soia e olio extravergine di oliva.",
                    "crispyKingPrawn": "Gamberi croccanti",
                }
            },
            "bbqNight": {
                "intro": {
                    "text": "Goditi un'esperienza alla griglia per un rilassante venerdì sera. Gli ospiti possono scegliere tra opzione verdure, pesce o carne, soggetto a disponibilità."
                }
            },
        },
        "guide": {"beaches": {"famara": {"title": "Famara"}}},
        "hotelInfo": {
            "minibar": {
                "oceanMarina": "<strong>Suite Ocean e Suite Marina:</strong> Bottiglia d'acqua in omaggio e due capsule di caffè Premium illy®."
            }
        },
        "reception": {
            "excursions": {
                "firstMinuteTours": "First Minute Tours",
                "waterbus": "Waterbus",
                "submarineSafaris": "Submarine Safaris",
                "canarytrip": "Canarytrip",
                "catlanza": "Catlanza",
            }
        },
    },
}


def main():
    for lang_file in sorted(LANG_DIR.glob("*.json")):
        lang = lang_file.stem
        data = json.loads(lang_file.read_text(encoding="utf-8"))

        if lang in UPDATES:
            deep_update(data, UPDATES[lang])

        for path in DELETE_PATHS:
            delete_key(data, path)

        lang_file.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Updated {lang_file.name}")


if __name__ == "__main__":
    main()
