import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import { RestaurantCard } from '../../../components'
import { BASE_URL } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import axios from 'axios'
import Cookies from "js-cookie"
import { Box, Typography } from '@mui/material'

const OrderFromRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])

  const fetchAllRestaurants = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.userOrderRes}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      console.log("response", response)
      setRestaurants(response.data.data)
    } catch (error) {
      console.log("error", error.message)
    }
  }

  useEffect(() => {
    fetchAllRestaurants()
  }, [])

  return (
    <div>
      <Navbar />

      <Box px={{ xs: 2, sm: 4 }} py={4}>
        {restaurants.length === 0 ? (
          <Typography variant="h6" align="center">No restaurants found.</Typography>
        ) : (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            mx={{ xs: -0.5, sm: -1 }}
          >
            {restaurants.map((restaurant) => (
              <Box
                key={restaurant._id}
                sx={{
                  flex: '1 1 auto',
                  minWidth: { xs: '100%', sm: '50%', md: 320 },
                  maxWidth: { xs: '100%', sm: '50%', md: 360 },
                  mb: { xs: 3, sm: 4 },
                  px: { xs: 0.5, sm: 1 },
                  display: 'flex',
                  alignItems: 'stretch',
                  boxSizing: 'border-box',
                }}
              >
                <RestaurantCard restaurant={restaurant} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  )
}

export default OrderFromRestaurants
