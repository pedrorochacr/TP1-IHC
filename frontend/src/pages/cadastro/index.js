import React, { useState, useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { AuthContext } from "../../context/Auth/AuthContext.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxWidth: 400,
    width: "100%",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(3),
    backgroundColor: "#6A0DAD",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#5A0D90",
    },
  },
  backButton: {
    position: "absolute",
    left: theme.spacing(2),
    top: theme.spacing(2),
    color: "#6A0DAD",
  },
}));

const Registration = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    cpfCnpj: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simula o processamento do cadastro
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: "Cadastro realizado com sucesso!",
        severity: "success",
      });

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }, 1500);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton className={classes.backButton} onClick={() => history.push("/inicial")}>
        <ArrowBackIosIcon />
      </IconButton>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Criar Conta
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Usuário/Organização"
              name="name"
              value={user.name}
              onChange={handleChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="CPF/CNPJ"
              name="cpfCnpj"
              value={user.cpfCnpj}
              onChange={handleChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="E-mail"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Senha"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChangeInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirme a senha"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChangeInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Cadastrar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
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

export default Registration;