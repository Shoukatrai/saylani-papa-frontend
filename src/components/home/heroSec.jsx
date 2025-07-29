import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import heroImg from "../../assets/hero.avif"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const HeroSec = () => {
  const navigate = useNavigate()
  const hadleOrder = () => {
    const token = Cookies.get("token")
    if (!token) {
      navigate("/login")
      return;
    }
    navigate("/order-now")
  }


const hadleSignIn = () => {
  const token = Cookies.get("token")
  if (!token) {
    navigate("/login")
  }
}
return (
  <Box
    sx={{
      minHeight: { xs: '60vh', md: '80vh' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.paper',
      px: { xs: 2, md: 8 },
      py: { xs: 4, md: 8 },
    }}
  >
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={6}
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >

      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h2"
          fontWeight={800}
          color="primary"
          sx={{
            fontSize: { xs: 32, sm: 40, md: 56 },
            mb: 2,
            lineHeight: 1.1,
          }}
        >
          Fresh meals, fast to your door
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, fontSize: { xs: 16, sm: 20 } }}
        >
          With SaylaniPapa's care, enjoy delicious food delivered quickly and safely.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 3, px: 4 }} onClick={hadleOrder}>
            Order Now
          </Button>
          <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: 3, px: 4 }} onClick={hadleSignIn}>
            Sign in As Vendor
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: { xs: '100%', md: 400 },
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          component="img"
          src={heroImg}
          alt="Delicious food"
          sx={{
            width: '100%',
            height: { xs: 200, sm: 300, md: 400 },
            objectFit: 'cover',
            borderRadius: 6,
            boxShadow: 4,
          }}
        />
      </Box>
    </Stack>
  </Box>
)
}

export default HeroSec
