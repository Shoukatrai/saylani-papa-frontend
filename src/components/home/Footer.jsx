import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <Box
  component="footer"
  sx={{
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    mt: 8,
    py: { xs: 4, md: 6 },
    px: { xs: 2, md: 8 },
    textAlign: 'center',
  }}
>
  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
    SaylaniPapa’s Kitchen
  </Typography>
  <Typography variant="body2" sx={{ mb: 2 }}>
    Fresh meals, fast delivery. Serving happiness since 2025.
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
    <a href="mailto:info@saylanipapa.com" style={{ color: 'inherit', textDecoration: 'none' }}>
      info@saylanipapa.com
    </a>
    <span>|</span>
    <a href="tel:+1234567890" style={{ color: 'inherit', textDecoration: 'none' }}>
      +1 234 567 890
    </a>
  </Box>
  <Typography variant="caption" sx={{ opacity: 0.8 }}>
    &copy; {new Date().getFullYear()} SaylaniPapa’s Kitchen. All rights reserved.
  </Typography>
</Box>
    </div>
  )
}

export default Footer
