# Yampi Dev Roadmap

Web estatica hecha con React + Vite + TypeScript + Tailwind para mostrar la evolucion tecnica de Yampi: de soporte IT y microsistemas a desarrollo web, automatizacion, QA y flujos con LLM.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## GitHub Pages

La app esta preparada para publicarse bajo el repo `json` con base de Vite:

- `base: "/json/"` en `vite.config.ts`
- URL publica esperada: `https://cdryampi.github.io/json/`

## SEO & metadata

La aplicacion incluye:

- `title` y `meta description` optimizados para la home.
- Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`).
- Twitter/X Card (`summary_large_image`).
- JSON-LD con `WebSite`, `Person` y `CreativeWork`.
- `robots.txt` y `sitemap.xml` para indexacion basica.
- `canonical` absoluto para GitHub Pages.
- `favicon.svg`, `site.webmanifest`, `og-image.svg` y `og-image.png`.
- Configuracion respetuosa con privacidad: sin email personal, telefono ni direccion.

## SEO validation checklist

Comando de validacion:

```bash
npm run build
```

Checklist manual:

- Probar Lighthouse (Performance, SEO, Accessibility, Best Practices).
- Probar Rich Results Test de Google para validar JSON-LD.
- Probar vista previa social en validadores de LinkedIn y X/Twitter si se desea.
- Verificar que `og-image` responde en URL absoluta tras deploy.

## Privacidad

- No se incluyen datos privados (DNI, email personal, telefono, direccion o fecha exacta de nacimiento).
- No se inventan enlaces publicos de redes sociales cuando no estan confirmados.
