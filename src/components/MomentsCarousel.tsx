import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { listCarouselImages } from '../services/storageService';
import { glassCard } from '../theme/theme';

const AUTO_PLAY_MS = 5000;

export default function MomentsCarousel() {
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

  return (
    <Paper
      elevation={0}
      sx={{
        ...glassCard,
        p: { xs: 2.5, md: 3 },
        borderRadius: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <PhotoLibraryIcon color="primary" />
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            Galería
          </Typography>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            Momentos importantes
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: { xs: 200, sm: 220, md: 240 },
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {!loading && error && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary" textAlign="center">
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
                transition: 'opacity 0.5s ease',
              }}
            />
          ))}

        {!loading && !error && images.length > 1 && (
          <>
            <IconButton
              size="small"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Imagen anterior"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(11, 17, 32, 0.65)',
                '&:hover': { bgcolor: 'rgba(11, 17, 32, 0.85)' },
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Imagen siguiente"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(11, 17, 32, 0.65)',
                '&:hover': { bgcolor: 'rgba(11, 17, 32, 0.85)' },
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {!loading && !error && images.length > 1 && (
        <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 1.5 }}>
          {images.map((src, index) => (
            <Box
              key={src}
              component="button"
              type="button"
              aria-label={`Ir a imagen ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: index === activeIndex ? 18 : 8,
                height: 8,
                border: 'none',
                borderRadius: 4,
                p: 0,
                cursor: 'pointer',
                bgcolor: index === activeIndex ? 'primary.main' : 'rgba(148, 163, 184, 0.35)',
                transition: 'width 0.25s ease, background-color 0.25s ease',
              }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}
