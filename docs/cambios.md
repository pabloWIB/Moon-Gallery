# Registro de cambios — reorganización de Moon Gallery

Fecha: 2026-07-31. Trabajo local, sin operaciones de git.
Estado de partida documentado en [auditoria.md](auditoria.md).

---

## Fase 1 — Auditoría

- Inventario completo en `docs/auditoria.md`: 1 HTML, 6 CSS, 1 JS, 7 imágenes, 2 dependencias externas.
- Detectados 28,9 KB de CSS muerto (71 % del total), 4,8 MB de imágenes y cero media queries.
- Búsqueda de credenciales en todo el código: sin resultados.

## Fase 2 — Estructura

- Creada la jerarquía `assets/{css,js,img}` y `docs/`.
- `CSS/` → `assets/css/` repartido en `base.css`, `layout.css` y `components.css`.
- `JS/script.js` → `assets/js/main.js` + `assets/js/modules/gallery.js`.
- `IMG/` → `assets/img/content/` (fotografías) y `assets/img/logo/` (marca).
- Todos los nombres pasados a minúsculas con guiones y sin números de versión.
- Actualizadas todas las rutas en HTML, CSS y JS; verificado que ninguna quedó rota.

## Fase 3 — Higiene

**Eliminados:**

| Archivo | Motivo |
|---|---|
| `CSS/sytles.css` | Huérfano, nombre mal escrito, `background: red` de plantilla |
| `CSS/styles.scss` | Se abandona el paso de compilación Sass |
| `CSS/prepros.config` | 23,9 KB de configuración de una herramienta local |
| `CSS/styles.css` | Sustituido por los tres archivos nuevos |
| `CSS/normalize.css` | Fusionado en `base.css`, solo con las reglas que el sitio usa |
| `CSS/fonts.css` | 4 familias importadas, 1 usada. Sustituido por `<link>` en el `<head>` |
| `JS/script.js` | Reescrito en vanilla JS |
| `IMG/instagram.png`, `IMG/rubix.png` | Iconos sin ningún destino real al que enlazar |
| `IMG/linked.png` | Sustituido por SVG inline |
| `Moon-Gallery.png` | 229 KB sin referenciar tras generar el favicon real |

- Eliminada la dependencia de **jQuery slim 3.0.0-beta1** desde cdnjs.
- Creado `.gitignore` para stack estático: `node_modules/`, `.env`, `dist/`, `.vercel/`, `*.log`, `.DS_Store`, `Thumbs.db`, `desktop.ini`, `prepros.config`.
- Normalizado el formato: 2 espacios de indentación, comillas dobles en HTML, punto y coma en JS, salto de línea final en todos los archivos. Cero tabuladores.

## Fase 4 — Imágenes

| Antes | Después | Reducción |
|---|---|---|
| `photo1.jpg` 1.742 KB, 5472 px | `moon-monochrome.webp` 16,5 KB, 1920 px | −99,1 % |
| `photo3.jpg` 2.634 KB, 5472 px | `moon-amber.webp` 21,3 KB, 1920 px | −99,2 % |
| `photo2.jpg` 450 KB, 1920 px | `wave-ridges.webp` 241 KB, 1920 px | −46,4 % |
| `Moon-Gallery.png` 229 KB, 1024 px | `favicon-32.png` 1,3 KB + `moon-gallery-mark.png` 12 KB | −94,1 % |

- **Total de imágenes: 4.827 KB → 331 KB (−93 %).**
- Generadas miniaturas de 400 px para la vista previa de la foto siguiente.
- Generada `og-cover.jpg` de 1200 × 630 recortada de la foto ámbar, para Open Graph.
- Las dos fotos que eran `background` de CSS pasan a ser `<img>` reales: ahora tienen `alt`, `width`, `height` y carga diferida.
- `width` y `height` en todas las imágenes; `loading="lazy"` en todas menos la primera, que lleva `fetchpriority="high"`.
- `alt` descriptivo y real en cada fotografía; la miniatura de vista previa es decorativa y lleva `alt=""`.

