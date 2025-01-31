import React from "react";
import {
  Typography,
  Grid,
  Container,
  CssBaseline,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, PersonAdd } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import logo from "./../../assets/logo1.png"; // Importando a imagem da logo

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing(4),
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1),
  },
  logo: {
    height: "40px", // Altura da logo
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  button: {
    width: "100%",
    padding: theme.spacing(1.5),
    fontWeight: "bold",
    borderRadius: "30px",
    marginTop: theme.spacing(2),
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const InitialPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.titleContainer}>
            <img src={logo} alt="LixoSmart Logo" className={classes.logo} />
            <Typography variant="h4" className={classes.title}>
              LixoSmart
            </Typography>
          </div>
          <Typography variant="subtitle1" className={classes.subtitle}>
            "Transformando o descarte de resíduos em ações inteligentes para um
            planeta mais limpo"
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/login")}
          >
            <Person />
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/cadastro")}
          >
            <PersonAdd />
            Cadastro
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default InitialPage;
