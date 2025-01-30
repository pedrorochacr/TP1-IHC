import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, AppBar, Toolbar, IconButton } from "@material-ui/core";
import clsx from "clsx";
import { AuthContext } from "../context/Auth/AuthContext";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeOutlined from "@material-ui/icons/DateRangeOutlined";
import EqualizerOutlined from "@material-ui/icons/EqualizerOutlined";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  bottomAppBar: {
    top: "auto",
    bottom: 0,
  },
  bottomToolbar: {
    display: "flex",
    justifyContent: "space-around",
  },
  alignProfileIcon: {
    justifyContent: "flex-end",
  },
  activeIcon: {
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(1),
    borderRadius: '50%',
    transform: 'scale(1.01)',
    transition: 'all 1.5s ease',
    '&:hover': {
      transform: 'scale(1.01)'
    }
  },
  defaultIcon: {
    color: theme.palette.common.white,
    transition: 'all 0.2s ease',
  }
}));

const LoggedInLayout = ({ children }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
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
        <Toolbar 
          variant="regular" 
          className={clsx(classes.toolbar, drawerOpen && classes.alignProfileIcon)}
        >
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children ? children : null}
      </main>

      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolbar}>
          <IconButton
            className={location.pathname === "/bem-vindo" ? classes.activeIcon : classes.defaultIcon}
            onClick={() => history.push("/bem-vindo")}
          >
            <HomeIcon fontSize={location.pathname === "/bem-vindo" ? "large" : "medium"} />
          </IconButton>
          <IconButton
            className={location.pathname === "/locais" ? classes.activeIcon : classes.defaultIcon}
            onClick={() => history.push("/locais")}
          >
            <LocationOnIcon fontSize={location.pathname === "/locais" ? "large" : "medium"} />
          </IconButton>
          <IconButton
            className={location.pathname === "/eventos" ? classes.activeIcon : classes.defaultIcon}
            onClick={() => history.push("/eventos")}
          >
            <DateRangeOutlined fontSize={location.pathname === "/eventos" ? "large" : "medium"} />
          </IconButton>
          <IconButton
            className={location.pathname === "/estatistica" ? classes.activeIcon : classes.defaultIcon}
            onClick={() => history.push("/estatistica")}
          >
            <EqualizerOutlined fontSize={location.pathname === "/estatistica" ? "large" : "medium"} />
          </IconButton>
          <IconButton
            className={location.pathname === "/perfil" ? classes.activeIcon : classes.defaultIcon}
            onClick={() => history.push("/perfil")}
          >
            <PersonIcon fontSize={location.pathname === "/perfil" ? "large" : "medium"} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LoggedInLayout;