import { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import { Typography, Box, Stack } from '@mui/material'
import HeroSec from '../../../components/home/heroSec'
import TopMenues from '../../../components/home/topMenus'
import TopRestaurantCard from '../../../components/home/TopRestaurantCard'
import Footer from '../../../components/home/Footer'
import axios from 'axios'
import { BASE_URL } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import Cookies from "js-cookie"
import { MakeOrderModal } from '../../../components/modals/MakeOrderModal'
import { useSelector } from 'react-redux'

const ClientDash = () => {
  const [refresh, setRefresh] = useState(true)
  const [restaurants, setRestaurants] = useState([])
  const [menuData, setMenuData] = useState([])
  const user = useSelector((state)=>state.user)
  console.log("redux user" , user)

  const fetchMenu = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.userGetMenu}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      setMenuData(response.data.data)
    } catch (error) {
      console.log("menu error", error)
    }
  }

  const fetchRestaurants = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.userGetRes}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      setRestaurants(response.data.data)
    } catch (error) {
      console.log("error", error.message)
    }
  }

  useEffect(() => {
    fetchMenu()
    fetchRestaurants()
  }, [refresh])

  return (
    <>
      <Navbar />
      <HeroSec />


      <Box>
        <Typography
          component="h2"
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{
            mb: 4,
            textAlign: 'center',
            letterSpacing: 1,
          }}
        >
          Top Picks from SaylaniPapa’s Kitchen
        </Typography>
        <TopMenues menuData={menuData} />
      </Box>


      <Box

      >
        <Typography
          component="h2"
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{
            mb: 4,
            textAlign: 'center',
            letterSpacing: 1,
          }}
        >
          Our Top Restaurants
        </Typography>
        <Stack
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 2,
            px: { xs: 2, md: 4 },
            py: { xs: 4, md: 6 },
            maxWidth: 1200,
            mx: 'auto',
            mb: 6,
          }}
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {restaurants.map((restaurant) => (
            <Box
              key={restaurant._id}
              sx={{
                flex: '1 1 320px',
                minWidth: { xs: '100%', sm: 260, md: 320 },
                maxWidth: 360,
                mb: { xs: 3, md: 0 },
                display: 'flex',
                alignItems: 'stretch',
                px: { xs: 0, sm: 1 },
              }}
            >
              <TopRestaurantCard restaurant={restaurant} />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* //citie sec */}
      <Typography
        component="h2"
        variant="h4"
        fontWeight={700}
        color="primary"
        sx={{
          mb: 4,
          textAlign: 'center',
          letterSpacing: 1,
        }}
      >
        Delivering Happiness Across These Cities 🎉
      </Typography>

      <Footer />
    </>
  )
}

export default ClientDash
