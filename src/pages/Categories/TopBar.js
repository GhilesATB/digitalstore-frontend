import {Box, Button, Divider} from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox";
import PermissionsGate from "../../utils/PermissionHandler";

const TopBar = (props) =>{
    return (
    
        <div style={{height: "50px", padding: "15px 0"}}>
            <Box sx={{display:"flex"}}>
                <Box sx={{flex: "1"}}>
                    <Box sx={{margin: "8px 6px", 'text-transform': 'uppercase'}}>
                        Category List
                    </Box>
                </Box>
                {props.children}
            </Box>
            <Divider></Divider>
        </div>
    
    );
}

export default TopBar;