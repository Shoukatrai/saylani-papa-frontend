import React from 'react'
import UserMenuCard from '../userMenuCard'
import { Box, Button, Stack, Typography } from '@mui/material'


const TopMenues = ({menuData}) => {
  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 2,
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          maxWidth: 1200,
          mx: 'auto',
          mb: 6,
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="stretch"
        >
          
          {menuData.map((item) => (
            <Box key={item._id} sx={{ minWidth: 260, maxWidth: 340, flex: '1 1 260px', mb: { xs: 2, md: 0 } }}>
              <UserMenuCard menu = {item}/>
            </Box>
          ))}
        </Stack>
      </Box>
    </div>
  )
}

export default TopMenues
