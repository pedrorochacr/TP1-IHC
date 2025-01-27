import React, { useState, useContext } from "react";
import ReactApexChart from 'react-apexcharts';
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
import { BarChart, DateRangeOutlined, PlaceOutlined, SearchOutlined, ShareOutlined, StarTwoTone, TimeToLeaveOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import groupAlerts from "../../assets/groupAlerts.png"
import denuncia from "../../assets/denuncia.png"
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
const getLast12Months = () => {
    const months = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
        const month = now.toLocaleString("default", { month: "short" });
        const year = now.getFullYear();
        months.unshift(`${month}/${year}`);
        now.setMonth(now.getMonth() - 1);
    }

    return months;
};

const options = {
    chart: {
        id: "dynamic-bar",
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        categories: getLast12Months(),
    },
    title: {
        text: "Últimos 6 Meses",
        align: "center",
    },
};

const series = [
    {
        name: "Valores",
        data: [12, 19, 10, 15, 22, 13], // Substitua pelos seus números dinâmicos, se necessário
    },
];
const useStyles = makeStyles((theme) => ({


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




const Estatistica = () => {
    const classes = useStyles();
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true); // Ativa o carregamento
        setTimeout(() => {
            setLoading(false); // Desativa após 2 segundos
        }, 2000);
    };


    return (
        <div className={classes.root}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Container component="div" maxWidth="xs" className={classes.mobileContainer}>
            <div className={classes.paper}>
              <Grid container direction="column" justifyContent="center">
                <Typography
                  variant="h4"
                  color="primary"
                  style={{ textAlign: "center", fontWeight: 700 }}
                >
                  Estatísticas
                </Typography>
                <Grid container direction="column" style={{ marginTop: 40 }}>
                  <Grid
                    container
                    direction="column"
                    style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
                  >
                    <Typography style={{ marginRight: "10px", width: "50px", fontWeight: 600 }}>
                      Localização:
                    </Typography>
                    <Grid
                      item
                      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
                    >
                      <input
                        type="text"
                        style={{
                          flex: 1,
                          padding: "8px",
                          fontSize: "14px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                      <IconButton onClick={handleClick}>
                        <SearchOutlined style={{ color: "#ffff", marginRight: "8px" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {loading ? (
                <Grid container alignItems="center" justifyContent="center">
                    <CircularProgress size={24} />
                </Grid>
                
              ) : (
                <>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Typography style={{ marginRight: "10px", fontWeight: 600 }}>
                      Número de denúncias (raio de 5km):
                    </Typography>
                  </Grid>
                  <Grid style={{ marginTop: 20 }} container direction="column" alignItems="center">
                    <Grid
                      container
                      direction="row"
                      style={{ gap: 15 }}
                      justifyContent="start"
                      alignItems="center"
                    >
                      <img src={denuncia} alt="Denúncia" style={{ width: "70%" }} />
                      <img src={groupAlerts} alt="Grupo de Alertas" style={{ width: "25%", height: 80 }} />
                    </Grid>
                  </Grid>
                  <Grid item style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
                    <Typography style={{ marginRight: "10px", fontWeight: 600 }}>
                      Distribuição ao longo do ano:
                    </Typography>
                  </Grid>
                  <Grid style={{ marginTop: 20 }} container direction="column" alignItems="center">
                    <Grid
                      container
                      direction="row"
                      style={{ gap: 15 }}
                      justifyContent="start"
                      alignItems="center"
                    >
                      <ReactApexChart options={options} series={series} type="bar" height={350} />
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Container>
        </Container>
      </div>
    );
};

export default Estatistica; 