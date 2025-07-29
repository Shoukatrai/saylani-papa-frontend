import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { BASE_URL, toastAlert } from '../../utils';
import axios from 'axios';
import Cookies from "js-cookie"
import apiEndPoints from '../../constant/apiEndPoints';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90vw', sm: 400, md: 500 },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 8,
    p: { xs: 2, sm: 4 },
    border: 'none',
    outline: 'none',
};

export const AddResModal = ({ open, setOpen, isRefresh, setIsRefresh }) => {
    const [loading, setLoading] = React.useState(false)
    const [logoImage, setLogoImage] = React.useState()
    const handleClose = () => setOpen(false);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            restaurantName: "",
            details: "",
            contactNumber: "",
            address: "",
            email: "",
            category: "",
        }
    })

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setLogoImage(e.target.files[0])
    };


    const onSubmit = async (obj) => {
        try {
            console.log("obj", obj)
            setLoading(true)
            let imageUrl;
            if (logoImage) {
                const formData = new FormData()
                formData.append("image", logoImage)

                const imageApi = "http://localhost:5000/api/image/upload"
                const imageRes = await axios.post(imageApi, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                })
                imageUrl = imageRes.data.url
            }

            const bodyObj = {
                ...obj,
                imageUrl: imageUrl || null
            }
            const api = `${BASE_URL}${apiEndPoints.createRestaurant}`
            const response = await axios.post(api, bodyObj, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")} `
                }
            })
            console.log("response", response.data)
            setLoading(false)
            setLogoImage()
            if (!response.data.status) {
                toastAlert({
                    type: "error",
                    message: response.data.message
                })
            } else {
                toastAlert({
                    type: "success",
                    message: response.data.message
                })
                reset({})
                handleClose()
                setIsRefresh(!isRefresh)
            }

        } catch (error) {
            setLoading(false)
            toastAlert({
                type: "error",
                message: error.message
            })

        }
    }
    const categories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Other'];
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Stack
                            gap={1.5}
                            component={"form"}
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{
                                minHeight: { xs: 'auto', sm: '80vh' }, // responsive minHeight
                                width: "100%"
                            }}
                        >
                            <Typography variant="h4" align="center" fontWeight={700} color="primary">
                                Create Restaurant
                            </Typography>
                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="Restaurant Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                />
                                )}
                                name="restaurantName"
                            />
                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="Details"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                />
                                )}
                                name="details"
                            />
                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="Contact Number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                />
                                )}
                                name="contactNumber"
                            />
                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                />
                                )}
                                name="address"
                            />
                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                    type='email'
                                />
                                )}
                                name="email"
                            />

                            <Controller
                                control={control}
                                render={({ field, formState: { errors } }) => (<TextField
                                    label="category"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...field}
                                    select
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                )}
                                name="category"
                            />
                            <Button variant="outlined" component="label">
                                Upload Logo
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    name="logo"
                                    onChange={handleChange}
                                />
                            </Button>


                            {logoImage && (
                                <Typography variant="body2" color="text.secondary">
                                    Selected file: {logoImage.name}
                                </Typography>
                            )}

                            <Button variant="contained" color="primary" size="large" sx={{
                                mt: 2,
                                color: 'white',
                                display: 'flex',
                                gap: "20px"
                            }} type='submit' >
                                {loading ? <CircularProgress color='white' size={20} /> : "Create Restaurant"}
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}