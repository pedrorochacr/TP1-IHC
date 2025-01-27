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
} from '@material-ui/core';


import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import useAuth from "../../hooks/useAuth.js";
import { i18n } from "../../translate/i18n"; 
import logoTarget from "../../assets/logoLogin.png"; 
import { AuthContext } from "../../context/Auth/AuthContext.js";
import BackdropLoading from "../../components/BackdropLoading/index.js";
import MainHeader from "../../components/MainHeader/index.js";
import Title from "../../components/Title/index.js";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper/index.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";



const useStyles = makeStyles((theme) => ({

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  whatsapp: {
    backgroundColor: '#32d951'
  },
  field: {
    background:theme.palette.fieldBackground,
    borderRadius:109,
    height: 30,
    border:'none'
   
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
 
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    borderColor: "#ffffff",
 
    //backgroundColor: `rgba(${theme.palette.background.paper}, 0.8)`,


  },
  submit: {
    padding: 10,
    borderRadius:109,
    margin: theme.spacing(3, 0, 2),
  },
  containerWrapper: {
    display: "flex",

    justifyContent: "space-between",
    gap: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  root: {
    background: theme.palette.background,
  },
  mobileContainer: {
    flex: 1,
   

  },
  hideOnMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));




const Registration = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, loading } = useContext(AuthContext);

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
  
     handleLogin(user);
  };

  return (
    //<div style={{ display: 'flex', 
    //flexDirection: 'column', 
    //minHeight: '100vh', 
    // backgroundImage: `url(${loginBackground})`,
    //backgroundSize: 'cover',
    //backgroundRepeat: 'no-repeat',
    //backgroundPosition: 'center'
    //}}>
    <div className={classes.root}>
      <Container component="main" maxWidth="md">
      <MainHeader>
        <Title>
            <IconButton style={{color:"#ffff"}} onClick={()=>history.push('/inicial')}>
                <ArrowBackIosIcon />
            </IconButton>
        </Title>
        
      </MainHeader>
        <CssBaseline />
        <div className={classes.containerWrapper}>
          <Container component="div" maxWidth="xs" className={classes.mobileContainer}>
            <div className={classes.paper}>
              
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container direction="column" justifyContent="flex-start" alignContent="start" style={{marginBottom: 15}}>
                    <Typography>Usuário/Organização</Typography>
                    <input
                        className={classes.field}
                        type="text"
                    />
                
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignContent="start" style={{marginBottom: 15}}>
                    <Typography>CPF/CNPJ</Typography>
                    <input
                        className={classes.field}
                        type="text"
                    />
                
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignContent="start" style={{marginBottom: 15}}>
                    <Typography>E-mail</Typography>
                    <input
                        className={classes.field}
                        type="text"
                    />
                
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignContent="start" style={{marginBottom: 15}}>
                    <Typography>Senha</Typography>
                    <input
                        className={classes.field}
                        type="text"
                    />
                
                </Grid>
                <Grid container direction="column">
                    <Typography>Confirme a senha</Typography>
                    <input
                        className={classes.field}
                        type="password"
                    />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {loading ?
                    (
                     <CircularProgress color="secondary" size={20} />
                    ):
                    ('Cadastrar')
                }
                  
                </Button>

              </form>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Registration; 