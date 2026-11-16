# 🍄 Plan de Cambios — Tema Mario Bros

> **Proyecto:** `landingenma` — Landing personal de Enmanuel Reyes  
> **Fecha:** 16 de noviembre de 2026  
> **Autor del cambio:** Antigravity AI  
> **Objetivo:** Transformar el diseño actual (oscuro minimalista tech) a una estética de videojuego **Super Mario Bros** con toggle de modo claro/oscuro.

---

## 📊 Estado Actual del Proyecto

### Stack Tecnológico
- **Framework:** React 18 + TypeScript
- **UI Library:** Material UI (MUI) v5
- **Build tool:** Vite
- **Backend/DB:** Firebase + Firestore
- **Deploy:** Firebase Hosting

### Arquitectura de Componentes
```
src/
├── AppWithTheme.tsx          → ThemeProvider estático (dark-only)
├── App.tsx                   → Composición de secciones
├── theme/theme.ts            → Tema MUI (dark fijo, paleta azul)
├── context/                  → (nuevo) ThemeContext
├── styles/                   → (nuevo) mario-animations.css
└── components/
    ├── Navbar.tsx            → AppBar vidrio, CodeIcon logo
    ├── Hero.tsx              → Gradiente radial tech, stat cards
    ├── About.tsx             → Cards de vidrio, iconos MUI
    ├── Skills.tsx            → Grid de logos devicons
    ├── Experience.tsx        → Timeline con border-left
    ├── Education.tsx         → Paper cards + carousel
    ├── Contact.tsx           → Card central con formulario
    ├── Footer.tsx            → Barra mínima
    ├── SectionTitle.tsx      → Eyebrow + título + subtítulo
    └── ProfileAvatar.tsx     → Avatar circular con glow
```

### Tema Anterior (referencia)
```typescript
palette: {
  mode: 'dark',
  primary: { main: '#38bdf8' },     // Azul sky
  secondary: { main: '#818cf8' },   // Índigo
  background: { default: '#0b1120', paper: '#111827' },
  text: { primary: '#f8fafc', secondary: '#94a3b8' },
}
fontFamily: 'Inter, Roboto, Helvetica, Arial'
borderRadius: 16
```

---

## 🎨 Paleta de Colores Mario Bros

### 🌞 Modo Claro — World 1-1 (Día)

| Token MUI | Valor | Inspiración |
|-----------|-------|-------------|
| `background.default` | `#5C94FC` | Cielo azul de Mario |
| `background.paper` | `#E8D5A3` | Tierra/ladrillo |
| `primary.main` | `#E52521` | Rojo icónico de Mario |
| `primary.light` | `#FF6B6B` | Rojo claro |
| `primary.dark` | `#8B0000` | Rojo oscuro |
| `secondary.main` | `#FBD000` | Moneda/estrella dorada |
| `secondary.dark` | `#C8821A` | Tierra/ladrillo oscuro |
| `text.primary` | `#1A0A00` | Marrón oscuro |
| `text.secondary` | `#5C3317` | Marrón tierra |

### 🌙 Modo Oscuro — Bowser's Castle (Noche)

| Token MUI | Valor | Inspiración |
|-----------|-------|-------------|
| `background.default` | `#0D0D1A` | Noche oscura |
| `background.paper` | `#1A1A2E` | Piedra del castillo |
| `primary.main` | `#E52521` | Rojo Mario |
| `primary.light` | `#FF6B6B` | Rojo claro |
| `primary.dark` | `#8B0000` | Rojo oscuro |
| `secondary.main` | `#FBD000` | Moneda dorada |
| `secondary.dark` | `#FF6600` | Bola de fuego |
| `text.primary` | `#F5F5F5` | Blanco hueso |
| `text.secondary` | `#A0A0C0` | Gris azulado |

---

## 🗂️ Archivos a Crear / Modificar

### Archivos NUEVOS

| Archivo | Propósito |
|---------|-----------|
| `src/context/ThemeContext.tsx` | Context de tema con toggle + localStorage |
| `src/styles/mario-animations.css` | Keyframes y animaciones CSS globales |
| `cambiosIA/PLAN_MARIO_THEME.md` | Este documento |

### Archivos MODIFICADOS

| Archivo | Nivel de cambio | Descripción |
|---------|----------------|-------------|
| `index.html` | 🟢 Leve | Agregar Google Font "Press Start 2P" |
| `src/theme/theme.ts` | 🔴 Reescritura | Tema dual getMarioTheme(mode), helpers |
| `src/AppWithTheme.tsx` | 🟡 Medio | Usar MarioThemeProvider dinámico |
| `src/components/Navbar.tsx` | 🔴 Mayor | Estilo Mario + botón toggle 🌞/🌙 |
| `src/components/Hero.tsx` | 🔴 Mayor | Cielo pixel, bloques ? amarillos |
| `src/components/SectionTitle.tsx` | 🟡 Medio | Pixel headers, eyebrow estilo WORLD |
| `src/components/About.tsx` | 🟡 Medio | Power-up cards, language badges |
| `src/components/Skills.tsx` | 🟡 Medio | Inventory panel, categorías Mario |
| `src/components/Experience.tsx` | 🟡 Medio | Niveles completados, chips power-up |
| `src/components/Education.tsx` | 🟡 Medio | Castle cards, LEVEL COMPLETE |
| `src/components/Contact.tsx` | 🟡 Medio | GAME COMPLETE panel, blink text |
| `src/components/Footer.tsx` | 🟢 Leve | INSERT COIN style, tierra ground |
| `src/components/ProfileAvatar.tsx` | 🟡 Medio | Ring Mario colors, glow dorado |

