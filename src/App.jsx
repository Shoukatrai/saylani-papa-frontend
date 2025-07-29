import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from './pages'
import { Bounce, ToastContainer } from 'react-toastify'
import { ClientDash, OrderFromRestaurants, SingleRestaurant } from './pages/client'
import { AdminDashboard, Menues, Orders, Restaurants, Users, Vendors } from './pages/admin'
import { VendoMenu, Order, VendorDash, VendorRestaurant } from './pages/vendor'
import { AdminRoutes, AuthRoutes, VendorRoutes, ClientRoutes } from './routes'
import VerifyEmail from './pages/email/VerifyEmail'
import Unauthorized from './pages/routesHandle/Unauthorized'
import NotFoundPage from './pages/routesHandle/NotFoundPage '
import CheckoutPage from './pages/client/cart/Cart'




function App() {

  return (
    <>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<AuthRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user-verification' element={<VerifyEmail />} />
          </Route>

          <Route element={<VendorRoutes />}>
            <Route path='/vendor-dashboard' element={<VendorDash />} />
            <Route path='/vendor-restaurant' element={<VendorRestaurant />} />
            <Route path='/vendor-order' element={<Order />} />
            <Route path='/vendor-menu' element={<VendoMenu />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/admin-restaurants' element={<Restaurants />} />
            <Route path='/admin-orders' element={<Orders />} />
            <Route path='/admin-users' element={<Users />} />
            <Route path='/admin-menus' element={<Menues />} />
            <Route path='/admin-vendors' element={<Vendors />} />


          </Route>

          <Route index element={<ClientDash />} />
          <Route element={<ClientRoutes />}>
            <Route path='/order-now' element={<OrderFromRestaurants />} />
            <Route path='/cart' element={<CheckoutPage />} />
            <Route path='/single-restaurant' element={<SingleRestaurant />} />
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />


        </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
