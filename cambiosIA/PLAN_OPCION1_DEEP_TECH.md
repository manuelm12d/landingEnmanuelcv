# 🥇 Plan Opción 1 — "Deep Tech · Vercel/Stripe Style"

> **Estado:** ✅ Implementada (16 Nov 2026) — reemplaza por completo los temas Mario y Blueprint Glass  
> **Fecha:** 16 Nov 2026 | **Referentes:** Vercel, Stripe, Linear

---

## Paleta de Colores

| Rol | Hex | Uso |
|-----|-----|-----|
| Fondo base | `#09090B` | Background default |
| Superficie | `#121214` | Cards, Paper |
| Borde | `rgba(255,255,255,0.08)` | Divisores y borders |
| Acento primario | `#2563EB` | Botones, links activos |
| Acento hover | `#3B82F6` | Estados hover |
| Texto principal | `#F8FAFC` | Headings |
| Texto secundario | `#A1A1AA` | Body copy |
| Glow deco | `rgba(37,99,235,0.15)` | Fondo hero |

---

## Cambios por Componente

### theme.ts
- Fondo: `#09090B` zinc/negro profundo
- Superficie: `#121214`
- Primario: `#2563EB`
- Typography: Inter Display + `tracking-tight`
- borderRadius: 8px (más cuadrado, preciso)
- Botones: sólido azul + `box-shadow: 0 0 20px rgba(37,99,235,0.4)` en hover

### index.html
- Fuentes: **Inter** (ya existe) + añadir `display=swap` optimization

### Navbar
- Fijo full-width con `backdrop-blur` activado al hacer scroll
- Logo `<ER />` en mono-espacio
- Links gris → blanco en hover
- Botón CTA "Contactar": sólido `#2563EB` + subtle glow azul

### Hero
- Fondo: negro con **radial gradient glow azul** difuso (como el sol de Vercel)
- Título bold + compacto, `tracking-tight`, `clamp()` font-size
- Subtítulo con efecto **typewriter** ciclando roles
- Stat cards: grid 4 ítems, borde `1px solid rgba(255,255,255,0.1)`, hover glow
- 2 CTAs: botón sólido + botón ghost

### Skills (Bento Grid)
- Reemplaza grid por **Bento Grid asimétrico**
- Tarjetas de tamaños distintos
- Micro-gradiente radial azul muy tenue en cada card
- Animación de contador en card de métricas

### Experience
- Timeline tipo **git commit log**
- Punto vertical que se ilumina al hacer scroll (IntersectionObserver)
- Chip de fecha estilo `tag: v2.4.0`
- Highlights como líneas de diff (verde/azul)
- Fade+translateY al entrar al viewport

### Contact
- Fondo: glow azul ambiental
- Email con botón **copy-to-clipboard** + micro-animación "¡Copiado!"
- Cards con hover que hace brillar el borde

### Footer
- Minimalista. Íconos sociales gris → azul brillante en hover.

---

## Interactividad Planificada
- `IntersectionObserver` fade+slide-in en secciones
- Typewriter en hero (useEffect + setTimeout)
- Hover glow en cards (box-shadow CSS transition)
- Copy-to-clipboard con feedback visual
- Toggle light/dark en navbar

## Archivos a Crear/Modificar
| Archivo | Cambio |
|---------|--------|
| `src/theme/theme.ts` | Reescritura completa |
| `src/components/Navbar.tsx` | Rediseño + toggle |
| `src/components/Hero.tsx` | Typewriter + glow + stat cards |
| `src/components/Skills.tsx` | Bento Grid layout |
| `src/components/Experience.tsx` | Git-timeline animado |
| `src/components/Contact.tsx` | Copy-to-clipboard |
| `src/styles/animations.css` | Fade, slide, glow keyframes |

## Librerías adicionales necesarias
- Ninguna (todo con IntersectionObserver + CSS nativo)

## Tiempo estimado de implementación
~3-4 horas de desarrollo
