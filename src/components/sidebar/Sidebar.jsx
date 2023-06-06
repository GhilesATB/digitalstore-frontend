import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import StoreMenu from "./StoreMenu";
import AccountMenu from "./AccountMenu";
import PermissionsGate from "../../utils/PermissionHandler";

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

    return (
        <List
            component="nav"
            color="primary"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                </ListSubheader>
            }
            className={useStyles.root}
        >
        <PermissionsGate permission={'can-view'}>
            <StoreMenu
                useStyles={useStyles}
                open={open}
            /></PermissionsGate>

<PermissionsGate permission={['can-edit']}>
            <AccountMenu
                useStyles={useStyles}
                open={open}
            /></PermissionsGate>

        </List>
    );
}
  