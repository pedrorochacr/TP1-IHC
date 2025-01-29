import React from "react";
import {
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import ReportIcon from "@material-ui/icons/Report";
import EventIcon from "@material-ui/icons/Event";
import BarChartIcon from "@material-ui/icons/BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  header: {
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: "#fff",
    borderRadius: "0 0 20px 20px",
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: 400,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h4">Bem Vindo(a)!</Typography>
      </header>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ReportIcon className={classes.icon} />}
          onClick={() => history.push("/denuncias")}
        >
          Fazer Denúncia
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EventIcon className={classes.icon} />}
          onClick={() => history.push("/eventos")}
        >
          Eventos
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<BarChartIcon className={classes.icon} />}
          onClick={() => history.push("/estatistica")}
        >
          Estatísticas
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
