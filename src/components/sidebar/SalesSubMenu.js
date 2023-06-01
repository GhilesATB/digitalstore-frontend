import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import {PeopleSharp} from "@mui/icons-material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {ListItemButton} from "@mui/material";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const SalesSubMenu = ({
    useStyles,
    open,
    setOpen,

}) =>{

    const [openMenu, setOpenMenu] = React.useState(open);
    const [openSecondLevel, setOpenSecondLevel] = React.useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
  
    const handleClickSecondLevel = () => {
      setOpenSecondLevel(!openSecondLevel);
    };

    return (
    <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
    <ListItemButton>
        <ListItem
        sx={{paddingLeft: "25px"}}
        
        onClick={handleClickSecondLevel}
        >
        <ListItemIcon>
            <ShoppingCartOutlinedIcon color="primary"/>
        </ListItemIcon>
        <ListItemText primary="Sales" />
        {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        </ListItemButton>

        <Collapse in={openSecondLevel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <PeopleSharp color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Clients" />
            </ListItem>
            </ListItemButton>
            
            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <ShoppingCartCheckoutOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Orders" />
            </ListItem>
            </ListItemButton>

            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <RequestQuoteOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Invoice" />
            </ListItem>
            </ListItemButton>

        </List>
        </Collapse>
    </List>
</Collapse>);

}

export default SalesSubMenu;