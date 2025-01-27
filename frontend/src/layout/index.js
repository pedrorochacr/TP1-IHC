import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";

import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,

  MenuItem,
  IconButton,

} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';

import { AuthContext } from "../context/Auth/AuthContext";


import logo from "../assets/logoLogin.png"; 

// DARK THEMA
import HomeIcon from '@material-ui/icons/Home';
import ColorModeContext from "../layout/themeContext";

import UserModal from "../components/UserModal";
import { AddIcCallOutlined, DateRange, DateRangeOutlined, EqualizerOutlined, MoreHorizOutlined, SearchOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 56px)",
    },
    backgroundColor: theme.palette.fancyBackground,
    '& .MuiButton-outlinedPrimary': {
      color: theme.mode === 'light' ? '#369eff' : '#FFF',
      border: theme.mode === 'light' ? '1px solid rgba(0 124 102)' : '1px solid rgba(255, 255, 255, 0.5)',
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: theme.mode === 'light' ? theme.palette.primary.main : '#FFF',
    }
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    color: "white",
    background:theme.palette.primary.main,
    display: "flex",
    justifyContent: "end",

  },  
  bottomToolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      color: "white",
      background:theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
  
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minHeight: "48px",
    background: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      height: "48px"
    }
  },
  appBar: {
   
   
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    justifyContent: "end",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menu: {
    backgroundColor: "#fff", // Cor branca
    '& .MuiMenuItem-root': {
      color: theme.palette.text.primary, // Adaptação para contraste
    },
  },
  menuButton: {
    marginRight: 36,
    color: "white"
  },
  menuButtonHidden: {
    display: "none",
  },
  divider: {
    background: theme.mode === 'light' ? theme.palette.primary : '',
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    border:"none",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },


  content: {
    flex: 1,
    background:theme.palette.secondary.main,
    overflow: "auto",
    ...theme.scrollbarStyles,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  }, 
  bottomAppBar: {
    top: 'auto',
    display:'flex',
    justifyContent:'center',
    bottom: 0,
  },
  containerWithScroll: {
    flex: 1,
    paddingTop:25,
    padding:"2px",
    background: theme.palette.secondary.main,
    color: theme.mode === 'light' ? '#ffff' : '',

    scrollbarWidth: 'none', /* Firefox */
    '-ms-overflow-style': 'none', /* IE and Edge */
    '&::-webkit-scrollbar': {
      display: 'none', /* Chrome, Safari, Opera */
    },
    ...theme.scrollbarStyles,
  },
  alignProfileIcon: {
    justifyContent: "end"
  },
  profilePhoto: {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.5)', // Aumenta 20% ao passar o mouse
    },
  },
}));

const LoggedInLayout = ({ children }) => {
  const classes = useStyles();
  const {user} = useContext(AuthContext);
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
 



  useEffect(() => {
    if (document.body.offsetWidth > 600) {
      setDrawerOpen(true);
    }
  }, []);








  return (
   
    <div className={classes.root}>

      <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
        color="primary"
      >
        <Toolbar variant="regular" className={clsx(
          classes.toolbar,
          drawerOpen && classes.alignProfileIcon
        )}>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
         <div className={classes.appBarSpacer} /> 

        {children ? children : null}
      </main>
      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolbar}>
          <IconButton  color="inherit" aria-label="open drawer" onClick={()=>history.push("/bem-vindo")}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" onClick={()=>history.push('/locais')}>
            <LocationOnIcon />
          </IconButton>
          <IconButton color="inherit" onClick={()=>history.push('/eventos')}>
            <DateRangeOutlined   />
          </IconButton> 
          <IconButton  color="inherit"  onClick={()=>history.push('/estatistica')}>
            <EqualizerOutlined />
          </IconButton>
          <IconButton  color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
       
      </AppBar>
    </div>
  );
};

export default LoggedInLayout;
