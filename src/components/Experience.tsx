import { Box, Container, Stack, Typography } from '@mui/material';
import { experiences, type Experience as ExperienceItem } from '../data/profile';
import { accent, fonts, glowCard, type Tokens } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';

const DIFF_ADD = '#22C55E';

function shortHash(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function Commit({ exp, index, total, t }: { exp: ExperienceItem; index: number; total: number; t: Tokens }) {
  const { ref, visible } = useScrollAnimation(0.2);
  const isHead = index === 0;
  const version = `v${total - index}.0.0`;
  const hash = shortHash(`${exp.company}${exp.period}`);

  return (
    <Box ref={ref} sx={{ position: 'relative', pl: { xs: 4, md: 6 } }}>
      {/* Nodo del timeline */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: { xs: 3, md: 11 },
          top: 26,
          width: 13,
          height: 13,
          borderRadius: '50%',
          border: `2px solid ${visible ? accent.main : t.borderStrong}`,
          bgcolor: visible ? (isHead ? accent.main : t.bg) : t.bg,
          boxShadow: visible ? `0 0 0 4px ${accent.soft}, 0 0 16px ${accent.ring}` : 'none',
          transition: 'all .5s ease .15s',
          zIndex: 1,
        }}
      />

      <Box
        className={`reveal${visible ? ' is-visible' : ''}`}
        sx={{ ...glowCard(t), p: { xs: 2.5, md: 3.5 } }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          gap={1}
          sx={{ fontFamily: fonts.mono, fontSize: '0.75rem', mb: 2 }}
        >
          <Box component="span" sx={{ color: '#F59E0B' }}>commit {hash}</Box>
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: '999px',
              border: `1px solid ${isHead ? accent.ring : t.border}`,
              color: isHead ? accent.hover : t.muted,
              bgcolor: isHead ? accent.soft : 'transparent',
            }}
          >
            {isHead ? 'HEAD -> main, ' : ''}tag: {version}
          </Box>
          <Box component="span" sx={{ color: t.subtle, ml: { md: 'auto' } }}>
            {exp.period}
          </Box>
        </Stack>

        <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, color: t.text }}>
          {exp.role}
        </Typography>
        <Typography sx={{ color: t.muted, fontSize: '0.95rem', mb: 2.5 }}>
          @ {exp.company}
        </Typography>

        <Box
          sx={{
            borderRadius: '8px',
            border: `1px solid ${t.border}`,
            bgcolor: t.isDark ? 'rgba(0,0,0,0.25)' : 'rgba(9,9,11,0.02)',
            overflow: 'hidden',
            fontFamily: fonts.mono,
            fontSize: { xs: '0.75rem', md: '0.8rem' },
          }}
        >
          {exp.highlights.map((item) => (
            <Box
              key={item}
              sx={{
                display: 'flex',
                gap: 1.5,
                px: 1.5,
                py: 0.75,
                bgcolor: 'rgba(34,197,94,0.06)',
                borderLeft: `2px solid ${DIFF_ADD}`,
                '& + &': { borderTop: `1px solid ${t.border}` },
              }}
            >
              <Box component="span" sx={{ color: DIFF_ADD, userSelect: 'none' }}>+</Box>
              <Box component="span" sx={{ color: t.text, lineHeight: 1.6 }}>{item}</Box>
            </Box>
          ))}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              px: 1.5,
              py: 0.75,
              bgcolor: accent.soft,
              borderLeft: `2px solid ${accent.main}`,
              borderTop: `1px solid ${t.border}`,
            }}
          >
            <Box component="span" sx={{ color: accent.hover, userSelect: 'none' }}>~</Box>
            <Box component="span" sx={{ color: t.muted, lineHeight: 1.6 }}>
              stack: <Box component="span" sx={{ color: accent.hover }}>[{exp.technologies.join(', ')}]</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Experience() {
  const { tokens: t } = useThemeMode();

  return (
    <Box id="experiencia" component="section" sx={{ py: { xs: 10, md: 14 }, borderTop: `1px solid ${t.border}` }}>
      <Container maxWidth="md">
        <SectionTitle
          eyebrow="git log --career"
          title="Experiencia laboral destacada"
          subtitle="Más de 8 años liderando desarrollo, migraciones y despliegues en sectores críticos."
        />

        <Box sx={{ position: 'relative' }}>
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: { xs: 9, md: 17 },
              top: 8,
              bottom: 8,
              width: '1px',
              background: `linear-gradient(180deg, ${accent.main} 0%, ${t.borderStrong} 30%, ${t.border} 100%)`,
            }}
          />
          <Stack spacing={3}>
            {experiences.map((exp, index) => (
              <Commit key={`${exp.company}-${exp.period}`} exp={exp} index={index} total={experiences.length} t={t} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
