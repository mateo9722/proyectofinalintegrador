import json


def create_product(name, cost, price, stock, sold):
    return {
        "name": name,
        "cost": cost,
        "price": price,
        "stock": stock,
        "sold": sold
    }


def save_products(products):
    with open("products.json", "w", encoding="utf-8") as file:
        json.dump(products, file, ensure_ascii=False, indent=4)


def main():
    products = []

    products.append(create_product("Arroz 1 kg", 1.20, 1.60, 5, 120))
    products.append(create_product("Leche 1 litro", 0.85, 1.10, 10, 30))
    products.append(create_product("Atún", 1.50, 2.25, 2, 40))
    products.append(create_product("Galletas", 0.40, 0.75, 20, 0))

    save_products(products)
    print("Archivo products.json creado correctamente.")


if __name__ == "__main__":
    main()