## Fase 5 — HTML, SEO y accesibilidad

- Reestructurado el marcado: `<header class="panel">` para la marca y los controles, `<main class="stage">` para la galería. El `<footer>` que colgaba dentro de `<main>` desaparece.
- Jerarquía de encabezados corregida a `h1` (Moon Gallery) → `h2` (Abstract Nature). El resto del texto deja de ser encabezados de adorno.
- La palabra rotada «Gallery» pasa a ser decorativa con `aria-hidden`, en lugar de un `h2`.
- `<head>` completo: `title` y `description` únicos por página, `canonical`, Open Graph con `og:image` real, favicon y apple-touch-icon.
- Los controles anterior/siguiente pasan de `<div>` a `<button type="button">` con `aria-label`: reciben foco y responden al teclado.
- Añadida navegación completa con flechas izquierda y derecha del teclado.
- La galería se anuncia con `role="group"`, `aria-roledescription="carousel"` y `aria-labelledby`; el pie de foto es una región `aria-live="polite"`.
- Anillo de foco visible en todos los elementos interactivos, con color sensible a la superficie: tinta sobre el panel claro, ámbar sobre la fotografía. El ámbar sobre el panel solo daba 1,89:1 y no cumplía el 3:1 exigido.
- Creados `robots.txt`, `sitemap.xml` y `404.html`.
- Añadidos datos estructurados `Person` con `sameAs` hacia wib.digital, Fiverr, LinkedIn y GitHub.

**Contenido de plantilla eliminado:**

| Texto retirado | Sustituido por |
|---|---|
| `140 photos` | `3 photos` — el número real |
| `50k+` / `14k+` y sus párrafos | Nada. Cifras inventadas sin respaldo |
| `Travels to interesnting places…` | Nada. Relleno con falta de ortografía |
| `Photographs that attract attentions.` | Pie de foto real de cada fotografía |
| `02` / `Most popular spaces` | Contador real `01 / 03` sincronizado con la galería |
| `Blog` | Nada. No existe ningún blog |
| `© 2023` | Nada. Sustituido por la línea de crédito con enlaces reales |
| `Space` como título | `Moon Gallery`, el nombre real del proyecto |
| 3 enlaces `href="#"` | 2 enlaces reales: LinkedIn y GitHub |

## Fase 6 — CSS y sistema de diseño

- Paleta extraída a variables en `:root`, derivada de los colores que el sitio ya usaba: `#dfdfdf` panel, `#262626` tinta, `#db993d` acento, `#1a1a1a` fondo.
- Escala de espaciado de 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 px. Eliminados los valores mágicos: `gap: 330px`, `left: 52%`, `margin-right: -5.5px`, `height: 280px`, `font-size: 11.5px`.
- Escala tipográfica coherente en `rem`. Una sola familia: Montserrat (antes se importaban cuatro y se usaba una).
- Eliminadas ~90 líneas de prefijos `-webkit-box` / `-ms-flexbox` generadas por Autoprefixer.
- Ningún selector pasa de 3 niveles (el más profundo antes tenía 6). Cero estilos inline. Cero reglas duplicadas.
- El único `!important` que queda es el bloque estándar de `prefers-reduced-motion`.
- Orden interno de cada archivo: variables → reset → base → layout → componentes → utilidades → media queries.

## Fase 7 — Responsive

- De cero media queries a un sistema mobile-first con `min-width` en 480 / 768 / 1024 / 1440 px.
- Por debajo de 1024 px el panel es una barra inferior, al alcance del pulgar; a partir de 1024 px se convierte en la barra lateral del diseño original.
- Corregido un fallo de colocación: el panel se quedaba con el `1fr` de la rejilla por orden del DOM y dejaba la fotografía reducida a una franja. Ahora ambas áreas se colocan de forma explícita.
- Por debajo de 480 px el pie de foto y el crédito se apilan, y la vista previa se oculta por ser una segunda ruta al mismo botón «siguiente».
- Verificado sin scroll horizontal ni vertical en 360, 768, 1024 y 1440 px.
- Todas las áreas táctiles llegan a 44 × 44 px. Los enlaces del crédito lo consiguen con relleno vertical, que amplía el área de pulsación sin alterar la línea de texto.

