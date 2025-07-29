import React from 'react';
import fallbackImage from "../assets/default-fallback-image.png"
import Cookies from "js-cookie"
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
import { BASE_URL, toastAlert } from '../utils';
import apiEndPoints from '../constant/apiEndPoints';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
// import { increment } from '../redux/slices/cartSlice';

const obj = {
    customerName: "Shoukat rai",
    customerAddress: "karachi",
    menuName: "Burger",
    quantity: "2",
    menuId: "687f3808711db042160d7b59"
}

const UserMenuCard = ({ menu }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const makeOrderNow = async (menu) => {
        try {
            if(!Cookies.get("token")){
                return navigate("/login")
            }
            dispatch(addToCart(menu));
            toastAlert({
                type: "success",
                message: "Added to Cart"
            })
        } catch (error) {
            toastAlert({
                type: "error",
                message: error.message
            })
        }
    }


    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="180"
                image={menu.imageUrl || fallbackImage}
                alt={menu?.menuName}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={700} fontSize={{ xs: 18, sm: 22 }}>
                    {menu.menuName}
                </Typography>
                <Chip
                    label="Chinese"
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
                <Button variant="contained" color="primary" onClick={() => makeOrderNow(menu)}>
                    Order
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserMenuCard;
