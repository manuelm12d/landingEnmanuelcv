import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { listCarouselImages } from '../services/storageService';
import { accent, fonts, glowCard } from '../theme/theme';
import { useThemeMode } from '../context/ThemeContext';

const AUTO_PLAY_MS = 5000;

export default function MomentsCarousel() {
  const { tokens: t } = useThemeMode();
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    listCarouselImages()
      .then((urls) => {
        if (!cancelled) {
          setImages(urls);
          setError(urls.length === 0 ? 'No hay imágenes en el carrusel.' : null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'No se pudieron cargar las imágenes.';
          setError(message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const goTo = (index: number) => {
    if (images.length === 0) return;
    setActiveIndex((index + images.length) % images.length);
  };

  const navButtonSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#F8FAFC',
    bgcolor: 'rgba(9,9,11,0.6)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    '&:hover': { bgcolor: 'rgba(9,9,11,0.85)' },
  } as const;

  return (
    <Box sx={{ ...glowCard(t), p: { xs: 2, md: 2.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 2, px: 0.5 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', color: t.text }}>
          Momentos importantes
        </Typography>
        {images.length > 0 && (
          <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: t.subtle }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: { xs: 220, md: 260 },
          borderRadius: '8px',
          overflow: 'hidden',
          bgcolor: t.isDark ? '#09090B' : '#F4F4F5',
          border: `1px solid ${t.border}`,
        }}
      >
        {loading && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
            <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.78rem', color: t.subtle, textAlign: 'center' }}>
              {error}
            </Typography>
          </Box>
        )}

        {!loading &&
          !error &&
          images.map((src, index) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={`Momento importante ${index + 1}`}
              loading="lazy"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: index === activeIndex ? 1 : 0,
                transition: 'opacity .6s ease',
              }}
            />
          ))}

        {!loading && !error && images.length > 1 && (
          <>
            <IconButton size="small" onClick={() => goTo(activeIndex - 1)} aria-label="Imagen anterior" sx={{ ...navButtonSx, left: 10 }}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => goTo(activeIndex + 1)} aria-label="Imagen siguiente" sx={{ ...navButtonSx, right: 10 }}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {!loading && !error && images.length > 1 && (
        <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 2 }}>
          {images.map((src, index) => (
            <Box
              key={src}
              component="button"
              type="button"
              aria-label={`Ir a imagen ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: index === activeIndex ? 20 : 6,
                height: 6,
                border: 'none',
                borderRadius: 3,
                p: 0,
                cursor: 'pointer',
                bgcolor: index === activeIndex ? accent.main : t.borderStrong,
                transition: 'width .25s ease, background-color .25s ease',
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
