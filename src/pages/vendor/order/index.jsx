import React, { useEffect, useState } from 'react'
import { VendorLayout } from '../../../components'
import axios from 'axios'
import { BASE_URL, toastAlert } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import Cookies from "js-cookie"
import { FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Order = () => {
  const [ordersData, setOrdersData] = useState([])

  const fetchAllOrders = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.fecthAllOrders}`
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      })
      console.log("response", response)
      setOrdersData(response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const handleStatusChange = async (id, orderStatus) => {
    try {
      console.log("orderStatus", orderStatus)
      console.log("id", id)
      const updateObj = {
        orderStatus: orderStatus
      }
      const api = `${BASE_URL}${apiEndPoints.vendorOrderStatus(id)}`
      const response = await axios.patch(api, updateObj, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      setOrdersData(ordersData.map(order => order._id === id ? { ...order, orderStatus: orderStatus } : order))
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
    <div>
      <VendorLayout dashTitle={"Vendor Orders"}>
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
            aria-label="orders table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Menu Items</TableCell>
                <TableCell>Total Quantity</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData.map((order) => {
                const itemsString = order.items
                  .map(item => `${item.menuName} (x${item.quantity})`)
                  .join(", ");

                const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

                return (
                  <TableRow
                    key={order._id}
                    sx={{
                      bgcolor:
                        order.orderStatus === "delivered"
                          ? "success.light"
                          : order.orderStatus === "cancelled"
                            ? "error.light"
                            : order.orderStatus === "preparing"
                              ? "warning.light"
                              : "background.paper",
                      '&:hover': {
                        bgcolor: 'grey.200',
                        transition: 'background 0.2s',
                      },
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{itemsString}</TableCell>
                    <TableCell>{totalQuantity}</TableCell>
                    <TableCell>Rs. {order.totalAmount}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth size="small">
                        <Select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          {["pending", "confirmed", "preparing", "delivered", "cancelled"].map((status) => (
                            <MenuItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </VendorLayout>
    </div>
  )
}

export default Order
