import * as React from 'react';
import Drawer from '@mui/material/Drawer';

export const CategoryDrawer = (props) => {
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

export default CategoryDrawer;