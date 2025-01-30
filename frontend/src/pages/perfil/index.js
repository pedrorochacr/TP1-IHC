import React, { useState } from "react";
import {
  Typography,
  Grid,
  Container,
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import {
  PlaceOutlined,
  DateRangeOutlined,
  ShareOutlined,
  Star,
  ExitToApp,
  Delete,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontWeight: 700,
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    fontWeight: "bold",
    borderRadius: "8px",
  },
  card: {
    display: "flex",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    width: 150,
    borderRadius: "12px 0 0 12px",
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

const Perfil = () => {
  const classes = useStyles();
  const [visibleEvents, setVisibleEvents] = useState(1);
  const [visibleReports, setVisibleReports] = useState(1);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [cpf, setCpf] = useState("");

  const events = [
    {
      title: "Limpeza do Mar",
      image: "evento1.png",
      ong: "Projeto Mar Sem Lixo",
      local: "Praia do Porto da Barra, Salvador",
      date: "05/02/2025",
      time: "09:00 - 11:00",
    },
    {
      title: "Limpeza da Lagoa",
      image: "evento2.png",
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

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
         

          <Typography variant="h6" gutterBottom>
            Eventos favoritados:
          </Typography>
          {events.map((event, index) => (
            <Card key={index} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={event.image}
                title={event.title}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>ONG:</strong> {event.ong}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Local:</strong> {event.local} <PlaceOutlined />
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Data:</strong> {event.date} <DateRangeOutlined />
                </Typography>
                <Typography variant="body2">
                  <strong>Horário:</strong> {event.time}
                </Typography>
                <IconButton>
                  <Star color="primary" />
                </IconButton>
                <IconButton>
                  <ShareOutlined />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
            Minhas denúncias:
          </Typography>
          {reports.map((report, index) => (
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
        </div>
        <Grid container justifyContent="center" style={{marginTop:20}} alignItems="center" alignContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Delete />}
                onClick={() => setDeleteDialog(true)}
              >
                Deletar Conta
              </Button>
            </Grid>
      </Container>
    </div>
  );
};

export default Perfil;
