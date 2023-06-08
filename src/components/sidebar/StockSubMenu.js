import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {ListItemButton} from "@mui/material";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';

const StockSubMenu = ({
    useStyles,
    open,
    setOpen,
}) =>{

    const [openMenu, setMenuOpen] = React.useState(false);
    const [openSecondLevel, setOpenSecondLevel] = React.useState(false);

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
            <WarehouseOutlinedIcon color="primary"/>
        </ListItemIcon>
        <ListItemText primary="Inventory" />
        {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        </ListItemButton>

        <Collapse in={openSecondLevel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <LocalShippingOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Delivery in" />
            </ListItem>
            </ListItemButton>

            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <ShoppingCartCheckoutOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Disrupted" />
            </ListItem>
            </ListItemButton>

            <ListItemButton>
            <ListItem  sx={{paddingLeft: "50px"}}>
            <ListItemIcon>
                <ProductionQuantityLimitsOutlinedIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Product return" />
            </ListItem>
            </ListItemButton>

        </List>
        </Collapse>
    </List>
</Collapse>);

}

export default StockSubMenu;