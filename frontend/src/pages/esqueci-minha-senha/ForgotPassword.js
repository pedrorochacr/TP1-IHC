import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    backgroundColor: "#fff", // Fundo branco
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Contraste adicional
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
  backButton: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
      history.push("/login"); // Redireciona para a página de login
    }, 3000); // Tempo para exibir o Snackbar antes do redirecionamento
    setInput(""); // Limpa o campo
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div
          className={classes.backButton}
          onClick={() => history.push("/login")}
        >
          <ArrowBackIosIcon fontSize="small" />
          <Typography variant="body2">Voltar</Typography>
        </div>
        <Typography variant="h5" align="center" gutterBottom>
          Esqueci minha senha
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Insira seu e-mail ou CPF para recuperar sua senha.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="E-mail ou CPF"
            value={input}
            onChange={handleInputChange}
            className={classes.field}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Recuperar senha
          </Button>
        </form>
      </div>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={2000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <div
    style={{
      padding: "16px",
      background: "#4caf50",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "bold",
    }}
  >
    Instruções para recuperação de senha enviadas!
  </div>
</Snackbar>

    </div>
  );
};

export default ForgotPassword;
