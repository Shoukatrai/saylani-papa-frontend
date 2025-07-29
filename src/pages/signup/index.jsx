import { Stack, TextField, Typography, Container, Paper, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form"
import axios from 'axios'
import { BASE_URL, toastAlert } from '../../utils'
import { useState } from 'react'
import apiEndPoints from '../../constant/apiEndPoints'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            gender: "",
            type: ""
        }
    })
    const onSubmit = async (obj) => {
        try {
            setLoading(true)
            console.log("obj", obj)
            const api = `${BASE_URL}${apiEndPoints.signup}`
            const response = await axios.post(api, obj)
            console.log("response", response.data)

            setLoading(false)
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
                navigate("/user-verification", {
                    state: {
                        email: response.data.data.email,
                        page: "signup" 
                    }
                });

            }
        } catch (error) {
            setLoading(false)
            toastAlert({
                type: "error",
                message: error.message
            })

        }
    }


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                <Stack gap={1.5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" align="center" fontWeight={700} color="primary">
                        SINGUP
                    </Typography>
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                            {...field}
                        />
                        )}
                        name="fullName"
                    />
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            required
                            {...field}
                        />
                        )}
                        name="email"
                    />
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            required
                            {...field}
                            type='password'
                        />
                        )}
                        name="password"
                    />
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            required
                            type='number'
                            {...field}
                        />
                        )}
                        name="phoneNumber"
                    />
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<TextField
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            required
                            {...field}
                        />
                        )}
                        name="gender"
                    />
                    <Controller
                        control={control}
                        render={({ field, formState: { errors } }) => (<FormControl >
                            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={""}
                                label="Age"
                                {...field}
                            >
                                <MenuItem value={"customer"}>Customer</MenuItem>
                                <MenuItem value={"vendor"}>Vendor</MenuItem>
                            </Select>
                        </FormControl>)}
                        name="type"
                    />


                    <Typography variant="body1" align="center" fontWeight={700} color="primary">
                        Have an account? {' '}
                        <Link to={"/login"}>Login</Link>
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{
                        mt: 2,
                        color: 'white',
                        display: 'flex',
                        gap: "20px"
                    }} type='submit' >
                        {loading ? <CircularProgress color='white' size={20} /> : "SignUP"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Signup
