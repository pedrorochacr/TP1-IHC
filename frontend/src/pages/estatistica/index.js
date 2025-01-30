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
  Card,
  Divider,
  Box,
} from "@material-ui/core";
import { 
  SearchOutlined,
  DateRangeOutlined,
  WarningOutlined 
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import denuncia from "../../assets/denuncia.jpeg";
import { useTheme } from '@material-ui/core/styles';

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
    toolbar: { show: false },
    foreColor: '#373d3f'
  },
  xaxis: {
    categories: getLast6Months(),
    labels: { style: { fontSize: '14px' } }
  },
  yaxis: {
    labels: { style: { fontSize: '14px' } }
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%',
    }
  },
  dataLabels: { enabled: false },
  colors: ['#2E7D32'],
  title: {
    text: "Últimos 6 Meses",
    align: "center",
    style: { fontSize: "18px", fontWeight: 600 }
  },
  grid: {
    borderColor: '#f1f3f4',
    strokeDashArray: 5
  }
};

const chartSeries = [
  {
    name: "Denúncias",
    data: [12, 19, 10, 15, 22, 13],
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    //padding: theme.spacing(4),
    //marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.primary.main
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
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  button: {
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    borderRadius: "8px",
    textTransform: 'none',
    fontSize: '16px'
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: theme.spacing(4),
    margin: theme.spacing(3, 0),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
    border: `1px solid ${theme.palette.divider}`,
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sectionHeader: {
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    fontSize: '20px'
  },
  mapContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    width: "100%",
  },
  chartContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  },
  riskSection: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  },
  locationItem: {
    padding: theme.spacing(2),
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
  categorySelector: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  divider: {
    margin: theme.spacing(4, 0),
    backgroundColor: theme.palette.divider,
    height: 2
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  },
  menuPaper: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    "& .MuiMenuItem-root": {
      padding: theme.spacing(1.5, 2),
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
  const theme = useTheme();

  const menuProps = {
    classes: { paper: classes.menuPaper },
    BackdropProps: { className: classes.menuBackdrop },
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    getContentAnchorEl: null,
    disableAutoFocusItem: true,
    disablePortal: true,
    transitionDuration: 0,
    MenuListProps: { style: { padding: 0 } },
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
      <Container maxWidth="lg">
        <CssBaseline />
        
        <Typography variant="h3" className={classes.header}>
          Estatísticas
        </Typography>

        {/* Filtros */}
        <div className={classes.filterContainer}>
          <TextField
            label="Localização"
            variant="outlined"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={classes.inputField}
            placeholder="Ex: Centro, São Paulo"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchOutlined />}
            className={classes.button}
            onClick={handleSearch}
          >
            Buscar Dados
          </Button>
        </div>

        {/* Seção 1: Mapa de Denúncias */}
        <Card className={classes.sectionCard}>
          <Typography variant="h5" className={classes.sectionHeader}>
            <WarningOutlined fontSize="inherit" />
            Densidade de Denúncias (raio de 5km)
          </Typography>
          {loading ? (
            <div className={classes.loadingContainer}>
              <CircularProgress size={48} color="primary" />
            </div>
          ) : (
            <div className={classes.mapContainer}>
              <img 
                src={denuncia} 
                alt="Mapa de calor de denúncias" 
                style={{ 
                  width: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "12px"
                }} 
              />
            </div>
          )}
        </Card>

        <Divider className={classes.divider} />

        {/* Seção 2: Gráfico Anual */}
        <Card className={classes.sectionCard}>
          <Typography variant="h5" className={classes.sectionHeader}>
            <DateRangeOutlined fontSize="inherit" />
            Distribuição Temporal de Ocorrências
          </Typography>
          <div className={classes.chartContainer}>
            <ReactApexChart 
              options={chartOptions} 
              series={chartSeries} 
              type="bar" 
              height={350} 
            />
          </div>
        </Card>

        <Divider className={classes.divider} />

        {/* Seção 3: Locais de Risco */}
        <Card className={classes.sectionCard}>
          <Typography variant="h5" className={classes.sectionHeader}>
            <WarningOutlined fontSize="inherit" />
            Áreas Críticas de Acúmulo de Resíduos
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth className={classes.categorySelector}>
                <InputLabel>Categoria de Resíduo</InputLabel>
                <Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  label="Categoria"
                  MenuProps={menuProps}
                >
                  <MenuItem value="">
                    <em>Selecione uma categoria</em>
                  </MenuItem>
                  <MenuItem value="residuos-toxicos">Resíduos Tóxicos</MenuItem>
                  <MenuItem value="plastico">Plástico</MenuItem>
                  <MenuItem value="papel">Papel</MenuItem>
                  <MenuItem value="metal">Metal</MenuItem>
                  <MenuItem value="vidro">Vidro</MenuItem>
                  <MenuItem value="eletronicos">Eletrônicos</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className={classes.riskSection}>
                <Typography variant="h6" gutterBottom color="textSecondary">
                  Ranking de Locais Críticos:
                </Typography>
                {[
                  { name: "Lagoa da Pampulha", count: 152 },
                  { name: "Mercado Central", count: 128 },
                  { name: "Praça da Liberdade", count: 115 }
                ].map((item, index) => (
                  <Card key={index} className={classes.locationItem}>
                    <Typography variant="body1">
                      {index + 1}. {item.name}
                      <Box component="span" display="block" color="textSecondary" mt={0.5}>
                        {item.count} ocorrências registradas
                      </Box>
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
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
            style={{ borderRadius: '8px' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Estatistica;
