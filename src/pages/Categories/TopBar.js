import {Box, Button, Divider} from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox";
import PermissionsGate from "../../utils/PermissionHandler";
import { Grid } from "@mui/material/node";

const TopBar = (props) =>{
    return (
    
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
            <Box sx={{flex: "1"}}>
                <Box sx={{margin: "8px 6px", 'text-transform': 'uppercase'}}>
                    {props.title}
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12} md={6}>
            <Box sx={{flex: "1"}}>
                <Box sx={{margin: "8px 6px", float:'right',position:'relative'}}>
                    {props.children}
                </Box>
            </Box>
        </Grid>
      </Grid>
    </Box>
    <Divider></Divider>
    </>  
    );
}

export default TopBar;