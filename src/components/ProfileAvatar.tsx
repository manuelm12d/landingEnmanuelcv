import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getProfileImageUrl } from '../services/storageService';
import { useThemeMode } from '../context/ThemeContext';
import { accent, fonts } from '../theme/theme';

const SIZE = { xs: 220, md: 300 };

export default function ProfileAvatar() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { tokens: t } = useThemeMode();

  useEffect(() => {
    let cancelled = false;
    getProfileImageUrl()
      .then((url) => { if (!cancelled) setImageUrl(url); })
      .catch(() => { if (!cancelled) setImageUrl(null); });
    return () => { cancelled = true; };
  }, []);

  const showImage = Boolean(imageUrl) && loaded;

  return (
    <Box
      sx={{
        position: 'relative',
        width: SIZE,
        mx: 'auto',
        '@media (hover: hover)': {
          '&:hover .avatar-frame': {
            borderColor: accent.ring,
            boxShadow: `0 0 0 1px ${accent.soft}, 0 24px 64px ${accent.glow}`,
          },
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(37,99,235,${t.isDark ? 0.35 : 0.2}), transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <Box
        className="avatar-frame"
        sx={{
          position: 'relative',
          width: SIZE,
          height: SIZE,
          borderRadius: '24px',
          overflow: 'hidden',
          border: `1px solid ${t.border}`,
          background: t.isDark
            ? 'linear-gradient(180deg, #18181B 0%, #09090B 100%)'
            : 'linear-gradient(180deg, #F4F4F5 0%, #FFFFFF 100%)',
          transition: 'border-color .3s ease, box-shadow .3s ease',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${t.border} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {!showImage && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.mono,
              fontSize: { xs: '2.5rem', md: '3.25rem' },
              fontWeight: 500,
              color: t.text,
              letterSpacing: '-0.04em',
            }}
          >
            <Box component="span" sx={{ color: t.subtle }}>&lt;</Box>ER<Box component="span" sx={{ color: t.subtle }}>/&gt;</Box>
          </Box>
        )}

        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt="Enmanuel Reyes"
            onLoad={() => setLoaded(true)}
            onError={() => { setImageUrl(null); setLoaded(false); }}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              pt: 3,
              opacity: loaded ? 1 : 0,
              transition: 'opacity .4s ease',
            }}
          />
        )}

        <Box
          sx={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 1,
            borderRadius: '10px',
            border: `1px solid ${t.border}`,
            bgcolor: t.isDark ? 'rgba(9,9,11,0.7)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: t.text, lineHeight: 1.3 }}>
              Enmanuel Reyes
            </Typography>
            <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.7rem', color: t.muted }}>
              Managua, NI · UTC-6
            </Typography>
          </Box>
          <span className="status-dot" aria-label="Disponible" />
        </Box>
      </Box>
    </Box>
  );
}
