# Yampi Dev Roadmap

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222?logo=github&logoColor=fff)](https://yampislabs.github.io/roadmap/)

Roadmap interactivo para presentar la evolucion tecnica de Yampi: de soporte IT, CMS y microsistemas a desarrollo web moderno, automatizacion, QA y flujos con LLM.

**Demo:** [yampislabs.github.io/roadmap](https://yampislabs.github.io/roadmap/)

![Yampi Dev Roadmap preview](https://yampislabs.github.io/roadmap/og-image.png)

## Que muestra

- Timeline visual de aprendizaje y experiencia tecnica.
- Matriz de skills por areas: frontend, backend, CMS, datos, QA, automatizacion y LLM workflows.
- Grafico de evolucion con `recharts`.
- Inspector JSON para mantener el contenido trazable y data-driven.
- UI dark, glassmorphism sutil y motion con `framer-motion`.
- SEO preparado para GitHub Pages con Open Graph, Twitter Card, JSON-LD, sitemap y manifest.

## Stack

| Area | Tecnologia |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 8 |
| Datos | JSON + Zod |
| Motion | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React, React Icons |
| Deploy | GitHub Pages |

## Estructura

```txt
src/
  components/
    layout/       Shell, Hero, About
    roadmap/      Timeline, before/now, JSON inspector
    sections/     CTAs y bloques de pagina
    skills/       Skill matrix y charts
    ui/           Primitivas compartidas
  data/           Contenido JSON publico
  lib/            Carga y parseo de datos
  schemas/        Contratos Zod
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Datos

El contenido vive en `src/data/*.json` y se valida con Zod en `src/schemas/roadmap.ts`.

Regla de oro:

1. Cambiar esquema primero.
2. Ajustar tipos/componentes.
3. Actualizar JSON.
4. Validar con build.

## Deploy

La app esta preparada para publicarse bajo GitHub Pages:

- Base Vite: `/roadmap/`
- URL publica: `https://yampislabs.github.io/roadmap/`
- Assets sociales: `public/og-image.png`, `public/favicon.svg`, `public/site.webmanifest`

## SEO y privacidad

- Metadata social completa: Open Graph + Twitter/X Card.
- JSON-LD con `WebSite`, `Person` y `CreativeWork`.
- `robots.txt`, `sitemap.xml` y canonical absoluto.
- Sin datos privados: no DNI, email personal, telefono, direccion ni fecha exacta de nacimiento.

## Estado

Proyecto de presentacion tecnica personal. Enfocado en claridad, trazabilidad de datos y una primera impresion cuidada para compartir como portfolio ligero.
