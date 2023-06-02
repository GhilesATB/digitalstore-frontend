import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import UsersSubMenu from "./UsersSubMenu";

const AccountMenu = ({
    useStyles,
}) =>{

    const [openMenu, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!openMenu);
    };

    return (
        <>
            <ListItem onClick={handleClick}>
                <ListItemIcon>
                    <PeopleOutlinedIcon sx={{marginLeft: '5px'}} color="primary"/>
                </ListItemIcon>
                <ListItemText primary="Accounts"/>
                {openMenu ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>

        <UsersSubMenu
                useStyles = {useStyles}
                open = {openMenu}
        />
      </>
    );

}

export default AccountMenu;