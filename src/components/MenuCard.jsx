import React from 'react';
import fallbackImage from "../assets/default-fallback-image.png"

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip
} from '@mui/material';
import MenuCARDAction from './actions/MenuCardAction';



const MenuCard = ({ menu, isRefresh, setIsRefresh , setMenuEditModal , setSelectMenu}) => {


  
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        px: 1,
        py: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6" fontWeight={700} fontSize={{ xs: 18, sm: 22 }}>
          {menu?.menuName}
        </Typography>
        <MenuCARDAction
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
          id={menu._id}
          menu={menu}
          setMenuEditModal = {setMenuEditModal}
          setSelectMenu = {setSelectMenu}
        />
      </Box>
      <CardMedia
        component="img"
        height="180"
        image={menu?.imageUrl || fallbackImage }
        alt={menu?.menuName}
      />
      <CardContent>
        <Chip
          label={menu.menuCategory}
          variant="outlined"
          color="info"
          size="small"
          sx={{ mr: 1, mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {menu.menuDetails}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" color="success.main">
          {menu.menuPrice}
        </Typography>
        <Button variant="contained" color="primary">
          Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenuCard;
