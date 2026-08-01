# Auditoría — Moon Gallery

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

Fecha de auditoría: 2026-07-31

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Veredicto |
|---|---|---|---|---|
| `index.html` | `Space` | `Space` | Única página. Galería a pantalla completa: barra lateral clara con marca y controles, panel derecho con la foto de fondo | Se conserva y se reescribe |

No existía `404.html`.

## 2. Archivos CSS

| Archivo | Peso | ¿Cargado? | Contenido | Veredicto |
|---|---|---|---|---|
| `CSS/normalize.css` | 2,4 KB | Sí | Normalize.css minificado en una línea + estilos de scrollbar | Fusionado en `assets/css/base.css` |
| `CSS/styles.css` | 8,8 KB | Sí | Salida compilada de `styles.scss`, con prefijos `-webkit-box` de Autoprefixer | Reescrito en 3 archivos |
| `CSS/fonts.css` | 553 B | Sí | 2 `@import` de Google Fonts + 3 `@import` comentados | Eliminado; las fuentes pasan a `<link>` en el `<head>` |
| `CSS/styles.scss` | 4,1 KB | No (fuente) | Origen Sass de `styles.css` | Eliminado; se abandona el paso de compilación |
| `CSS/sytles.css` | 859 B | **No** | Huérfano. Nombre mal escrito. `background: red` en `header` y `main` | Eliminado |
| `CSS/prepros.config` | 23,9 KB | No | Configuración local de Prepros para compilar Sass | Eliminado con el Sass |

**Peso muerto en CSS: 28,9 KB de 40,6 KB (71 %).**

## 3. Archivos JS

| Archivo | Peso | ¿Cargado? | Contenido | Veredicto |
|---|---|---|---|---|
| `JS/script.js` | 238 B | Sí, en `<head>` sin `defer` | Dos bloques `$(function(){...})` idénticos que hacen `toggleClass("nn")` sobre `<main>` | Reescrito en vanilla JS como módulo |

## 4. Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿Referenciada? | Veredicto |
|---|---|---|---|---|---|
| `IMG/photo1.jpg` | 1.742 KB | 5472 × 3648 | JPEG | Sí, `background` de `main` | → `assets/img/content/moon-monochrome.webp` (1920 px) |
| `IMG/photo3.jpg` | 2.634 KB | 5472 × 3648 | JPEG | Sí, `background` de `main.nn` | → `assets/img/content/moon-amber.webp` (1920 px) |
| `IMG/photo2.jpg` | 450 KB | 1920 × 1216 | JPEG | Sí, `<img>` en `.waves-img` | → `assets/img/content/wave-ridges.webp` (1920 px) |
| `IMG/instagram.png` | 306 B | 24 × 24 | PNG | Sí, dentro de un `<a href="#">` | Eliminada — no hay perfil de Instagram real al que enlazar |
| `IMG/linked.png` | 297 B | 32 × 32 | PNG | Sí, dentro de un `<a href="#">` | Eliminada — sustituida por SVG inline |
| `IMG/rubix.png` | 440 B | 24 × 24 | PNG | Sí, dentro de un `<a href="#">` | Eliminada — icono de plantilla sin destino |
| `Moon-Gallery.png` | 229 KB | 1024 × 1024 | PNG | Sí, como `<link rel="icon">` | Redimensionada a favicon real + fuente de la imagen Open Graph |

**Peso total de imágenes antes: 4.827 KB. Un favicon de 229 KB y 4,3 MB en dos fotos que se sirven como fondo CSS.**

## 5. Dependencias externas

| Dependencia | Origen | Uso real | Veredicto |
|---|---|---|---|
| jQuery slim 3.0.0-beta1 | cdnjs | 4 llamadas: dos selectores, dos `toggleClass` | Eliminada. Es una **beta** de 2016 y se cargaban ~24 KB para dos líneas de vanilla JS |
| Montserrat | Google Fonts, vía `@import` | Familia base del sitio | Se conserva, pero con `<link>` + `preconnect` en lugar de `@import` |
| Playfair Display SC | Google Fonts, vía `@import` × 2 | **Ninguno.** No aparece en ninguna regla CSS | Eliminada |
| Heebo, Poppins | `@import` comentados | Ninguno | Eliminados |

## 6. Enlaces y rutas rotas

| Tipo | Detalle | Gravedad |
|---|---|---|
| Enlace muerto | `<a href="#">` × 3 en las redes sociales — no llevan a ningún sitio | Alta |
| Enlace inexistente | `<h3>Blog</h3>` en el `<nav>`: se presenta como navegación pero no es ni un enlace, y no existe ningún blog | Alta |
| Ruta rota | Ninguna. Todos los `<link>`, `<script>` e `<img>` apuntaban a archivos que existen | — |

## 7. Problemas de CSS

