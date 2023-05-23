import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';


export default function Drawer(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
                <React.Fragment key="right">
                    <SwipeableDrawer
                        anchor="right"
                        open={props.open}
                        onClose={props.onClose}
                        onOpen={props.onClose}
                    >
                        {props.children}
                    </SwipeableDrawer>
                </React.Fragment>
        </div>
    );
}