import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import ReportIcon from "@material-ui/icons/Report";
import { DateRangeOutlined, PlaceOutlined } from "@material-ui/icons";
import evento1 from "../../assets/evento1.png";
import evento2 from "../../assets/evento2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
    backgroundColor: theme.palette.background.default,
  },
  headerBar: {
    // Caso precise de um header (bar) separado
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: "#fff",
    borderRadius: "0 0 20px 20px",
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: 400,
    marginBottom: theme.spacing(4),
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    // Unificando estilos para o container que abriga as denúncias
    padding: theme.spacing(3),
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontWeight: 700,
    // A margem inferior extra para afastar do final da tela
    marginBottom: theme.spacing(8),
  },
  card: {
    display: "flex",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(2),
    textAlign: "left", // Para não herdar o 'center' da .paper
  },
  cardContent: {
    padding: theme.spacing(2),
    flex: 1,
  },
  stepper: {
    padding: 0,
    marginTop: theme.spacing(2),
  },
}));

const events = [
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
    time: "07:00 - 08:00",
  },
];

const reports = [
  {
    title: "Descarte irregular de lixo",
    description:
      "Denúncia sobre o descarte irregular de lixo na rua, com acumulação de resíduos que prejudica a saúde pública.",
    location: "Rua das Flores, Centro, Salvador",
    date: "10/01/2025",
    activeStep: 1,
  },
  {
    title: "Queima de lixo em área residencial",
    description:
      "Denúncia sobre a prática de queima de lixo em um terreno baldio próximo a residências, liberando fumaça tóxica e causando desconforto aos moradores.",
    location: "Avenida da Paz, Bairro Boa Vista, Salvador",
    date: "12/01/2025",
    activeStep: 2,
  },
];

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const [visibleEvents, setVisibleEvents] = useState(1);
  const [visibleReports, setVisibleReports] = useState(1);

  const toggleEventsVisibility = () => {
    setVisibleEvents((prev) => (prev === 1 ? events.length : 1));
  };

  const toggleReportsVisibility = () => {
    setVisibleReports((prev) => (prev === 1 ? reports.length : 1));
  };

  return (
    <div className={classes.root}>
      {/* Exemplo de um "header bar" caso queira usar */}
      {/* <div className={classes.headerBar}>
        <Typography variant="h5">Minha Dashboard</Typography>
      </div> */}

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.actionButton}
          startIcon={<ReportIcon className={classes.icon} />}
          onClick={() => history.push("/denuncias")}
        >
          Fazer Denúncia
        </Button>
      </div>

      <Grid container direction="column" className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Minhas denúncias:
        </Typography>
        {reports.slice(0, visibleReports).map((report, index) => (
          <Card key={index} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                {report.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Descrição:</strong> {report.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Local:</strong> {report.location} <PlaceOutlined />
              </Typography>
              <Typography variant="body2">
                <strong>Data:</strong> {report.date} <DateRangeOutlined />
              </Typography>
              <Stepper
                activeStep={report.activeStep}
                alternativeLabel
                className={classes.stepper}
              >
                {["Não enviada", "Em análise", "Finalizada"].map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        ))}
        <Button onClick={toggleReportsVisibility}>
          {visibleReports === 1 ? "Mostrar mais denúncias" : "Mostrar menos denúncias"}
        </Button>
      </Grid>
    </div>
  );
};

export default Dashboard;