## Fase 8 — UX / UI

- La galería tiene ahora un CTA claro por pantalla y una jerarquía visual que se lee en segundos: marca, colección, contador, pie de foto.
- Estados definidos en todos los elementos interactivos: reposo, hover, foco y activo, con transiciones de 150–200 ms.
- Degradados de legibilidad en la parte superior e inferior de la fotografía, calibrados para que el texto supere 4,5:1 incluso sobre las zonas blancas de la foto de crestas. Son funcionales, no decorativos.
- Sin formularios: el proyecto no está conectado a ningún servicio, así que no se finge ninguno. El contacto es un enlace real a wib.digital y a Fiverr.
- Las medidas de línea del pie de foto se limitan a 32 caracteres, muy por debajo del máximo de 75.

## Fase 9 — JavaScript

- Eliminado jQuery. El código pasa de 2 bloques `$(function(){})` duplicados a un módulo con un único punto de entrada.
- **Corregido el fallo principal:** anterior y siguiente ejecutaban ambos `toggleClass("nn")`, así que hacían lo mismo. Ahora hay un índice real que avanza, retrocede y da la vuelta en los dos sentidos.
- La tercera fotografía entra en la rotación. Antes `photo2.jpg` quedaba fuera de la galería como adorno.
- El contador, el pie de foto y la vista previa se derivan del estado; no hay contenido duplicado entre HTML y JS.
- Sin `var`, sin variables globales sueltas (un único objeto `window.MoonGallery`), con delegación de eventos y comprobación de existencia antes de operar sobre cada elemento.
- Se usan scripts clásicos con `defer` en lugar de módulos ES, para que la página también funcione al abrir `index.html` directamente desde el disco.

## Fase 10 — Rendimiento

- Peso de la primera carga: **~340 KB** frente a los ~5 MB anteriores. Objetivo de 1 MB cumplido con margen.
- 13 peticiones, todas correctas.
- Fuentes con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`, y `display=swap`. Antes se cargaban con `@import` encadenado dentro de un CSS, que bloquea en serie.
- Scripts con `defer`.
- Los tres archivos CSS se mantienen bloqueantes de forma deliberada: en un diseño a pantalla completa todo el contenido está sobre el pliegue, así que diferirlos provocaría un parpadeo sin ganar nada. Suman 14 KB.

## Fase 11 — QA

Verificado en Chrome, en servidor local y abriendo el archivo directamente:

- Enlaces del menú y del pie: todos llevan a un destino real.
- Rutas de imagen: todas corresponden a un archivo en disco. Cero imágenes rotas.
- `<link>` y `<script>`: todos apuntan a archivos existentes.
- Cero errores y cero avisos en consola, en las dos páginas.
- Sin scroll horizontal en 360, 768, 1024 y 1440 px.
- Galería: avanza, retrocede, da la vuelta en los dos sentidos, responde al teclado y a la vista previa.
- Sin `Lorem ipsum`, `TODO` ni texto de plantilla.
- `title` y `description` únicos en ambas páginas.
- `404.html` existe y enlaza de vuelta al inicio.
- Sin credenciales en el código.
- Sin rutas absolutas de la máquina local.

## Fase 12 — Documentación

- `docs/auditoria.md` con el inventario y los problemas del estado de partida.
- Este registro.
- `README.md` actualizado: nueva estructura, sin Sass, sin jQuery, y sin la sección de problemas conocidos, que ya no aplica.

## Fase 13 — Deploy

- Verificado con `npx serve` y abriendo `index.html` directamente desde el disco.
- Todas las rutas internas son relativas y en minúsculas.
- No se ha creado configuración de hosting: el proyecto es estático y no se ha indicado ningún destino que la requiera.
