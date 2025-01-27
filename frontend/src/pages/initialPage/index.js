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
        background: theme.palette.fieldBackground,
        borderRadius: 109,
        height: 30,
        border: 'none'

    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",

        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        borderColor: "#ffffff",

        //backgroundColor: `rgba(${theme.palette.background.paper}, 0.8)`,


    },
    submit: {
        padding: 10,
        borderRadius: 109,
        margin: theme.spacing(0, 0, 2),
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

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




const InitialPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const { handleLogin, loading } = useContext(AuthContext);



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


                <CssBaseline />
                <div className={classes.containerWrapper}>
                    <Container component="div" maxWidth="xs" className={classes.mobileContainer}>
                        <div className={classes.paper}>

                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                style={{ textAlign: 'center', marginBottom:60 }} // Centraliza verticalmente e ajusta o texto
                            >
                                {/* Título menor */}
                                <Typography variant="h4" style={{ marginBottom: 30 }}>
                                    LixoSmart
                                </Typography>

                                {/* Texto com largura máxima */}
                                <Typography
                                    variant="subtitle1"
                                    style={{
                                        fontSize:15, // Limita a largura do texto a 80% da tela
                                        
                                    }}
                                >
                                    "Transformando o descarte de resíduos em ações inteligentes para um planeta mais limpo"
                                </Typography>
                            </Grid>

                            <Button
                              
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=>history.push('/login')}
                            >
                                {loading ?
                                    (
                                        <CircularProgress color="secondary" size={20} />
                                    ) :
                                    ('Login')
                                }

                            </Button>
                            <Button
                              
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=>history.push('/cadastro')}
                                
                            >
                                Cadastro

                            </Button>
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
    );
};

export default InitialPage; 