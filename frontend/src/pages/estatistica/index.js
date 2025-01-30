import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import denuncia from "../../assets/denuncia.jpeg";

const getLast6Months = () => {
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

const chartOptions = {
  chart: {
    id: "dynamic-bar",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: getLast6Months(),
  },
  title: {
    text: "Últimos 6 Meses",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
};

const chartSeries = [
  {
    name: "Denúncias",
    data: [12, 19, 10, 15, 22, 13],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    fontWeight: 700,
  },
  filterContainer: {
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  inputField: {
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  button: {
    padding: theme.spacing(1),
    fontWeight: "bold",
    borderRadius: "8px",
  },
  mapContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    marginTop: theme.spacing(3),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },
  sectionTitle: {
    margin: theme.spacing(3, 0, 1),
    fontWeight: 600,
  },
  locationsList: {
    fontWeight: 600,
    lineHeight: 1.8,
    paddingLeft: theme.spacing(2),
  },
  categorySelector: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    marginTop: theme.spacing(1),
  },
  menuPaper: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    "& .MuiMenuItem-root": {
      backgroundColor: "#fff !important",
      color: "#333 !important",
      "&:hover": {
        backgroundColor: "#f5f5f5 !important",
      },
    },
  },
  menuBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5) !important",
    zIndex: 9998,
  },
}));

const Estatistica = () => {
  const classes = useStyles();
  const [localizacao, setLocalizacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const menuProps = {
    classes: {
      paper: classes.menuPaper,
    },
    BackdropProps: {
      className: classes.menuBackdrop,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
    disableAutoFocusItem: true,
    disablePortal: true,
    transitionDuration: 0,
    MenuListProps: {
      style: {
        padding: 0,
      },
    },
  };

  const handleSearch = () => {
    if (!localizacao) {
      setNotification({
        open: true,
        message: "Por favor, preencha a localização antes de buscar.",
        severity: "error",
      });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: "Resultados atualizados com sucesso!",
        severity: "success",
      });
    }, 2000);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <CssBaseline />
        <Typography variant="h4" color="primary" className={classes.header}>
          Estatísticas
        </Typography>

        <div className={classes.filterContainer}>
          <TextField
            label="Localização"
            variant="outlined"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={classes.inputField}
            placeholder="Digite a localização"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchOutlined />}
            className={classes.button}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>

        <Typography className={classes.sectionTitle}>
          Número de denúncias (raio de 5km):
        </Typography>
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress size={32} />
          </div>
        ) : (
          <div className={classes.mapContainer}>
            <img src={denuncia} alt="Mapa de denúncias" style={{ width: "100%" }} />
          </div>
        )}

        <Typography className={classes.sectionTitle}>
          Distribuição ao longo do ano:
        </Typography>
        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />

        <Typography className={classes.sectionTitle}>
          Locais com maior risco de acúmulo:
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" fullWidth className={classes.categorySelector}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                label="Categoria"
                MenuProps={menuProps}
              >
                <MenuItem value="">
                  <em>Selecione uma categoria</em>
                </MenuItem>
                <MenuItem value="residuos-toxicos">Resíduos tóxicos</MenuItem>
                <MenuItem value="plastico">Plástico</MenuItem>
                <MenuItem value="papel">Papel</MenuItem>
                <MenuItem value="metal">Metal</MenuItem>
                <MenuItem value="vidro">Vidro</MenuItem>
                <MenuItem value="eletronicos">Eletrônicos</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography className={classes.locationsList}>
              1. Lagoa da Pampulha <br />
              2. Mercado Central <br />
              3. Praça da Liberdade
            </Typography>
          </Grid>
        </Grid>

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
      </Container>
    </div>
  );
};

export default Estatistica;