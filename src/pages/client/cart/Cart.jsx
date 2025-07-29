import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../../../redux/slices/cartSlice';
import axios from "axios"
import Cookies from "js-cookie"
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Box,
  Stack,
} from '@mui/material';
import Navbar from '../../../components/navbar';
import apiEndPoints from '../../../constant/apiEndPoints';
import { BASE_URL, toastAlert } from '../../../utils';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartItems", cartItems)
  const dispatch = useDispatch();

  const itemsToSend = cartItems.map(item => ({
    menuId: item._id,
    menuName: item.menuName,
    price: Number(item.menuPrice),
    quantity: item.quantity
  }));




  console.log("itemsToSend", itemsToSend)
  const total = cartItems.reduce((sum, item) => sum + Number(item.menuPrice) * item.quantity, 0);


  const handlePlaceOrder = async () => {
    try {
      const orderObj = {
        items: itemsToSend,
        totalAmount: Number(total)
      }
      const api = `${BASE_URL}${apiEndPoints.makeOrder}`
      const repsonse = await axios.post(api, orderObj, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
      console.log("repsonse", repsonse)
      toastAlert({
        type: "success",
        message: "Order Placed Successfully!"
      })
      dispatch(clearCart());
    } catch (error) {
      console.log("error", error)
      toastAlert({
        type: "error",
        message: error.message
      })
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {cartItems?.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Stack spacing={2}>
              {cartItems.map((item, index) => (
                <Box key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6">{item.menuName}</Typography>
                          <Typography color="text.secondary">Rs {item.menuPrice}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                          <Box display="flex" gap={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => dispatch(decreaseQuantity(item._id))}
                            >
                              -
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => dispatch(increaseQuantity(item._id))}
                            >
                              +
                            </Button>
                          </Box>

                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => dispatch(removeFromCart(item._id))}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Total: {Math.round(total)}
              </Typography>
              <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default CheckoutPage;
