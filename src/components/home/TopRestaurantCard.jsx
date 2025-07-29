import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Cancel, CheckCircle, Email, LocationOn, Phone } from '@mui/icons-material';
import { Button, Chip, Stack, Box, CardMedia } from '@mui/material';

// import { toastAlert } from '../utils';
// import axios from 'axios';
// import Cookies from "js-cookie"
import fallBackImage from "../../assets/default-fallback-image.png"
// import ActionMenu from './actions/actionMenu';


export default function TopRestaurantCard({ restaurant }) {
    console.log("restaurant" , restaurant)
    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 360,
                m: 'auto',
                boxShadow: 4,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 340,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: 8,
                },
                bgcolor: 'background.paper',
            }}
        >

            <Box sx={{
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CardMedia
                    component="img"
                    image={restaurant.imageUrl || fallBackImage}
                    alt="Restaurant"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 2,
                    }}
                />

            </Box>
            <CardActionArea>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="h6" fontWeight={700} fontSize={{ xs: 20, sm: 24 }} mb={1}>
                       {restaurant.restaurantName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2} fontSize={{ xs: 14, sm: 16 }}>
                         {restaurant.details}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Phone fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 13, sm: 15 }}>
                            {restaurant.contactNumber}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <LocationOn fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 13, sm: 15 }}>
                           {restaurant.address}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                        <Email fontSize="small" color="primary" />
                        <Typography variant="body2" fontSize={{ xs: 13, sm: 15 }}>
                            {restaurant.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                        <Chip
                            label={restaurant.category}
                            variant="outlined"
                            color="info"
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                        />  
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Stack direction="row" spacing={2} width="100%" justifyContent="space-between">
                    <Button
                        size="small"
                        variant="outlined"
                        color= {restaurant.isOpen ? "success" : "warning"}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                        }}
                    >
                        {restaurant.isOpen ? "open" : "close"}
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
