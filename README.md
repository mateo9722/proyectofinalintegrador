# El Bodegón

Proyecto Final Integrador de primer nivel — PUCETEC, Tecnología Superior Universitaria en
Desarrollo de Software.

**Mateo Morejón · Jhon Palma**

Herramienta web para que el dueño de una tienda de barrio registre sus productos una sola vez y
obtenga tres respuestas: qué comprar, qué le conviene vender y cuánto tiene que vender para no
perder.

## Cómo se usa

Abre `index.html` en el navegador. No hay que instalar nada. Los datos se guardan en el propio
navegador, así que se conservan al cerrar la página.

## Pestañas

| Pestaña | Qué responde |
|---------|--------------|
| Productos | Registro de productos con validaciones |
| Reposición | Qué productos hay que reponer y con qué urgencia |
| Rentabilidad | Qué producto deja más ganancia al mes |
| Punto de equilibrio | Cuánto hay que vender al mes para cubrir los gastos fijos |

## Tecnologías

HTML, CSS y JavaScript. Sin librerías, sin servidor, sin base de datos y sin fuentes externas:
la página funciona igual sin internet.

## Estructura

```
index.html          estructura de las cuatro pestañas
styles.css          hoja de estilos
js/storage.js       guardado en el navegador
js/ui.js            navegación y funciones compartidas
js/products.js      registro y validación de productos
js/alerts.js        alertas de reposición
js/profit.js        rentabilidad por producto
js/breakeven.js     punto de equilibrio y gráfico
```
