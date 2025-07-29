import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, toastAlert } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import Cookies from "js-cookie"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { AdminLayout } from '../../../components'

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    fetchData()
  }, [refresh])

  const fetchData = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.adminAllRestaurant}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")} `
        }
      })
      setRestaurants(response.data.data)
      console.log("response", response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const approveRestaurant = async (obj) => {
    try {
      console.log(obj.isApproved, "OBJ")
      const api = `${BASE_URL}${apiEndPoints.restaurantApproval(obj._id)}`
      const body = {
        isApproved: !obj.isApproved
      }

      const approveRes = await axios.patch(api, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      toastAlert({
        type: "success",
        message: "Status Changed"
      })
      setRefresh(!refresh)
      console.log("approveRes", approveRes)
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  }
  const deleteRestaurant = async (obj) => {
    try {
      console.log(obj.isDeleted, "OBJ")
      const api = `${BASE_URL}${apiEndPoints.restaurantAdminDelete(obj._id)}`
      if (obj.isDeleted) {
        return toastAlert({
          type: "success",
          message: "Restaurant Already Deleted!"
        })
      }
      const body = {
        isDeleted: true
      }

      const approveRes = await axios.patch(api, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      toastAlert({
        type: "success",
        message: "Restaurant Deleted"
      })
      setRefresh(!refresh)
      console.log("approveRes", approveRes)
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  }

  return (
    <AdminLayout>
      <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3, mt: 3 }}>
        <Table
          sx={{
            minWidth: 650,
            '& th': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 },
              borderBottom: '2px solid #e0e0e0',
              letterSpacing: 1,
              textAlign: "center"
            },
            '& td': {
              fontSize: { xs: 13, sm: 15 },
              py: 1.5,
              textAlign: "center"
            },
          }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Deleted</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant, idx) => (
              <TableRow
                key={restaurant._id}
                sx={{
                  bgcolor: idx % 2 === 0 ? 'grey.100' : 'background.paper',
                  '&:hover': {
                    bgcolor: 'grey.200',
                    transition: 'background 0.2s',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell scope="row">
                  {restaurant.restaurantName}
                </TableCell>
                <TableCell>{restaurant.category}</TableCell>
                <TableCell>{restaurant.contactNumber}</TableCell>
                <TableCell>{restaurant.email}</TableCell>
                <TableCell>
                  <span style={{
                    color: restaurant.isDeleted ? '#d32f2f' : '#388e3c',
                    fontWeight: 600
                  }}>
                    {restaurant.isDeleted ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{
                    color: restaurant.isApproved ? '#388e3c' : '#fbc02d',
                    fontWeight: 600
                  }}>
                    {restaurant.isApproved ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(restaurant.createAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Tooltip sx={{ marginInline: "7px" }} title={restaurant.isApproved ? "DisApprove" : "Approve"} >
                    {restaurant.isApproved ? <CheckCircleIcon onClick={() => approveRestaurant(restaurant)} /> : <UnpublishedIcon onClick={() => approveRestaurant(restaurant)} />}
                  </Tooltip>

                  <Tooltip title= {!restaurant.isDeleted ? "Delete" : "Already Deleted"}>
                    {!restaurant.isDeleted ? (
                      <DeleteIcon onClick={() => { deleteRestaurant(restaurant) }} />
                    ) : (
                      <DoneIcon />
                    )
                    }
                  </Tooltip>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  )
}

export default Restaurants
