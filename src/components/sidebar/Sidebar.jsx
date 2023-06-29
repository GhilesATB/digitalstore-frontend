import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { TreeItem } from '@mui/lab';
import { treeItemClasses } from '@mui/lab';
import { TreeView } from '@mui/lab';
import Typography from '@mui/material/Typography';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Tooltip } from '@mui/material/node';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField} from "@mui/material";
import { useSelector } from 'react-redux';
import { useLazyUserLogoutQuery } from '../../features/api/Users/UsersApi';
import './style.css';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
   /* borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),*/
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
      textIndent: '10px'
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={styleProps}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  bgColorForDarkMode: PropTypes.string,
  color: PropTypes.string,
  colorForDarkMode: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const Sidebar = () => {

    const nav = useNavigate();
    const users = useSelector(state => state.users)
    const [logoutUser] = useLazyUserLogoutQuery();

    const logout = () => {
        logoutUser()
            .unwrap()
            .then((response) => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                nav('/login');
            })
            .catch(error => error);
    };


  return (
<>
    <Box sx={{display: 'flex'}}>
        <Box sx={{flex:'1',width: "40px",}}>
            <img style={{width: "40px",  borderRadius: '50%', position: "relative"}}
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
            />
        </Box>
        <Box sx={{flex:'1',marginLeft:'12px' }}>
            {users?.Auth?.name} <Tooltip title="logout"><Button onClick={() => logout()}><LogoutIcon variant="contained"/></Button></Tooltip>
        </Box>
    </Box>
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
        <Link to='/admin/profile'>
            <StyledTreeItem nodeId="1" labelText="Profile" labelIcon={PersonIcon} />
        </Link>
      <StyledTreeItem nodeId="3" labelText="Store" labelIcon={ LocalMallOutlinedIcon}>
      <Link to='/admin/categories'>
        <StyledTreeItem
          nodeId="5"
          labelText="Categories"
          labelIcon={WidgetsOutlinedIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode="#071318"
          sx={{textDecoration:'none'}}
        />
        </Link>
        <StyledTreeItem
          nodeId="6"
          labelText="Products"
          labelIcon={FactCheckOutlinedIcon}
          color="#e3742f"
          bgColor="#fcefe3"
          colorForDarkMode="#FFE2B7"
          bgColorForDarkMode="#191207"
        />
      </StyledTreeItem>
    </TreeView>
    </>
  );
}


export default Sidebar;