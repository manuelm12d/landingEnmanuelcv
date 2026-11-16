import { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { getProfileImageUrl } from '../services/storageService';
import { useMarioTheme } from '../context/ThemeContext';

const SIZE = { xs: 160, md: 200 };

export default function ProfileAvatar() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { mode } = useMarioTheme();
  const isLight = mode === 'light';

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
      className="profile-avatar"
      sx={{
        position: 'relative',
        width: SIZE,
        height: SIZE,
        mx: 'auto',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '@media (hover: hover)': {
          '&:hover': { transform: 'translateY(-10px) scale(1.04)' },
          '&:hover .profile-glow': { opacity: 0.9, filter: 'blur(16px)', inset: -20 },
          '&:hover .profile-ring': {
            boxShadow: '0 28px 56px rgba(229, 37, 33, 0.4), 0 12px 32px rgba(251, 208, 0, 0.3)',
          },
        },
      }}
    >
      {/* Glow Mario colors */}
      <Box
        className="profile-glow"
        sx={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #E52521, #FBD000, #4CAF22, #FBD000, #E52521)',
          opacity: 0.6,
          filter: 'blur(10px)',
          transition: 'opacity 0.35s ease, filter 0.35s ease, inset 0.35s ease',
        }}
      />

      {/* Ring Mario colors */}
      <Box
        className="profile-ring"
        sx={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          p: '4px',
          background: 'linear-gradient(135deg, #E52521 0%, #FBD000 50%, #E52521 100%)',
          boxShadow: '0 20px 40px rgba(229, 37, 33, 0.3), 4px 4px 0 #8B0000',
          transition: 'box-shadow 0.35s ease',
        }}
      >
        <Box
          className="profile-inner"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            background: isLight
              ? 'linear-gradient(180deg, #E8D5A3 0%, #C8821A 100%)'
              : 'linear-gradient(180deg, #1A1A2E 0%, #0D0D1A 100%)',
            transition: 'background 0.35s ease',
          }}
        >
          {!showImage && (
            <Avatar
              sx={{
                width: '100%',
                height: '100%',
                fontSize: { xs: '3rem', md: '3.75rem' },
                fontWeight: 800,
                bgcolor: 'transparent',
                background: 'linear-gradient(135deg, #E52521 0%, #FBD000 100%)',
                fontFamily: '"Press Start 2P", monospace',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #8B0000',
              }}
            >
              ER
            </Avatar>
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
                p: { xs: 1.5, md: 2 },
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
              }}
            />
          )}
        </Box>
      </Box>

      {/* Indicador activo — estrella en lugar de dot verde */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: '#FBD000',
          border: '3px solid #8B4513',
          boxShadow: '0 0 10px rgba(251,208,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden
      />

      <Typography
        className="profile-label"
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: isLight ? '#1A0A00' : '#FBD000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.45rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textShadow: isLight ? '1px 1px 0 #C8821A' : '1px 1px 0 #8B0000',
          transition: 'color 0.35s ease',
        }}
      >
        ► Tech Lead
      </Typography>
    </Box>
  );
}
