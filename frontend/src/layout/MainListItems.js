import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Button,
  makeStyles,

} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ForumIcon from '@material-ui/icons/Forum';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VisaoGeral from "@material-ui/icons/Equalizer";
import AtendimentosIcon from "@material-ui/icons/ChatBubbleOutline"
import RespostasRapidasIcon from '@material-ui/icons/Speed';
import Divider from "@material-ui/core/Divider";
import ContatosIcon from '@material-ui/icons/PermContactCalendar';
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { AuthContext } from "../context/Auth/AuthContext";
import { Can } from "../components/Can";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { red } from "@material-ui/core/colors";
import useAuth from "../hooks/useAuth.js";

const useStyles = makeStyles((theme) => ({

  listItem: {

    color: theme.mode === 'light' ? "#090a09" : '',

  },
  listItemLogout: {

    color: theme.mode === 'light' ? red[500] : '',

  },
  listItemButtonLogout: {
    '&:hover': {
      backgroundColor: red[500], // Escolha a cor de fundo desejada para o hover
      borderRadius: '10px',
    },
    '&:hover $listItemLogout': {
      color: "#ffff",
      backgroundColor: red[500], // Altere para a cor desejada
    },
    '&:hover $listText': {
      color: "#ffff",
      backgroundColor: red[500], // Altere para a cor desejada
    },
    '$listItemLogout': {
      color: "#ffff !important",
      background: red[500],

    },
    transition: 'none',
  },
  campaignItem: {
    color: theme.mode === 'light' ? '#ffff' : '',
  },
  drawerClosed: {
    '&:hover $listItem': {
      backgroundColor: 'transparent !important',
    },
    padding: 20,
    height: 50
  },
  drawerClosedLogout: {
    '&:hover $listItemLogout': {
      backgroundColor: 'transparent !important',
    },
    height: 50
  },
  listItemButton: {
    '& $listText': {
      color: theme.palette.background,
    },
    '& $listItem': {
      color: theme.palette.background,
    },

    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main, // Escolha a cor de fundo desejada para o hover
      borderRadius: '5px',
    },
    '&:hover $listItem': {
      color: "#ffff",
      backgroundColor: theme.palette.primary.main, // Altere para a cor desejada
    },
    '&:hover $listText': {
      color: "#ffff",
      backgroundColor: theme.palette.primary.main, // Altere para a cor desejada
    },
    '$listItem': {
      color: theme.palette.background,
      background: theme.palette.primary.main,

    },
    transition: 'none',

  },
  selectedListItem: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    '& $listText': {
      color: "#ffff"
    },
    '& $listItem': {
      color: "#ffff",
    },
  },
  listText: {
    color: "#090a09",
    "& span":
    {
      fontWeight: 500,

    }
  }
}));

function LogoutButton(props) {
  const { icon, primary, onClick, drawerOpen } = props;
  const classes = useStyles();


  return (
    <li >
      <ListItem button onClick={onClick} className={
        `${classes.listItemButtonLogout} ${!drawerOpen ? classes.drawerClosedLogout : ''}`
      }

      >
        {icon ? <ListItemIcon color="danger" className={classes.listItemLogout}>{icon}</ListItemIcon> : null}
        {drawerOpen && <ListItemText className={classes.listText} primary={primary} />}
      </ListItem>
    </li>
  );
}


function ListItemLink(props) {
  const { icon, primary, to, selected, onClick, drawerOpen } = props;
  const classes = useStyles();
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );
  return (
    <li >
      <ListItem button selected={selected} onClick={onClick} component={renderLink} className={
        `${classes.listItemButton} ${selected ? classes.selectedListItem : ''} ${!drawerOpen ? classes.drawerClosed : ''}`
      }

      >
        {icon ? <ListItemIcon className={classes.listItem}>{icon}</ListItemIcon> : null}
        {drawerOpen && <ListItemText className={classes.listText} primary={primary} />}
      </ListItem>
    </li>
  );
}


