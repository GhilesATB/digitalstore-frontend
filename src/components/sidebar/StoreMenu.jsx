import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ProductSubMenu from "./ProductSubMenu";
import SalesSubMenu from "./SalesSubMenu";
import StockSubMenu from "./StockSubMenu";

const StoreMenu = ({
    useStyles,
}) =>{

    const [openMenu, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!openMenu);
    };

    return (
      <>
      <ListItem  onClick={handleClick}>
          <ListItemIcon>
            <StorefrontIcon sx={{marginLeft:'5px'}} color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Store" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <ProductSubMenu
                useStyles = {useStyles}
                open = {openMenu}
        />
        <SalesSubMenu
                useStyles = {useStyles}
                open = {openMenu}

        />
        <StockSubMenu
                useStyles = {useStyles}
                open = {openMenu}

        />
      </>
    );

}

export default StoreMenu;