---

## 🎮 Detalle por Fase

### FASE 1 — Tipografía y Fuentes
- Importar **Press Start 2P** de Google Fonts en `index.html`
- Usarla solo en: títulos h1-h4, eyebrows, botones, elementos decorativos
- Mantener **Roboto/Inter** para cuerpos de texto (legibilidad)

### FASE 2 — Sistema de Tema Dual
**`src/theme/theme.ts`** — Función `getMarioTheme(mode)`
- Paleta completa claro/oscuro definida arriba
- `borderRadius: 0` en botones, chips (look pixelado)
- `borderRadius: 4` en cards (semi-pixel)
- Sobrescrituras MUI: botones con borde sólido 3px, fondo sólido sin blur

Helpers exportados:
- `marioGradientText` — gradiente rojo→dorado
- `marioCard` — card estilo ladrillo con borde tierra
- `marioBrick` — bloque ? de Mario

### FASE 3 — Context + Toggle
**`src/context/ThemeContext.tsx`**
```typescript
const [mode, setMode] = useState<'light' | 'dark'>(() =>
  localStorage.getItem('mario-theme-mode') as 'light' | 'dark' || 'dark'
);
const toggleTheme = () => {
  setMode(prev => {
    const next = prev === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mario-theme-mode', next);
    return next;
  });
};
```

### FASE 4 — Navbar
- Fondo: rojo Mario `rgba(229, 37, 33, 0.95)`
- Logo: 🍄 + "E. Reyes" en pixel font
- Botones nav: sin border-radius, hover fondo dorado
- **Toggle**: `IconButton` con `Brightness7`/`Brightness4` icon, tooltip modo
- Borde inferior: `4px solid #FBD000` (línea moneda)
- Drawer mobile: fondo rojo oscuro, items con hover dorado

### FASE 5 — Hero
- Background claro: cielo azul con nubes SVG
- Background oscuro: cielo estrellado
- Chips "años experiencia": estilo moneda 🪙
- Stat cards → "bloques ?" amarillos:
  - Fondo `#FBD000`, borde marrón 4px
  - Número en rojo, label en marrón
  - Hover: `translateY(-8px)` + shake animation
- Decoradores flotantes: 🍄 🪙 ⭐ con `mario-float` animation

### FASE 6 — SectionTitle
- Eyebrow: fondo rojo, texto blanco, pixel font, padding pixel
- Título: pixel font + text-shadow `2px 2px 0 #8B0000`
- Separador: fila de bloques `■ ■ ■` en dorado

### FASE 7 — About
- Highlights cards: "power-up cards" con borde 3px tierra
- Main card: borde ladrillo, fondo semi-transparente
- Language badges: pill amarillo + texto rojo

### FASE 8 — Skills
- Section bg: patrón tierra/hierba (modo claro) / piedra (oscuro)
- Cards: borde tierra, fondo ladrillo semi-transparente
- Category titles: fondo rojo, texto blanco, pixel font
- Tech icons: hover con bounce animation

### FASE 9 — Experience
- Cards: borde izquierdo → "barra de vida" en rojo
- Card activa: acento dorado ⭐
- Periodo chips: estilo "STAGE CLEAR"
- Tech chips: alterna rojo/dorado

### FASE 10 — Education
- Cards: borde castillo (`#C8821A`), `🏰` icon
- Periodo: chip "LEVEL COMPLETE"
- Section bg alternado

### FASE 11 — Contact
- Título "Hablemos": CSS blink animation pixel
- Card: borde grueso dorado sobre fondo oscuro
- Botones: rojo Mario + bounce hover

### FASE 12 — Footer
- Texto: pixel font pequeño "INSERT COIN TO CONTINUE"
- Separador: fila de bloques `■`
- Copyright estilo HUD

### FASE 13 — Animaciones Globales
**`src/styles/mario-animations.css`**
```css
@keyframes mario-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes coin-spin    { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
@keyframes star-blink   { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes mario-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes blink-text   { 0%,100%{opacity:1} 49%{opacity:1} 50%,99%{opacity:0} }
```

---

## ✅ Notas Importantes

1. **Pac-Man section**: NO se modifica — ya es un elemento de videojuego funcional.
2. **Accesibilidad**: Rojo Mario sobre fondo azul puede tener bajo contraste. Se usa rojo oscuro para textos y se verifica visualmente.
3. **Fuente pixel**: Solo en títulos/UI decorativa. Cuerpo en Roboto para legibilidad.
4. **localStorage key**: `mario-theme-mode` → valores `'light'` | `'dark'`
5. **Modo default**: Dark (Bowser's Castle) como estaba antes.
6. **ProfileAvatar**: Cambiar ring gradient de azul→índigo a rojo→dorado.

---

## 🏁 Resultado Esperado

```
✅ Navbar     → Rojo Mario + 🍄 logo + toggle 🌞/🌙
✅ Hero       → Cielo pixel, bloques ? como stat cards, sprites flotantes
✅ About      → Power-up cards con bordes tierra
✅ Skills     → Inventory panel estilo Mario
✅ Experience → Niveles completados con chips STAGE CLEAR
✅ Education  → Castle cards con LEVEL COMPLETE
✅ Contact    → Panel GAME COMPLETE, blink text
✅ Footer     → INSERT COIN style ground
✅ Toggle     → Persistente en localStorage, en Navbar
✅ Fuente     → Press Start 2P en headers/UI
✅ Animaciones→ bounce, coin-spin, float, blink-text
```
