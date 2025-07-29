import { Stack, TextField, Typography, Container, Paper, Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, toastAlert } from '../../utils'
import Cookies from "js-cookie"
import apiEndPoints from '../../constant/apiEndPoints'


const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onSubmit = async (obj) => {
    try {
      setLoading(true)
      console.log("obj", obj)
      const api = `${BASE_URL}${apiEndPoints.login}`
      const response = await axios.post(api, obj)
      if(!response.data.status){
        toastAlert({
          type : "error",
          message : response.data.message
        })
        setLoading(false)
        return
      }


      if (!response?.data?.data?.isVerified) {
        const email = response?.data?.data?.email
        const type = response?.data?.data?.type
        const token = response?.data?.token
        toastAlert({
          type: "success",
          message: "Login successful. Please verify your email."
        });
        
        navigate("/user-verification", {
          state: {
            email: email,
            page: "login",
            token: token ,
            type : type
          }
        });
        console.log("navigation to user verification end")
        return;
      }
      
      Cookies.set("token", response.data.token)
      Cookies.set("type", response.data.data.type)
      setLoading(false)
      const userType = response.data.data.type

      if (userType === "admin") {
        navigate("/admin-dashboard")
      } else if (userType === "vendor") {
        navigate("/vendor-dashboard")
      } else if (userType === "customer") {
        navigate("/")
      }

      toastAlert({
        type: "success",
        message: response.data.message
      })

    } catch (error) {
      setLoading(false)
      console.log("error", error.message)
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  }
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Stack gap={3} component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" align="center" fontWeight={700} color="primary">
            LOGIN
          </Typography>
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
          <Typography variant="body1" align="center" fontWeight={700} color="primary">
            Don't have an account? <Link to={"/signup"}>Create Account</Link>
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{
            mt: 2,
            color: 'white',
            display: 'flex',
            gap: "20px"
          }} type='submit'>
            {loading ? <CircularProgress color='white' size={20} /> : "LOGIN"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Login
