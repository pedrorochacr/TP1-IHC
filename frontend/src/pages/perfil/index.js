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
    CardContent,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from "@material-ui/core/styles";
import { DateRangeOutlined, PlaceOutlined, SearchOutlined, ShareOutlined, StarTwoTone, TimeToLeaveOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
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

];
const reports = [
    {
      title: "Descarte irregular de lixo",
      location: "Rua das Flores, Centro, Salvador",
      date: "10/01/2025",
      description:
        "Denúncia sobre o descarte irregular de lixo na rua, com acumulação de resíduos que prejudica a saúde pública.",
        activeStep:1
    },
    {
      title: "Queima de lixo em área residencial",
      location: "Avenida da Paz, Bairro Boa Vista, Salvador",
      date: "12/01/2025",
      description:
        "Denúncia sobre a prática de queima de lixo em um terreno baldio próximo a residências, liberando fumaça tóxica e causando desconforto aos moradores, além de impactos negativos à saúde e ao meio ambiente.",
        activeStep:2
    },

    // Adicione mais denúncias conforme necessário
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
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
}));




const Perfil = () => {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

    const [expanded, setExpanded] = useState(false);
    const [visibleEvents, setVisibleEvents] = useState(1); // Começa com 1 evento visível
    const [visibleReports, setVisibleReports] = useState(1); // Começa com 1 evento visível

  
    const handleLoadMore = () => {
      setVisibleEvents((prev) => Math.min(prev + 1, data.length)); // Carrega mais eventos
    };
    const handleLoadMoreReports = () => {
        setVisibleReports((prev) => Math.min(prev + 1, data.length)); // Carrega mais eventos
      };
    function getSteps() {
        return ['Não enviada', 'Em análise', 'Finalizada'];
      }
      


    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="md">
                <CssBaseline />

                <Container component="div" maxWidth="xs" className={classes.mobileContainer}>
                    <div className={classes.paper}>
                        <Grid container direction="column" justifyContent="center" style={{marginBottom:30}}>
                            <Typography variant="h4" color="primary" style={{ textAlign: "center", fontWeight: 700 }}>Olá, Glívia</Typography>
                            

                        </Grid>
                        <Typography style={{ marginRight: "10px", fontWeight: 600 }}>
                                              Eventos favoritados:
                                            </Typography>
                        <Grid style={{ marginTop: 20 }} container direction="column" alignItems="center">
                         
                        { (
                                  data.slice(0, visibleEvents).map((event, index) => (
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
                                                    <PlaceOutlined color="primary"/>
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                    <strong>Data:</strong> {event.date}
                                                    <DateRangeOutlined  color="primary"/>
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Horário:</strong> {event.time}
                                                    <TimeToLeaveOutlined color="primary"/>
                                                </Typography>
                                                {/* Ícones */}
                                                <div style={{  display: "flex" }}>
                                                   
                                                    <StarIcon style={{ color: "gold" }} />
                                                   
                                                    <IconButton size="small">
                                                        <ShareOutlined />
                                                    </IconButton>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                             {visibleEvents < data.length && (
            <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "16px" }}
            >
            <Typography
                onClick={handleLoadMore}
                style={{
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
                }}
            >
                Mostrar mais eventos
            </Typography>
            </Grid>
        )}
        


                        </Grid>
                        <Typography style={{ marginRight: "10px", fontWeight: 600, marginTop:20, marginBottom:20 }}>
                                              Minhas denúncias:
                                            </Typography>
                {(reports.slice(0, visibleReports).map((event, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card style={{ display: "flex", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", border: "1px solid #ccc", marginBottom:7  }}>
                                            
                                            {/* Conteúdo */}
                                            <CardContent style={{ flex: "1", padding: "16px", position: "relative" }}>
                                                <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "8px", fontSize:19, textAlign:"center" }}>
                                                    {event.title}
                                                </Typography>
                                             
                                              
                                            
                                                <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                    <strong>Descrição:</strong> {event.description}
                                                    
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                    <strong>Local:</strong> {event.location}
                                                    <PlaceOutlined color="primary"/>
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: "4px" }}>
                                                    <strong>Data:</strong> {event.date}
                                                    <DateRangeOutlined  color="primary"/>
                                                </Typography>
                                               
                                                {/* Ícones */}
                                                <div style={{  display: "flex" }}>
                                                   
                                                <Stepper activeStep={event.activeStep} alternativeLabel style={{padding:0, marginTop:10}}>
                                                    {steps.map((label) => (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                    ))}
                                                </Stepper>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                                      {visibleReports < reports.length && (
            <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "16px" }}
            >
            <Typography
                onClick={handleLoadMoreReports}
                style={{
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
                }}
            >
                Mostrar mais denúncias
            </Typography>
            </Grid>
        )}
        
                    </div>
                </Container>

            </Container>
        </div>
    );
};

export default Perfil; 