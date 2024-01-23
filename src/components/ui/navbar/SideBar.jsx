import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {Drawer} from './Drawer'
// import MenuItem, { mainListItems, secondaryListItems } from '../../../config/MenuItem';
import MenuItem from './MenuItem';



export const SideBar = ({ toggleDrawer, open}) => {

  return (

    <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">


            <MenuItem />


            {/* {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
    </Drawer>
  )
}
