# 🥉 Plan Opción 3 — "Architect's Console · Premium Minimal"

> **Estado:** Propuesta (no implementada)  
> **Fecha:** 16 Nov 2026 | **Referentes:** Linear, Raycast, Craft

---

## Paleta de Colores

| Rol | Hex | Uso |
|-----|-----|-----|
| Fondo | `#030712` | Negro casi puro |
| Superficie | `#0F172A` | Gris azulado muy oscuro |
| Borde sutil | `rgba(51,65,85,0.6)` | Slate con opacidad |
| Acento primario | `#0066FF` | Azul royal puro |
| Acento hover | `#3B82F6` | Azul claro vibrante |
| Texto hero | `#FFFFFF` | Blanco puro |
| Texto body | `#94A3B8` | Slate 400 |
| Badge/Pill | `rgba(0,102,255,0.1)` | Chips translúcidos |
| Malla bg | `rgba(255,255,255,0.03)` | Dot grid pattern |

---

## Cambios por Componente

### theme.ts
- Fondo: `#030712` negro profundo
- Superficie: `#0F172A` gris azulado
- Primario: `#0066FF`
- Typography: Inter variable font, headings con `clamp()` masivo
- borderRadius: 6-8px (minimalismo preciso)
- Botones: ghost + hover draw-border animado

### index.html
- Añadir Inter Display (peso 900 para hero)
- Mantener Inter regular para body

### Navbar — Minimal + Command Palette
- Logo `ER` a la izquierda, links gris claro a la derecha
- **Sin fondo visible** hasta que se hace scroll → `backdrop-blur` suave
- Tecla `Cmd+K` / `Ctrl+K` abre **Command Palette** modal:
  - Buscar secciones por nombre
  - Copiar email con un enter
  - Navegar a redes sociales
- Implementar con React portal + keyboard handler

### Hero — Tipografía Masiva
- Nombre ocupa ~90% del ancho: `font-size: clamp(2.5rem, 8vw, 7rem)`
- Rol/título en azul eléctrico puro `#0066FF`
- Una línea de descripción concisa debajo
- Background: **malla de puntos CSS** `radial-gradient` muy tenue
- Al hacer scroll: parallax sutil del texto hacia arriba
- Dos botones ultra-minimalistas (sin sombra, solo borde)

### About — Layout Asimétrico
- 50/50 split layout
- Izquierda: texto del perfil con highlight palabras clave en azul
- Derecha: 3 métricas `8+`, `6`, `15+` en tipografía display enorme
- **Contador animado** (count-up) al entrar al viewport

### Skills — Chips de Texto Filtrable
- **Sin iconos** — solo texto en chips agrupados por flujo natural
- Chips: `background: rgba(0,102,255,0.08)`, `border: 1px solid rgba(0,102,255,0.2)`
- Al hover: fondo sólido azul, texto blanco (micro-interaction satisfactoria)
- Filtro por categoría: click en badge de categoría, chips de otras se atenúan

### Experience — Acordeón Exclusivo
- Cada empresa: **card horizontal expandible**
- Colapsada: nombre + fecha en una línea
- Al click: smooth expand con AnimateHeight CSS
- Solo una se expande a la vez (acordeón exclusivo)
- Empresa activa: barra vertical azul al inicio

### Contact — Elegancia Brutal
- Email grande centrado en hero de sección
- **Underline draw-on-hover**: línea azul que se dibuja de izq → der al hover
- Dos botones minimalistas debajo
- Nada más. Sin formulario, sin cards complejas.

### Footer
- Dos líneas de texto centrado
- Íconos sociales: solo GitHub, LinkedIn — gris → azul en hover

---

## Interactividad Planificada
- `Cmd+K` Command Palette funcional (custom hook + React Portal)
- Contadores animados count-up (useEffect + requestAnimationFrame)
- Acordeón exclusivo con CSS max-height transition
- Underline draw-on-hover con CSS clip-path o pseudo-element
- Parallax hero con scroll event listener
- Chips toggle con opacity transition

## Archivos a Crear/Modificar
| Archivo | Cambio |
|---------|--------|
| `src/theme/theme.ts` | Reescritura completa |
| `src/components/CommandPalette.tsx` | NUEVO — Cmd+K modal |
| `src/hooks/useCountUp.ts` | NUEVO — contador animado |
| `src/hooks/useScrollAnimation.ts` | Nuevo hook scroll |
| `src/components/Navbar.tsx` | Minimal + Cmd+K trigger |
| `src/components/Hero.tsx` | Tipografía masiva + parallax |
| `src/components/About.tsx` | Split layout + count-up |
| `src/components/Skills.tsx` | Chips filtrable sin iconos |
| `src/components/Experience.tsx` | Acordeón exclusivo |
| `src/components/Contact.tsx` | Email centrado + draw underline |
| `src/styles/animations.css` | Minimal keyframes |

## Librerías adicionales necesarias
- **Ninguna** — Todo con React + CSS nativo

## Tiempo estimado de implementación
~4-5 horas de desarrollo (Command Palette es el componente más complejo)
