import { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { getProfileImageUrl } from '../services/storageService';

const SIZE = { xs: 160, md: 200 };

export default function ProfileAvatar() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getProfileImageUrl()
      .then((url) => {
        if (!cancelled) setImageUrl(url);
      })
      .catch(() => {
        if (!cancelled) setImageUrl(null);
      });

    return () => {
      cancelled = true;
    };
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
          '&:hover': {
            transform: 'translateY(-10px) scale(1.04)',
          },
          '&:hover .profile-glow': {
            opacity: 0.9,
            filter: 'blur(14px)',
            inset: -18,
          },
          '&:hover .profile-ring': {
            boxShadow:
              '0 28px 56px rgba(56, 189, 248, 0.35), 0 12px 32px rgba(129, 140, 248, 0.28), 0 0 0 1px rgba(192, 132, 252, 0.35)',
          },
          '&:hover .profile-inner': {
            background:
              'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.28) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(129, 140, 248, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          },
          '&:hover .profile-label': {
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
        },
      }}
    >
      <Box
        className="profile-glow"
        sx={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #38bdf8, #818cf8, #c084fc, #38bdf8)',
          opacity: 0.55,
          filter: 'blur(8px)',
          transition: 'opacity 0.35s ease, filter 0.35s ease, inset 0.35s ease',
        }}
      />

      <Box
        className="profile-ring"
        sx={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          p: '3px',
          background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #6366f1 100%)',
          boxShadow: '0 24px 48px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(148, 163, 184, 0.15)',
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
            background:
              'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.18) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
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
                background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
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
              onError={() => {
                setImageUrl(null);
                setLoaded(false);
              }}
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
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35))',
              }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: '#22c55e',
          border: '3px solid #0f172a',
          boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)',
        }}
        aria-hidden
      />

      <Typography
        className="profile-label"
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'text.secondary',
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          transition: 'color 0.35s ease',
        }}
      >
        Tech Lead
      </Typography>
    </Box>
  );
}
