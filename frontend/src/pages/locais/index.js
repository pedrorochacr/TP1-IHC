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
import { SearchOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import useAuth from "../../hooks/useAuth.js";
import { i18n } from "../../translate/i18n";
import logoTarget from "../../assets/logoLogin.png";
import { AuthContext } from "../../context/Auth/AuthContext.js";
import mapa from "../../assets/mapa.png"
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
        background: "#D9D9D9",
        color: "#000000",
        fontWeight: 700,
        padding: 10,
        margin: theme.spacing(1, 0, 2),
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




const Locais = () => {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, loading } = useContext(AuthContext);

    const handleChangeInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
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
                <CssBaseline />

                <Container component="div" maxWidth="xs" className={classes.mobileContainer}>
                    <div className={classes.paper}>
                        <Grid container direction="column" justifyContent="center">
                            <Typography variant="h4" color="primary" style={{ textAlign: "center", fontWeight: 700 }}>Locais de Descarte</Typography>
                            <Grid container direction="column" style={{ marginTop: 40 }}>
                                <Grid container direction="column" spacing={2} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                                    {/* Campo "Local" */}
                                    <Grid item style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <Typography style={{ marginRight: '10px', width: '50px', fontWeight: 600 }}>Local</Typography>
                                        <input
                                            type="text"
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                fontSize: '14px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                            }}
                                        />
                                        <IconButton>
                                        <SearchOutlined style={{ color: '#ffff', marginRight: '8px' }} />
                                        </IconButton>
                                         
                                    </Grid>

                                    {/* Campo "Tipo" */}
                                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography style={{ marginRight: '10px', width: '50px', fontWeight: 600 }}>Tipo</Typography>
                                        <select
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                fontSize: '14px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: '#fff',
                                            }}
                                        >
                                            <option value="" disabled selected>
                                                Selecione uma opção
                                            </option>
                                            <option value="opcao1">Resíduos tóxicos </option>
                                            <option value="opcao2">Plástico </option>
                                            <option value="opcao3">Papel</option>
                                            <option value="opcao3">Metal</option>
                                            <option value="opcao3">Vidro</option>
                                            <option value="opcao3">Eletrônicos</option>
                                        </select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid style={{marginTop: 20}}>
                                <img  src={mapa} style={{width:"100%"}}/>
                            </Grid>
                    </div>
                </Container>

            </Container>
        </div>
    );
};

export default Locais; 