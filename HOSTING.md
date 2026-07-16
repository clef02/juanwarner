# Cómo hay que servir este sitio

`npm run build` deja en `dist/` un sitio **estático**: un HTML por página, ya
renderizado. Eso funciona en cualquier hosting — Netlify, Vercel, cPanel, un VPS
— y no necesita Node en el servidor.

Pero hay **cuatro reglas** que el servidor tiene que cumplir. Si se pierden al
mudar el sitio, no se ve ningún error: simplemente el SEO deja de funcionar y
nadie se entera hasta que Google desindexa. Por eso están aquí escritas.

Hoy están implementadas en [`netlify.toml`](netlify.toml). **Si el sitio se muda
fuera de Netlify, ese archivo deja de tener efecto** y hay que reproducir estas
cuatro reglas en el nuevo servidor. Abajo está la traducción a Apache/cPanel.

---

## Las 4 reglas

### 1. NADA de "catch-all" hacia /index.html

Es la más importante y la que más fácil se cuela, porque **es lo que se hace
siempre en las webs hechas con React**. Aquí sería un desastre.

El build genera `dist/planes/index.html`, `dist/quien-soy/index.html`, etc., cada
uno con su título, su descripción y su contenido. Si el servidor manda todas las
URLs a `/index.html`, **las seis páginas devuelven el HTML del inicio**: mismo
título, misma descripción. Google indexaría seis páginas idénticas y el trabajo
de SEO se pierde entero.

Regla: **servir el archivo que corresponde a cada URL. Sin excepciones.**

### 2. URLs limpias: `/planes` → `dist/planes/index.html`

Las URLs canónicas no llevan barra final (`/planes`, no `/planes/`). El servidor
tiene que resolver `/planes` hacia `dist/planes/index.html` **sin redirigir**.

Netlify y Vercel lo hacen solos. Apache redirige a `/planes/` por defecto: hay
que desactivarlo (ver abajo), o la URL real dejará de coincidir con la canónica.

### 3. `/alianzas` → 301 → `/alianzas/youngla`

`/alianzas` **no es una página**: es un atajo al primer patrocinio, y el footer
enlaza ahí. No existe `dist/alianzas/index.html`.

Tiene que ser una redirección **del servidor**, no de React: al servirse HTML
estático, en esa URL no hay nada que ejecute JavaScript. Si falta esta regla,
`/alianzas` devuelve **404** y el enlace del footer queda roto.

### 4. Las URLs inexistentes: 404 de verdad + `dist/404.html`

El build genera `dist/404.html`. El servidor debe usarlo para cualquier URL que
no exista, **respondiendo con estado 404**, no con un 200.

Un 200 en una página que no existe es un *soft 404*: Google indexa basura.

---

## Traducción a Apache / cPanel

Si el sitio acaba en un hosting clásico, esto va en un `.htaccess` en la raíz.
**No está probado** — se escribió sin un Apache delante, así que hay que
verificar las cuatro reglas después de subirlo (abajo está cómo).

```apache
# Regla 4 — página 404 propia, con estado 404 real.
ErrorDocument 404 /404.html

RewriteEngine On

# Regla 3 — /alianzas no es una página, es un atajo.
# RedirectMatch con ^...$ y no `Redirect`, porque `Redirect` casa por prefijo
# y también atraparía /alianzas/youngla: bucle infinito.
RedirectMatch 301 ^/alianzas/?$ /alianzas/youngla

# Regla 2 — /planes debe servir /planes/index.html SIN redirigir a /planes/.
DirectorySlash Off
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+?)/?$ /$1/index.html [L]

# Regla 1 — aquí NO va ningún "RewriteRule . /index.html".
# Si alguien lo añade, rompe las seis páginas. Ver arriba.
```

---

## Cómo comprobar que el hosting nuevo está bien

Con el sitio ya subido, cuatro comandos. Sustituye el dominio:

```bash
# Regla 1 y 2 — cada página con SU título (no el del inicio en todas)
for p in / /quien-soy /planes /sponsors /alianzas/youngla /alianzas/dragon-pharma; do
  echo "$p → $(curl -s https://juanwagner.com$p | grep -o '<title>[^<]*')"
done

# Regla 3 — tiene que decir 301 y apuntar a /alianzas/youngla
curl -sI https://juanwagner.com/alianzas | grep -iE "^HTTP|^location"

# Regla 4 — tiene que decir 404, NO 200
curl -sI https://juanwagner.com/esto-no-existe | grep -i "^HTTP"
```

Si los seis títulos son distintos, `/alianzas` da 301 y la URL inventada da 404,
el hosting está bien configurado.

---

## Lo demás que hay que llevarse en la mudanza

- **El dominio** se define en un solo sitio: `SITE_URL` en `src/seo/meta.js`. De
  ahí salen las canónicas, el sitemap y las imágenes de redes.
- **`SEO_NOINDEX=true`** es una variable de entorno del build. Va SOLO en el
  entorno de pruebas, para que no compita con el sitio real en Google.
- **El formulario de contacto** hoy usa Web3Forms (un servicio externo), así que
  no depende del hosting y se mudará sin tocar nada.