| Problema | Detalle |
|---|---|
| Reglas duplicadas | Los bloques `::selection` de `h1`–`h4` repiten el mismo valor 4 veces; `.orange-line` está definida dos veces idénticas |
| Valores mágicos | `gap: 330px`, `left: 52%`, `margin-right: -5.5px`, `width: 12.5px`, `font-size: 11.5px`, `height: 280px` — ninguna escala |
| Sin variables | `#DFDFDF` se repite 4 veces, `#262626` 4 veces, `#DB993D` 2 veces, `#222222`, `#333333`, `white`, `black` sueltos. Ningún `:root` |
| Selectores profundos | `main section .section-left .cotain-left .contain-bottom .orange-line` — 6 niveles |
| Prefijos obsoletos | ~90 líneas de `-webkit-box` / `-ms-flexbox` para navegadores sin soporte relevante hoy |
| CSS muerto | `CSS/sytles.css` entero; el scrollbar personalizado de `normalize.css` nunca se ve porque `body` tiene `overflow: hidden` |
| Sin responsive | **Cero media queries.** Layout fijo de 27 % / 73 % en cualquier ancho |

## 8. Problemas de HTML, SEO y accesibilidad

| Problema | Detalle |
|---|---|
| Jerarquía de encabezados | `h1 → h2 → h3 → h4 → h3 → h4 → h5`. Los niveles se eligen por tamaño de letra, no por estructura |
| Semántica invertida | El `<header>` es en realidad la barra lateral; el `<footer>` está **dentro** de `<main>`; `<article>` envuelve el logotipo; `<aside>` envuelve los controles principales |
| `<head>` incompleto | Sin `description`, sin Open Graph, sin `canonical`. `<title>` de 5 caracteres |
| Botones no accesibles | Los controles anterior/siguiente son `<div>` con un `<span>` de `‹` / `›`: no reciben foco, no responden al teclado, sin `aria-label` |
| Imágenes sin dimensiones | Ningún `<img>` con `width` / `height` → layout shift |
| `alt` pobre | `alt="waves"`, `alt="Rubix"` |
| Sin `robots.txt` ni `sitemap.xml` | No existían |
| Áreas táctiles | Los controles miden 27 × 51 px — por debajo del mínimo de 44 × 44 |

## 9. Contenido de relleno heredado de la plantilla

| Texto original | Problema |
|---|---|
| `140 photos` | El proyecto tiene 3 fotos |
| `50k+` / `14k+` | Cifras inventadas sin respaldo |
| `Travels to interesnting places…` | Texto de relleno, con falta de ortografía (*interesnting*) |
| `The last journey in search of interesting emotions and abstractionism nature.` | Relleno sin sentido |
| `Photographs that attract attentions.` | Relleno, con falta de concordancia |
| `02` / `Most popular spaces` | Numeración decorativa que no corresponde a nada |
| `Blog` | Sección que no existe |
| `© 2023` | Año fijo desactualizado |
| `Space` como título | Nombre genérico; el proyecto se llama Moon Gallery |

## 10. Lógica rota

| Problema | Detalle |
|---|---|
| Anterior y siguiente hacen lo mismo | Ambos controles ejecutan `toggleClass("nn")`. Con dos estados el fallo es invisible; con tres fotos deja de funcionar |
| Solo 2 de 3 fotos en la galería | `photo2.jpg` estaba fuera del carrusel, usada como miniatura decorativa |
| Código duplicado | Dos `$(function(){})` separados donde bastaba uno |

## 11. Archivos basura

| Archivo | Motivo |
|---|---|
| `CSS/sytles.css` | Copia obsoleta con el nombre mal escrito, nunca cargada |
| `CSS/prepros.config` | Configuración de una herramienta local de un desarrollador |

No había `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni carpetas vacías.

## 12. Credenciales

Búsqueda de `api[_-]?key`, `secret`, `token`, `password`, `bearer`, `AKIA` y claves PEM en todo el código: **sin resultados.** El proyecto es estático y no habla con ningún servicio.

---

## Resumen en 5 líneas

1. Moon Gallery es una galería de fotografía a pantalla completa de una sola página: barra lateral clara con la marca y los controles, y el panel derecho ocupado por la foto.
2. El diseño es bueno y merece conservarse; la implementación está a medio terminar y llena de restos de plantilla.
3. Lo más grave: **la galería no funciona como galería.** Los dos botones ejecutan la misma acción y solo dos de las tres fotos entran en la rotación.
4. Lo segundo más grave: **4,8 MB de imágenes** servidas a tamaño de cámara (5472 px) para un contenedor que nunca supera los 1920 px, más un favicon de 229 KB.
5. Lo tercero: **cero media queries** en todo el proyecto y un contenido inventado (140 fotos, 50k+, 14k+) que no se sostiene en un portafolio.
