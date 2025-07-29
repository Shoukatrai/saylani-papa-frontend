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

const obj = {
    customerName: "Shoukat rai",
    customerAddress: "karachi",
    menuName: "Burger",
    quantity: "2",
    menuId: "687f3808711db042160d7b59"
}

const UserMenuCard = ({ menu }) => {
    const navigate = useNavigate()
    const makeOrderNow = async (menu) => {
        try {
            const token = Cookies.get("token")
            if (!token) {
                console.log("token")
                navigate("/login")
                return;
            }
            console.log("makeOrderNow")
            const saveObj = {
                menuName: menu.menuName,
                menuId: menu._id
            }
            const api = `${BASE_URL}${apiEndPoints.makeOrder}`
            const response = await axios.post("http://localhost:5000/api/client/make-order", saveObj, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log("order response", response)
            toastAlert({
                type: "success",
                message: response.data.message
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
