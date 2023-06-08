import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


export default function Drawer(props) {
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