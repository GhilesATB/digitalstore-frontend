import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import {ListItemButton} from "@mui/material";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import {Link} from "react-router-dom";

const ProductSubMenu = ({
    open,
}) =>{

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
            <LocalMallOutlinedIcon color="primary"/>
        </ListItemIcon>
        <ListItemText primary="Products" />
        {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        </ListItemButton>

        <Collapse in={openSecondLevel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <Link to='/admin/categories'>
                <ListItemButton>
                    <ListItem sx={{paddingLeft: "50px"}}>
                        <ListItemIcon>
                            <WidgetsOutlinedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Categories"/>
                    </ListItem>
                </ListItemButton>
            </Link>
            <ListItemButton>
                <ListItem sx={{paddingLeft: "50px"}}>
                    <ListItemIcon>
                        <FactCheckOutlinedIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary="Products"/>
                </ListItem>
            </ListItemButton>

        </List>
        </Collapse>
    </List>
</Collapse>);

}

export default ProductSubMenu;