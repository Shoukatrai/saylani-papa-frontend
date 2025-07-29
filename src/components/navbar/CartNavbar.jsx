// components/OrderStatusNavbar.js

import React from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";

const tabList = ["All", "Pending", "Confirmed", "Delivered", "Completed"];

const OrderStatusNavbar = ({ currentStatus, onStatusChange }) => {
  const handleChange = (event, newValue) => {
    onStatusChange(tabList[newValue]);
  };

  return (
    <Paper elevation={1}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabList.indexOf(currentStatus)}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="order status tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabList.map((status, index) => (
            <Tab key={index} label={status} />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

export default OrderStatusNavbar;
