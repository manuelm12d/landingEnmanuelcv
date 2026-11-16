import { Box, Container, Typography } from '@mui/material';
import { experiences, skillCategories, type SkillCategory } from '../data/profile';
import { accent, fonts, glowCard, radialTint, type Tokens } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

// Tamaño de cada tarjeta en el bento (columnas x filas sobre una grilla de 4 columnas)
const LAYOUT: Record<string, { cols: number; rows: number; tint: string }> = {
  Backend: { cols: 2, rows: 2, tint: '0% 0%' },
  'Cloud Computing': { cols: 2, rows: 1, tint: '100% 0%' },
  'DevOps & CI/CD': { cols: 2, rows: 1, tint: '100% 100%' },
  'Bases de Datos': { cols: 2, rows: 1, tint: '0% 100%' },
  Frontend: { cols: 1, rows: 1, tint: '50% 0%' },
  'Móvil': { cols: 1, rows: 1, tint: '50% 0%' },
  'Gestión Técnica': { cols: 2, rows: 1, tint: '100% 50%' },
};

const DESCRIPTIONS: Record<string, string> = {
  Backend: 'APIs RESTful, microservicios y servicios empresariales con arquitectura limpia, DDD y principios SOLID.',
};

const DARK_ICONS = ['GitHub Actions'];

function span(cols: number, rows: number) {
  return {
    gridColumn: { xs: 'span 1', sm: `span ${Math.min(cols, 2)}`, md: `span ${cols}` },
    gridRow: { md: `span ${rows}` },
  };
}

function CategoryCard({ category, t, index }: { category: SkillCategory; t: Tokens; index: number }) {
  const layout = LAYOUT[category.title] ?? { cols: 1, rows: 1, tint: '0% 0%' };
  const isLarge = layout.rows > 1;

  return (
    <Reveal delay={index * 60} sx={span(layout.cols, layout.rows)}>
      <Box
        sx={{
          ...glowCard(t),
          backgroundImage: radialTint(layout.tint, t.isDark ? 0.09 : 0.06),
          p: { xs: 2.5, md: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontSize: isLarge ? '1.25rem' : '1rem', color: t.text }}>
            {category.title}
          </Typography>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: t.subtle }}>
            {String(category.skills.length).padStart(2, '0')}
          </Typography>
        </Box>
        {isLarge && DESCRIPTIONS[category.title] && (
          <Typography sx={{ color: t.muted, fontSize: '0.95rem', maxWidth: 420, mt: -1, mb: 3 }}>
            {DESCRIPTIONS[category.title]}
          </Typography>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isLarge ? 'repeat(auto-fill, minmax(140px, 1fr))' : 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 1,
            mt: 'auto',
          }}
        >
          {category.skills.map((skill) => (
            <Box
              key={skill.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.25,
                py: isLarge ? 1.25 : 1,
                borderRadius: '8px',
                border: `1px solid ${t.border}`,
                bgcolor: t.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                transition: 'border-color .2s ease, background-color .2s ease',
                '&:hover': { borderColor: t.borderStrong, bgcolor: t.surfaceHover },
              }}
            >
              <Box
                component="img"
                src={skill.icon}
                alt=""
                loading="lazy"
                sx={{
                  width: isLarge ? 22 : 18,
                  height: isLarge ? 22 : 18,
                  objectFit: 'contain',
                  flexShrink: 0,
                  filter: t.isDark && DARK_ICONS.includes(skill.name) ? 'invert(1)' : 'none',
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <Typography sx={{ fontSize: '0.82rem', color: t.text, fontWeight: 500, lineHeight: 1.25 }}>
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Reveal>
  );
}

function Metric({ value, label, start }: { value: string; label: string; start: boolean }) {
  const { tokens: t } = useThemeMode();
  const display = useCountUp(value, start);
  return (
    <Box>
      <Typography sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 700, letterSpacing: '-0.04em', color: t.text, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
        {display}
      </Typography>
      <Typography sx={{ fontSize: '0.78rem', color: t.muted, mt: 0.5 }}>{label}</Typography>
    </Box>
  );
}

function MetricsCard({ t }: { t: Tokens }) {
  const { ref, visible } = useScrollAnimation(0.3);
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);
  const metrics = [
    { value: `${totalSkills}+`, label: 'Tecnologías' },
    { value: String(skillCategories.length), label: 'Áreas' },
    { value: String(experiences.length), label: 'Empresas' },
  ];

  return (
    <Reveal sx={span(2, 1)}>
      <Box
        ref={ref}
        sx={{
          ...glowCard(t),
          p: { xs: 2.5, md: 3 },
          height: '100%',
          overflow: 'hidden',
          background: t.isDark
            ? `linear-gradient(135deg, rgba(37,99,235,0.16) 0%, ${t.surface} 60%)`
            : `linear-gradient(135deg, rgba(37,99,235,0.10) 0%, ${t.surface} 60%)`,
          borderColor: accent.soft,
        }}
      >
        <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: accent.hover, mb: 2.5 }}>
          $ stack --stats
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} start={visible} />
          ))}
        </Box>
      </Box>
    </Reveal>
  );
}

export default function Skills() {
  const { tokens: t } = useThemeMode();
  const ordered = Object.keys(LAYOUT)
    .map((title) => skillCategories.find((c) => c.title === title))
    .filter((c): c is SkillCategory => Boolean(c));
  const rest = skillCategories.filter((c) => !LAYOUT[c.title]);
  const [first, second, third, ...others] = [...ordered, ...rest];

  return (
    <Box id="habilidades" component="section" sx={{ py: { xs: 10, md: 14 }, borderTop: `1px solid ${t.border}` }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Stack tecnológico"
          title="Habilidades y tecnologías dominadas"
          subtitle="Experiencia práctica en cloud, DevOps, backend, frontend, móvil y bases de datos."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gridAutoFlow: 'row dense',
            gap: 2,
          }}
        >
          {[first, second, third].filter(Boolean).map((c, i) => (
            <CategoryCard key={c.title} category={c} t={t} index={i} />
          ))}
          <MetricsCard t={t} />
          {others.map((c, i) => (
            <CategoryCard key={c.title} category={c} t={t} index={i + 4} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
