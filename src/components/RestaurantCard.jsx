import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Cancel, CheckCircle, Email, LocationOn, Phone } from '@mui/icons-material';
import { Button, Chip, Stack, Box, CardMedia } from '@mui/material';

import { BASE_URL, toastAlert } from '../utils';
import axios from 'axios';
import Cookies from "js-cookie"
import fallBackImage from "../assets/default-fallback-image.png"
import ActionMenu from './actions/actionMenu';
import { useNavigate } from 'react-router-dom';


export default function RestaurantCard({ restaurant, isRefresh,
    setIsRefresh, updateResModal, setUpdateResModal, setSelectRestaurant }) {
    console.log("restaurant card check", restaurant)
    const navigate = useNavigate()

    const statusHandler = async (id) => {
        console.log("statusHandler", id)
        try {
            const updateObj = {
                isOpen: !restaurant.isOpen
            }
            const response = await axios.patch(`${BASE_URL}/restaurant/vendor-restaurant-status/${id}`, updateObj, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })


            setIsRefresh(!isRefresh)
            toastAlert({
                type: "success",
                message: response.data.message
            });
        } catch (error) {
            toastAlert({
                type: "error",
                message: error.message
            });
        }
    }
    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 345, md: 400 },
                m: 'auto',
                boxShadow: 6,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 320,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: 10,
                },
                bgcolor: 'background.default',
            }}
        >
            {/* Header */}
            <Box sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 2,
                py: 1.5,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h6" fontWeight={700} fontSize={{ xs: 18, sm: 22 }}>
                    {restaurant?.restaurantName}
                </Typography>
                <ActionMenu
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                    id={restaurant._id}
                    updateResModal={updateResModal}
                    setUpdateResModal={setUpdateResModal}
                    setSelectRestaurant={setSelectRestaurant}
                    restaurant={restaurant}
                />
            </Box>
            {/* Responsive Image */}
            <Box sx={{
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CardMedia
                    component="img"
                    image={restaurant.imageUrl || fallBackImage}
                    alt={restaurant?.restaurantName}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>
            <CardActionArea>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="body2" color="text.secondary" mb={2} fontSize={{ xs: 13, sm: 15 }}>
                        {restaurant?.details}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Phone fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 12, sm: 14 }}>
                            {restaurant?.contactNumber}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <LocationOn fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 12, sm: 14 }}>
                            {restaurant?.address}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                        <Email fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 12, sm: 14 }}>
                            {restaurant?.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                        <Chip
                            label={restaurant?.category}
                            variant="outlined"
                            color="info"
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                            label={restaurant?.isApproved ? "Approved" : "Pending"}
                            icon={restaurant?.isApproved ? <CheckCircle /> : <Cancel />}
                            color={restaurant?.isApproved ? "success" : "warning"}
                            size="small"
                            sx={{ mb: 1 }}
                        />
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Stack direction="row" spacing={2} width="100%" justifyContent="space-between">
                    <Button
                        size="small"
                        variant="outlined"
                        color={restaurant?.isOpen ? 'success' : 'error'}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                        }}
                        onClick={() => {
                            statusHandler(restaurant._id)
                        }}
                    >
                        {restaurant?.isOpen ? 'Open' : 'Closed'}
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                        }}
                        
                    >
                        View Details
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}
