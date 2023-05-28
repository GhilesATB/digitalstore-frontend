import * as React from 'react';
import Drawer from '@mui/material/Drawer';

export default function CategoryDrawer(props) {
  return (
    props.open ? <div>
      {
        <React.Fragment key={'right'}>
          <Drawer
            anchor={'right'}
            open={props.open}
            onClose={props.close}
          >
            {props.children}
          </Drawer>
        </React.Fragment>
      }
    </div>
    : ""
  );
}