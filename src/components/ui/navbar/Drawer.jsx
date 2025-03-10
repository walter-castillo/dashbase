import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';


const drawerWidth = 240;

export  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0)
        // [theme.breakpoints.up('sm')]: {
        //   width: theme.spacing(),
        // },
      }),
    },
  }),
);