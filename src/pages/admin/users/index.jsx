import axios from 'axios'
import { AdminLayout } from '../../../components'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { BASE_URL, toastAlert } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import { useEffect, useState } from 'react'
import Cookies from  "js-cookie"


const Users = () => {
  const [usersData, setUsersData] = useState([])
  const fecthUsers = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.allusersGet}`
      const users = await axios.get(api , {
        headers : {
          Authorization : `Bearer ${Cookies.get("token")}`
        }
      })
      console.log(users)
      setUsersData(users.data.data)
    } catch (error) {
      toastAlert({
        type: 'error',
        message: error.message
      })
    }
  }

  useEffect(() => {
    fecthUsers()
  }, [])

  return (
    <AdminLayout dashTitle={"Admin Users"}>
      <TableContainer component={Paper} sx={{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
      }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption> All Vendors </caption>
          <TableHead>
            <TableRow>
              <TableCell> User Name </TableCell>
              <TableCell> User Email</TableCell>
              <TableCell> User Orders</TableCell>
              <TableCell> Gender </TableCell>
              <TableCell> Status </TableCell>
              <TableCell> Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.fullName}>
                <TableCell component="th" scope="row">
                  {user.fullName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orderCount}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{!user.isDeleted ? "Active" : null}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  )
}

export default Users
