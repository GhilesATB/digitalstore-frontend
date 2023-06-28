import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import StoreMenu from "./StoreMenu";
import AccountMenu from "./AccountMenu";
import PermissionsGate from "../../utils/PermissionHandler";
import {useSelector} from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import {Box, Button, Divider, ListItem, ListItemIcon, Stack, TextField, Tooltip} from "@mui/material";
import {useLazyUserLogoutQuery} from "../../features/api/Users/UsersApi";
import {useNavigate} from "react-router-dom";

const useStyles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: '40px'
    },
    nestedSecondLevel: {
        paddingLeft: '60px'
    }
});

export default function Sidebar() {

    const [open, setOpen] = React.useState(true);
    const nav = useNavigate();
    const users = useSelector(state => state.users)
    const [logoutUser] = useLazyUserLogoutQuery();

    const logout = () => {
        logoutUser()
            .unwrap()
            .then((response) => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                nav('/login');
            })
            .catch(error => error);
    };

    return (
        <List
            component="nav"
            color="primary"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <ListItem sx={{padding:"0", marginTop:'15px',left:"-5px", position: "relative"}}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{flex:'1',width: "40px",}}>
                                <img style={{width: "40px",  borderRadius: '50%', position: "relative"}}
                                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    alt=""
                                />
                            </Box>
                            <Box sx={{flex:'1',marginLeft:'12px' }}>
                                {users?.Auth?.name} <Tooltip title="logout"><Button onClick={() => logout()}><LogoutIcon variant="contained"/></Button></Tooltip>
                            </Box>
                        </Box>
                </ListItem>
                <Divider></Divider>
                </ListSubheader>
            }
            className={useStyles.root}
        >
            <PermissionsGate permission={'view-category'}>
                <StoreMenu
                    useStyles={useStyles}
                    open={open}
                /></PermissionsGate>

            <PermissionsGate permission={'can-edit'}>
                <AccountMenu
                    useStyles={useStyles}
                    open={open}
                /></PermissionsGate>

        </List>
    );
}
  