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
    CircularProgress,
    Card,
    CardMedia,
    CardContent
} from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from "@material-ui/core/styles";
import { SearchOutlined, ShareOutlined, StarTwoTone, Visibility, VisibilityOff } from "@material-ui/icons";
import useAuth from "../../hooks/useAuth.js";
import { i18n } from "../../translate/i18n";
import logoTarget from "../../assets/logoLogin.png";
import { AuthContext } from "../../context/Auth/AuthContext.js";
import mapa from "../../assets/mapa.png"
import evento1 from "../../assets/evento1.png"
import evento2 from "../../assets/evento2.png"
import evento3 from "../../assets/evento3.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

const data = [
    {
        title: "Limpeza do Mar",
        image: evento1,
        ong: "Projeto Mar Sem Lixo",
        local: "Praia do Porto da Barra, Salvador",
        date: "05/02/2025",
        time: "09:00 - 11:00",
    },
    {
        title: "Limpeza da Lagoa",
        image: evento2,
        ong: "Beagá Limpa",
        local: "Lagoa da Pampulha, Belo Horizonte",
        date: "01/02/2025",
        time: "07:00 - 8:00",
    },
    {
        title: "Limpeza do Mar",
        image: evento3,
        ong: "Bodyboarder do Olho D'Água",
        local: "Lagoa da Pampulha, São Luís",
        date: "07/02/2025",
        time: "07:00 - 8:00",
    },
];

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




const Eventos = () => {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('');
    const [favorites, setFavorites] = useState({});

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index], // Alterna entre true e false
    }));
  };
    const handleDateInput = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (input.length > 8) input = input.slice(0, 8); // Limita a 8 caracteres (ddmmyyyy)

        // Aplica a máscara
        const day = input.slice(0, 2);
        const month = input.slice(2, 4);
        const year = input.slice(4, 8);

        let formattedDate = day;
        if (month) formattedDate += '/' + month;
        if (year) formattedDate += '/' + year;

        setValue(formattedDate);
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
                            <Typography variant="h4" color="primary" style={{ textAlign: "center", fontWeight: 700 }}>Eventos</Typography>
                            <Grid container direction="column" style={{ marginTop: 40 }}>
                                <Grid container direction="column" spacing={2} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                                    {/* Campo "Local" */}
                                    <Grid item style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                        <Typography style={{ marginRight: '10px', width: '50px', fontWeight: 600 }}>Cidade</Typography>
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
                                        <Typography style={{ marginRight: '10px', width: '50px', fontWeight: 600 }}>Data</Typography>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={handleDateInput}

                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                fontSize: '14px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container direction="column">

                        </Grid>
                        <Grid style={{ marginTop: 20 }}>
                            {data.map((event, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card style={{ display: "flex", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", border: "1px solid #ccc", marginBottom:7  }}>
                                        {/* Imagem */}
                                        <CardMedia
                                            component="img"
                                            style={{ width: "150px", objectFit: "cover", borderRadius: "12px 0 0 12px" }}
                                            image={event.image}
                                            alt={event.title}
                                        />
                                        {/* Conteúdo */}
                                        <CardContent style={{ flex: "1", padding: "16px", position: "relative" }}>
                                            <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "8px", fontSize:15 }}>
                                                {event.title}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                <strong>ONG:</strong> {event.ong}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                <strong>Local:</strong> {event.local}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                <strong>Data:</strong> {event.date}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Horário:</strong> {event.time}
                                            </Typography>
                                            {/* Ícones */}
                                            <div style={{  display: "flex" }}>
                                                <IconButton size="small" onClick={() => toggleFavorite(index)}>
                                                {favorites[index] ? (
                    <StarIcon style={{ color: "gold" }} /> // Estrela preenchida
                  ) : (
                    <StarTwoTone style={{ color: "gold" }} /> // Estrela vazia
                  )}
                                                </IconButton>
                                                <IconButton size="small">
                                                    <ShareOutlined />
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Container>

            </Container>
        </div>
    );
};

export default Eventos; 