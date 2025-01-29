import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { AuthContext } from "../../context/Auth/AuthContext.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Centraliza verticalmente
    backgroundColor: theme.palette.background.default,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
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
  const [user, setUser] = useState({ email: "", password: "" });
  const { handleLogin, loading } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Usuário"
            name="email"
            onChange={handleChangeInput}
            className={classes.field}
            required
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            name="password"
            onChange={handleChangeInput}
            className={classes.field}
            required
          />
          <div className={classes.forgotPassword}>
            <Link onClick={() => history.push("/esqueci-minha-senha")}>
              Esqueci minha senha
            </Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
