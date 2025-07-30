import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const summaryData = [
  {
    title: "Total Orders",
    value: 120,
    icon: <ShoppingCartIcon />,
    color: "#1976d2",
  },
  {
    title: "Active Orders",
    value: 120,
    icon: <ShoppingCartIcon />,
    color: "#1976d2",
  },
  {
    title: "Daily Revenue",
    value: "$1,250",
    icon: <MonetizationOnIcon />,
    color: "#388e3c",
  },
  {
    title: "Total Customers",
    value: 89,
    icon: <PeopleIcon />,
    color: "#f57c00",
  },
  {
    title: "Reviews",
    value: 35,
    icon: <StarIcon />,
    color: "#fbc02d",
  },
  {
    title: "Restaurants",
    value: 3,
    icon: <RestaurantIcon />,
    color: "#8e24aa",
  },
];

const revenueChartData = [
  { day: "Mon", revenue: 200 },
  { day: "Tue", revenue: 300 },
  { day: "Wed", revenue: 150 },
  { day: "Thu", revenue: 400 },
  { day: "Fri", revenue: 350 },
  { day: "Sat", revenue: 500 },
  { day: "Sun", revenue: 250 },
];

const VendorDashboard = () => {
  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Vendor Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Avatar sx={{ bgcolor: item.color, mr: 2 }}>{item.icon}</Avatar>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography variant="h6">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue Chart */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Revenue Over Last 7 Days
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueChartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1976d2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
      

      {/* Quick Actions */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" fullWidth>
              Add New Product
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Manage Orders
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Manage Restaurants
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth>
              Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
