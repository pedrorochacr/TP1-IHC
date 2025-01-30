import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  field: {
    width: "100%",
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      borderRadius: 20,
    },
  },
  submit: {
    width: "100%",
    padding: theme.spacing(1.5),
    borderRadius: 20,
    marginTop: theme.spacing(2),
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: theme.spacing(1),
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
      history.push("/bem-vindo");
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => history.push("/inicial")}
        >
          <ArrowBackIosIcon fontSize="small" />
          <Typography variant="body2">Voltar</Typography>
        </div>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Usuário"
            name="email"
            className={classes.field}
            placeholder="Opcional"
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            name="password"
            className={classes.field}
            placeholder="Opcional"
          />
          <div className={classes.forgotPassword}>
            <Typography
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/esqueci-minha-senha")}
            >
              Esqueci minha senha
            </Typography>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
          style={{ 
            maxWidth: 400, // Mesma largura máxima do container
            margin: 'auto', // Centraliza horizontalmente
            width: 'fit-content' // Ajusta à largura do conteúdo
          }}
        >
          Login realizado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;