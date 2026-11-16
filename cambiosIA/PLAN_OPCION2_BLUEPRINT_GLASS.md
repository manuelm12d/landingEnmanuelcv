# 🥈 Plan Opción 2 — "Blueprint · Dark Navy Glassmorphism"

> **Estado:** ✅ IMPLEMENTADA el 16 Nov 2026  
> **Referentes:** Supabase, Awwwards, Linear, diseños premium 2025

---

## Paleta de Colores

| Rol | Hex | Uso |
|-----|-----|-----|
| Fondo base dark | `#050B14` | Background default (oscuro) |
| Fondo alt dark | `#0A1628` | Secciones alternadas |
| Superficie dark | `rgba(15,23,42,0.6)` | Cards glassmorphism |
| Fondo base light | `#F0F9FF` | Background default (claro) |
| Superficie light | `rgba(255,255,255,0.7)` | Cards glassmorphism claro |
| Borde glass dark | `rgba(56,189,248,0.15)` | Bordes glass |
| Borde glass light | `rgba(37,99,235,0.15)` | Bordes glass claro |
| Acento primario | `#38BDF8` | Sky Blue / Cyan |
| Acento secundario | `#6366F1` | Índigo eléctrico |
| Texto dark | `#F0F9FF` | Headings modo oscuro |
| Texto light | `#0F172A` | Headings modo claro |
| Texto sec dark | `#94A3B8` | Body copy oscuro |
| Texto sec light | `#475569` | Body copy claro |
| Glow deco | `rgba(56,189,248,0.2)` | Ambientación hero |

---

## Cambios Implementados por Componente

### src/theme/theme.ts — REESCRITURA COMPLETA
- Función `getMarioTheme(mode)` → `getProfessionalTheme(mode)`
- Paleta navy+cyan+indigo para dark, sky-50+blue para light
- Typography: Inter, Geist-inspired, `tracking-tight` en headings
- borderRadius: 12px moderno
- MUI overrides: botones con glow, chips redondeados, Paper con glassmorphism

### src/styles/mario-animations.css → REEMPLAZADO
- Eliminar animaciones de Mario Bros
- Nuevas keyframes: `fadeInUp`, `fadeInLeft`, `glassPulse`, `gradientShift`, `glowPulse`, `typewriter`
- CSS custom scrollbar azul elegante
- Variables CSS para transiciones suaves

### src/context/ThemeContext.tsx — SIN CAMBIOS
- Mantiene toggle dark/light
- localStorage key `mario-theme-mode` (compatible)

### src/components/ParticleCanvas.tsx — NUEVO COMPONENTE
- Canvas 2D puro (sin dependencias externas)
- 60 partículas con conexiones entre vecinos cercanos
- Repulsión suave al cursor del mouse
- Colores: puntos cyan, líneas cyan translúcidas

### src/hooks/useScrollAnimation.ts — NUEVO HOOK
- IntersectionObserver con threshold 0.15
- Devuelve `{ ref, visible }` para fade-in al hacer scroll
- Se auto-desconecta al unmount (cleanup)

### src/components/Navbar.tsx — REDISEÑO GLASS PILL
- AppBar transparente, inner Box como píldora flotante
- Glass: `rgba(10,22,40,0.85)` + `backdrop-filter: blur(20px)`
- Borde: `1px solid rgba(56,189,248,0.15)`
- Links: underline animado en cyan al hover
- Toggle 🌞/🌙: mantiene funcionalidad previa

### src/components/Hero.tsx — REDISEÑO COMPLETO
- Fondo: canvas de partículas interactivo (ParticleCanvas)
- Gradient blob cyan/indigo detrás del texto
- Texto hero con gradiente sky→indigo en palabras clave
- Efecto **typewriter** ciclando roles profesionales
- Badge "Disponible para proyectos" con animación glow
- Stat cards con glassmorphism + hover brillante

### src/components/SectionTitle.tsx — ACTUALIZACIÓN LIMPIA
- Eyebrow: badge azul translúcido con borde cyan
- Título: fuente más grande, gradiente sutil en palabras
- Separador: línea degradé cyan→transparente

### src/components/About.tsx — GLASSMORPHISM + TILT
- Cards con glassmorphism real (backdrop-filter)
- Efecto tilt-3D al pasar cursor (perspective + rotateX/Y)
- Iconos: emojis grandes semitransparentes de fondo

### src/components/Skills.tsx — TABS FILTRO INTERACTIVO
- Tabs de categorías horizontales con scroll
- Al seleccionar categoría: icons se animan con stagger
- Chips de selección activa con fondo cyan
- Hover en iconos: bounce + glow

### src/components/Experience.tsx — CARDS GLASSMORPHISM
- Cards con borde izquierdo cyan/indigo
- Chips de tecnologías redondeados en tono oscuro
- Empresa activa con indicator "ACTIVO" en cyan
- Hover: translateY + brillo de borde

### src/components/Education.tsx — CARDS GLASS LIMPIAS
- Glassmorphism en cards
- Icono 🎓 grande de fondo semitransparente
- Período con badge cyan

### src/components/Contact.tsx — GLOW EFFECTS
- Email con hover effect de underline draw
- Botones con `box-shadow glow` en cyan al hover
- Card principal con borde cyan brillante

### src/components/Footer.tsx — MINIMAL ELEGANTE
- Texto centrado minimal
- Íconos gris → cyan en hover
- Separador con gradiente

### src/components/ProfileAvatar.tsx — RING CYAN/INDIGO
- Gradient ring: cyan → indigo → cyan
- Glow: `rgba(56,189,248,0.4)`
- Inner background: navy oscuro

---

## Archivos Creados/Modificados
| Archivo | Tipo |
|---------|------|
| `src/theme/theme.ts` | 🔴 Reescritura |
| `src/styles/mario-animations.css` | 🔴 Reescritura |
| `src/components/ParticleCanvas.tsx` | 🟢 Nuevo |
| `src/hooks/useScrollAnimation.ts` | 🟢 Nuevo |
| `src/components/Navbar.tsx` | 🔴 Rediseño |
| `src/components/Hero.tsx` | 🔴 Rediseño |
| `src/components/SectionTitle.tsx` | 🟡 Actualización |
| `src/components/About.tsx` | 🟡 Actualización |
| `src/components/Skills.tsx` | 🟡 Actualización |
| `src/components/Experience.tsx` | 🟡 Actualización |
| `src/components/Education.tsx` | 🟡 Actualización |
| `src/components/Contact.tsx` | 🟡 Actualización |
| `src/components/Footer.tsx` | 🟡 Actualización |
| `src/components/ProfileAvatar.tsx` | 🟡 Actualización |
| `index.html` | 🟢 Font update |
| `cambiosIA/PLAN_OPCION2_BLUEPRINT_GLASS.md` | 🟢 Este archivo |

## Librerías adicionales necesarias
- **Ninguna** — Todo implementado con:
  - Canvas API nativo (partículas)
  - IntersectionObserver nativo (scroll animations)
  - CSS backdrop-filter (glassmorphism)
  - React hooks (typewriter, tilt)

## Resultado Final
- ✅ Dark navy glassmorphism profesional
- ✅ Canvas de partículas interactivo en hero
- ✅ Typewriter efecto ciclando roles
- ✅ Skills con tabs filtro animado
- ✅ Tilt-3D en cards de About
- ✅ Glow effects en botones y borders
- ✅ Toggle dark/light mantenido
- ✅ Scroll animations con fade-in
- ✅ 0 dependencias externas nuevas
