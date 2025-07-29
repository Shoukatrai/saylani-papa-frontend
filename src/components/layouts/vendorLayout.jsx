import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem, Stack } from '@mui/material';
import Cookies from 'js-cookie';


const linkStyle = {
    textDecoration: 'none',
    color: '#444', // default text color
    width: '100%',
    display: 'flex',
    alignItems: 'center',
};

const activeLinkStyle = {
    ...linkStyle,
    color: '#1976d2', // Material UI primary color
    fontWeight: 'bold',
};


const VendorListing = [
    {
        name: 'Home',
        url: "/vendor-dashboard",
        icon: <DashboardIcon />
    },
    {
        name: 'Resturant',
        url: "/vendor-restaurant",
        icon: <RestaurantIcon />
    },
    {
        name: 'Menu',
        url: "/vendor-menu",
        icon: <AssignmentIcon />
    }, {
        name: 'Orders',
        url: "/vendor-order",
        icon: <ShoppingCartIcon />
    },

]

const drawerWidth = 240;

function VendorLayout(props) {
    const { window, children, dashTitle } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };


    const navigate = useNavigate()
    const handleLogout = () => {
        Cookies.remove("token")
        Cookies.remove("type")
       
        handleClose()
        navigate("/login")
    }

    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <Stack flexDirection={"row"} textAlign={"center"} justifyContent={"center"} alignContent={"center"} my={1.4}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32', letterSpacing: 1 }}>
                    Saylani
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'blue', letterSpacing: 1 }}>
                    PAPA
                </Typography>
            </Stack>
            <Divider />
            <List>
                {VendorListing.map((list, index) => (
                    <ListItem key={list.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {list.icon}
                            </ListItemIcon>
                            <Link to={list.url} style={linkStyle}>
                                <ListItemText primary={list.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                {/* <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant="h6" noWrap component="div">
                            {dashTitle}
                        </Typography>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </Stack>
                </Toolbar> */}
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>{dashTitle}</Typography>
                    </Box>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar
                            sx={{ width: { xs: 36, md: 56 }, height: { xs: 36, md: 56 } }}
                        />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}

            </Box>
        </Box>
    );
}

VendorLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default VendorLayout;