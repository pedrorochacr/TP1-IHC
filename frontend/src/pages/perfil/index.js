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
  Backdrop,
  Snackbar,
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
import Alert from "@material-ui/lab/Alert";
import evento1 from "../../assets/evento1.png";
import evento2 from "../../assets/evento2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    
    
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
  dialogPaper: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
}));

const Perfil = () => {
  const classes = useStyles();
  const [visibleEvents, setVisibleEvents] = useState(1);
  const [visibleReports, setVisibleReports] = useState(1);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [cpf, setCpf] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

  const toggleEventsVisibility = () => {
    setVisibleEvents((prev) => (prev === 1 ? events.length : 1));
  };

  const toggleReportsVisibility = () => {
    setVisibleReports((prev) => (prev === 1 ? reports.length : 1));
  };

  const handleLogout = () => {
    setLogoutDialog(false);
    setNotification({
      open: true,
      message: "Logout realizado com sucesso!",
      severity: "success",
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const handleDeleteAccount = () => {
    if (!cpf.trim()) {
      setNotification({
        open: true,
        message: "Por favor, digite um CPF válido!",
        severity: "error",
      });
      return;
    }
    
    setDeleteDialog(false);
    setNotification({
      open: true,
      message: "Conta deletada com sucesso!",
      severity: "success",
    });
    setTimeout(() => {
      window.location.href = "/inicial";
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
        <div className={classes.paper}>
          

          <Typography variant="h6" gutterBottom>
            Eventos favoritados:
          </Typography>
          {events.slice(0, visibleEvents).map((event, index) => (
            <Card key={index} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                src={event.image}
                alt={event.title}
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
          <Button onClick={toggleEventsVisibility}>
            {visibleEvents === 1 ? "Mostrar mais eventos" : "Mostrar menos eventos"}
          </Button>

          <Grid container spacing={2} justifyContent="center" style={{ marginTop: 16 }}>
           
            
          </Grid>

          <Dialog
            open={logoutDialog}
            onClose={() => setLogoutDialog(false)}
            classes={{ paper: classes.dialogPaper }}
            BackdropComponent={Backdrop}
            BackdropProps={{
              className: classes.backdrop,
            }}
          >
            <DialogTitle>Confirmar Logout</DialogTitle>
            <DialogContent>
              <Typography>Tem certeza de que deseja sair?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLogoutDialog(false)} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleLogout} color="primary">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={deleteDialog}
            onClose={() => setDeleteDialog(false)}
            classes={{ paper: classes.dialogPaper }}
            BackdropComponent={Backdrop}
            BackdropProps={{
              className: classes.backdrop,
            }}
          >
            <DialogTitle>Deletar Conta</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Digite seu CPF para confirmar:
              </Typography>
              <TextField
                fullWidth
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="123.456.789-00"
                margin="dense"
                variant="outlined"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog(false)} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleDeleteAccount} color="primary">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

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
        </div>
        <Grid container justifyContent="center" style={{marginTop: 20}}>
              <Button
                variant="contained"
                className={classes.deleteButton}
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