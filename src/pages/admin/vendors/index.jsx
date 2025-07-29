import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../../components'
import { Badge, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { BASE_URL, toastAlert } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import Cookies from "js-cookie"


const Vendors = () => {
  const [vendorsData, setVendorsData] = useState([])
  const fecthData = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.allVendorsGet}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      console.log("REPONSE", response)
      setVendorsData(response.data.data)
    } catch (error) {
      console.log(error.message)
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  }

  useEffect(() => {
    fecthData()
  }, [])
  return (
    <div>
      <AdminLayout dashTitle={"All Vendors"}>
        <TableContainer component={Paper} sx={{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
      }}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption> All Vendors </caption>
            <TableHead>
              <TableRow>
                <TableCell> Vendor Name </TableCell>
                <TableCell> Vendor Email</TableCell>
                <TableCell> Vendor Restaurants </TableCell>
                <TableCell> Gender </TableCell>
                <TableCell> Status </TableCell>
                <TableCell> Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorsData.map((vendor) => (
                <TableRow key={vendor.fullName}>
                  <TableCell component="th" scope="row">
                    {vendor.fullName}
                  </TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.resCount}</TableCell>
                  <TableCell>{vendor.gender}</TableCell>
                  <TableCell>{!vendor.isDeleted ? "Active" : null}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AdminLayout>
    </div>
  )
}

export default Vendors
