import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BASE_URL, toastAlert } from '../../utils';
import axios from 'axios';
import Cookies from "js-cookie"
import apiEndPoints from '../../constant/apiEndPoints';

export default function MenuCARDAction({ isRefresh, setIsRefresh, 
    id, setMenuEditModal , setSelectMenu, menu}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            console.log("id", id)
            const response = await axios.delete(
                `${BASE_URL}${apiEndPoints.deleteMenu(menu._id)}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                }
            );
            handleClose()
            toastAlert({
                type: "success",
                message: response.data.message
            });
            setIsRefresh(prev => !prev);
        } catch (error) {
            handleClose()
            toastAlert({
                type: "error",
                message: error.message
            });
        }
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <IconButton aria-label="Example">
                    <MoreVertIcon fontSize='14px' sx={{
                        color: "white"
                    }} />
                </IconButton>
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
                <MenuItem onClick={()=>{
                    setSelectMenu(menu)
                    setMenuEditModal(true)
                    handleClose()
                }}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    );
}