const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose, drawerOpen } = props;

  // const user = {
  //   id:1,
  // }
  const { user, isAuth } = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('selectedIndex');
    return savedIndex !== null ? JSON.parse(savedIndex) : null;
  });



  useEffect(() => {
    if (selectedIndex !== null) {
      sessionStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
    }
  }, [selectedIndex]);





  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const dashboardUrl = `/`
  return (
    <div onClick={drawerClose} style={{ display: 'flex', gap: 4, flexDirection: "column" }} >
      <Can
        role={user.profile}
        perform="dashboard:view"
        yes={() => (
          <ListItemLink
            to={dashboardUrl}
            drawerOpen={drawerOpen}
            primary="Visão Geral"
            icon={<VisaoGeral />}
            selected={selectedIndex === 0}
            onClick={() => handleListItemClick(0)}

          />
        )}
      />
      {user.isBroker && (
                <ListItemLink
                to={`/broker`}
                primary={"BROKER"}
                drawerOpen={drawerOpen}
                icon={<AtendimentosIcon />}
                selected={selectedIndex === 1}
                onClick={() => handleListItemClick(1)}
              />
      )}

      {user.isStaking && (

        <ListItemLink
          to={`/staking`}
          primary={"STAKING"}
          drawerOpen={drawerOpen}
          icon={<RespostasRapidasIcon />}
          selected={selectedIndex === 2}
          onClick={() => handleListItemClick(2)}

        />
      )}


      <ListItemLink
        to={`/cadastro`}
        drawerOpen={drawerOpen}
        primary={"CADASTRO"}
        icon={<ContatosIcon />}
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3)}
      />


      <ListItemLink
        to={`/configuracoes`}
        drawerOpen={drawerOpen}
        primary={"CONFIGURAÇÕES"}
        icon={<SettingsOutlinedIcon />}
        selected={selectedIndex === 5}
        onClick={() => handleListItemClick(5)}
      />


      {/* <Can
        role={user.profile}
        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <>

              <ListItem
                button
                onClick={() => {
                  setOpenCampaignSubmenu((prev) => !prev)

                }}
                className={classes.listItemButton}
              >
                <ListItemIcon className={classes.listItem}>
                  <CampanhasIcon />
                </ListItemIcon>
                <ListItemText
                  primary={i18n.t("mainDrawer.listItems.campaigns")}
                  className={classes.listText}
                />
                {openCampaignSubmenu ? (
                  <ListItemIcon className={classes.listItem}>
                    <ExpandLessIcon />
                  </ListItemIcon>

                ) : (
                  <ListItemIcon className={classes.listItem}>
                    <ExpandMoreIcon />
                  </ListItemIcon>

                )}
              </ListItem>
              <Collapse
                style={{ paddingLeft: 15 }}
                in={openCampaignSubmenu}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem onClick={() => {
                    history.push(`/campaigns`)
                    handleListItemClick(7)
                  }} selected={selectedIndex === 7} className={selectedIndex === 7 ? `${classes.listItemButton} ${classes.selectedListItem}` : classes.listItemButton} button>
                    <ListItemIcon className={classes.listItem} >
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.listText} primary="Listagem" />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      history.push(`/contact-lists`)
                      handleListItemClick(8)
                    }}
                    selected={selectedIndex === 8} className={selectedIndex === 8 ? `${classes.listItemButton} ${classes.selectedListItem}` : classes.listItemButton} button
                  >
                    <ListItemIcon className={classes.listItem}>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.listText} primary="Listas de Contatos" />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      handleListItemClick(9)
                      history.push(`/campaigns-config`)
                    }}
                    selected={selectedIndex === 9} className={selectedIndex === 9 ? `${classes.listItemButton} ${classes.selectedListItem}` : classes.listItemButton} button

                  >
                    <ListItemIcon className={classes.listItem}>
                      <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.listText} primary="Configurações" />
                  </ListItem>
                </List>
              </Collapse>
            </>
  
                        <ListItemLink
              to={`/kanban`}
              primary={"Funil de Vendas"}
              icon={<ForumIcon />}
              drawerOpen={drawerOpen}
              selected={selectedIndex === 16}
              onClick={() => handleListItemClick(16)}
            />
            <ListItemLink
              to={`/connections`}
              primary={i18n.t("mainDrawer.listItems.connections")}
              drawerOpen={drawerOpen}
              icon={
                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                  <ContactlessOutlinedIcon />
                </Badge>
              }
              selected={selectedIndex === 10}
              onClick={() => handleListItemClick(10)}
            />
            <ListItemLink
              to={`/queues`}
              drawerOpen={drawerOpen}
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<WrapTextOutlinedIcon />}
              selected={selectedIndex === 11}
              onClick={() => handleListItemClick(11)}
            />
            {user.profile === "admin" && (

              <ListItemLink
                to={`/users`}
                drawerOpen={drawerOpen}
                primary={i18n.t("mainDrawer.listItems.users")}
                icon={<PeopleAltOutlinedIcon />}
                selected={selectedIndex === 12}
                onClick={() => handleListItemClick(12)}
              />
            )
            }

            <ListItemLinkExternal
              to="http://academy.clickspeak.com.br"
              primary={i18n.t("mainDrawer.listItems.academy")}
              icon={<AcademyIcon />}
            />
            {user.profile === "admin" && (


              <ListItemLink
                to={`/settings`}
                primary={i18n.t("mainDrawer.listItems.settings")}
                icon={<SettingsOutlinedIcon />}
                selected={selectedIndex === 13}
                drawerOpen={drawerOpen}
                onClick={() => handleListItemClick(13)}
              />
            )
            }


          </>
        )}
      /> */}
    </div>
  );
};

export default MainListItems;
