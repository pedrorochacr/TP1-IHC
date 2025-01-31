import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  MenuItem,
  Menu,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { AuthContext } from "../context/Auth/AuthContext";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeOutlined from "@material-ui/icons/DateRangeOutlined";
import EqualizerOutlined from "@material-ui/icons/EqualizerOutlined";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../assets/logo.png";

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
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 24,
    color: "white",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
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
    borderRadius: "50%",
    transform: "scale(1.01)",
    transition: "all 1.5s ease",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  defaultIcon: {
    color: theme.palette.common.white,
    transition: "all 0.2s ease",
  },
}));

const LoggedInLayout = ({ children }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (document.body.offsetWidth > 600) {
      setDrawerOpen(true);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setNotification({
      open: true,
      message: "Logout realizado com sucesso!",
      severity: "success",
    });

    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

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
          {/* Logo na barra superior */}
          <img
            src={logo}
            alt="Logo"
            className={classes.logo}
            onClick={() => history.push("/bem-vindo")}
          />

          <div>
            <Grid container alignItems="center">
              <Typography style={{ fontWeight: 600, fontSize: 20 }}>Olá, Glivia</Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                variant="contained"
                style={{ color: "white" }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Grid>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={menuOpen}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => history.push("/perfil")}
                style={{ backgroundColor: "white" }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                style={{ backgroundColor: "white" }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
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

      {/* Notificação de Logout */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoggedInLayout;
