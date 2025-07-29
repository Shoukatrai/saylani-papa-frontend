import React, { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";
import Navbar from "../../../components/navbar";
import OrderStatusNavbar from "../../../components/navbar/CartNavbar";

const OrdersPage = () => {
  const [status, setStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders?status=${status}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(status);
  }, [status]);

  return (
    <Box>
      <Navbar />
      <OrderStatusNavbar
        currentStatus={status}
        onStatusChange={(newStatus) => setStatus(newStatus)}
      />

      <Box p={2}>
        {loading ? (
          <CircularProgress />
        ) : orders.length === 0 ? (
          <Typography>No orders found for "{status}"</Typography>
        ) : (
          orders.map((order) => (
            <Box key={order.id} p={2} border="1px solid #ccc" borderRadius="8px" mb={2}>
              <Typography variant="subtitle1">Order ID: {order.id}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Typography>Total: ${order.total}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
