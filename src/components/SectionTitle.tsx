import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: align }}>
      <Typography
        variant="overline"
        color="primary"
        sx={{ letterSpacing: 2, fontWeight: 700, display: 'block', mb: 1 }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: subtitle ? 1.5 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: align === 'center' ? 720 : 640, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
