import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {ListItemButton} from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

const UsersSubMenu = ({
    open,
    setOpen,
}) =>{
  
    return (
    <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
            <ListItemButton>
                <ListItem  sx={{paddingLeft: "50px"}}>
                <ListItemIcon>
                    <PermIdentityOutlinedIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItem>
            </ListItemButton>

            <ListItemButton>
                <ListItem  sx={{paddingLeft: "50px"}}>
                <ListItemIcon>
                    <EngineeringOutlinedIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary="Role" />
                </ListItem>
            </ListItemButton>

            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <LocalPoliceOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Permissions" />
            </ListItem>
            </ListItemButton>
    </List>
</Collapse>);

}

export default UsersSubMenu;