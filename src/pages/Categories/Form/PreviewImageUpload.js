import {CloseOutlined} from "@mui/icons-material";
import {Box, Fab, Typography} from "@mui/material";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import * as React from "react";

const PreviewImageUpload = ({image,
    changeHandler,
    selectedFile,
    isFilePicked,
    cancelFile
}) =>{
    return (
        <Box sx={{display: 'flex'}}>
                <div>
                    <img style={{width: "320px", height: "240px", position: "relative", margin: "auto"}}
                         src={
                            !isFilePicked
                                 ? (image ? image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
                                 : URL.createObjectURL(selectedFile)
                         }
                         alt=""
                    />
                    <div>
                        <Fab color="primary" aria-label="upload"
                             style={{position: "relative", marginLeft: "-16px", top: '-32px',padding:0}}>
                                    <label htmlFor="image">
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={changeHandler}
                                            style={{display: "none"}}
                                            /*accept=".jpg,.gif,.png,.jpeg,.svg,.webp"*/
                                        ></input>
                                        <BackupRoundedIcon fontSize={"large"}
                                                           style={{position: "relative", margin: "auto"}}
                                                           className="icon"/>
                                    </label>
                              
                        </Fab>
                        <Box sx={{display: "flex", position:"relative", marginBottom: "10px"}}> <>
                    <Typography sx={{position: "relative"}}>
                        Image :  
                        {selectedFile?.name}
                        
                    </Typography>
                    { selectedFile?.name ? 
                            <CloseOutlined 
                            color="error" 
                            fontSize={"medium"} 
                            style={{position: "relative", margin: "auto"}} 
                            className="icon" 
                            onClick={cancelFile}/> : image?.split('/').slice(-1)
                        }
                
                </>
                </Box>
                    </div>
                    
                </div>

            </Box>
    );
}

export default PreviewImageUpload;