import { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { Add } from '@mui/icons-material'
import { AddMenuModal } from '../../../components/modals/AddMenuModal'
import axios from 'axios'
import { BASE_URL } from '../../../utils'
import apiEndPoints from '../../../constant/apiEndPoints'
import Cookies from "js-cookie"
import MenuCard from '../../../components/MenuCard'
import { UpdateMenuModal } from '../../../components' 
import { VendorLayout } from '../../../components'



const VendoMenu = () => {
  const [addMenu, setAddMenu] = useState(false)
  const [menuData, setMenuData] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [selectMenu, setSelectMenu] = useState({}) //SELCT MENU
  const [menuEditModal, setMenuEditModal] = useState(false) //OPEN MODAL
  
  const fetchData = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.fetchMenu}`
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      console.log("menu response", response)
      setMenuData(response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  console.log("menuData", menuData)

  useEffect(() => {
    fetchData()
  }, [isRefresh])

  return (
    <div>
      <VendorLayout dashTitle = {"Vendor Menu"}>
        <Stack flexDirection={"row"} gap={3} spacing={2} sx={{ mt: 2 }} flexWrap={"wrap"}>
          {menuData?.map((menu) => (
            <MenuCard menu={menu} key={menu._id} isRefresh={isRefresh} setIsRefresh={setIsRefresh} selectMenu={selectMenu}
              setSelectMenu={setSelectMenu} setMenuEditModal = {setMenuEditModal} />
          ))}
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            borderRadius: '50%',
            minWidth: 56,
            minHeight: 56,
            boxShadow: 3,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setAddMenu(true)}
        >
          <Add fontSize="large" />
        </Button>

        {addMenu && <AddMenuModal
          open={addMenu}
          setOpen={setAddMenu}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        // selectRestaurant={selectRestaurant}
        />}

        {menuEditModal && <UpdateMenuModal
          open={menuEditModal}
          setOpen={setMenuEditModal}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
          selectMenu={selectMenu}
        />}
      </VendorLayout>
    </div>
  )
}

export default VendoMenu
