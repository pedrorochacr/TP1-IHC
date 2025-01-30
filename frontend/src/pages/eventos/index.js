import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
} from "@material-ui/core";
import {
  PlaceOutlined,
  DateRangeOutlined,
  SearchOutlined,
  ShareOutlined,
  StarOutlined,
  Star,
  TimeToLeaveOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import evento1 from "../../assets/evento1.png";
import evento2 from "../../assets/evento2.png";
import evento3 from "../../assets/evento3.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    padding: theme.spacing(4, 0),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2), // Adiciona espaçamento abaixo da barra roxa
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
  filterInput: {
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  card: {
    display: "flex",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  cardMedia: {
    width: "150px",
    objectFit: "cover",
    borderRadius: "12px 0 0 12px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
    },
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing(2),
    position: "relative",
  },
  actionIcons: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },
}));

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

const Eventos = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [favorites, setFavorites] = useState({}); // Inicialmente todas desmarcadas
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index], // Alterna entre true e false
    }));
  };

  const handleDateInput = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);

    const day = input.slice(0, 2);
    const month = input.slice(2, 4);
    const year = input.slice(4, 8);

    let formattedDate = day;
    if (month) formattedDate += "/" + month;
    if (year) formattedDate += "/" + year;

    setValue(formattedDate);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h4" color="primary" className={classes.header}>
          Eventos
        </Typography>

        <div className={classes.filterContainer}>
          <TextField
            label="Cidade"
            variant="outlined"
            placeholder="Digite a cidade"
            className={classes.filterInput}
          />
          <TextField
            label="Data"
            variant="outlined"
            placeholder="DD/MM/AAAA"
            value={value}
            onChange={handleDateInput}
            className={classes.filterInput}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchOutlined />}
          >
            Buscar
          </Button>
        </div>

        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress size={32} />
          </div>
        ) : (
          <Grid container spacing={3}>
            {data.map((event, index) => (
              <Grid item xs={12} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>ONG:</strong> {event.ong}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Local:</strong> {event.local} <PlaceOutlined color="primary" />
                    </Typography>
                    <Typography variant="body2">
                      <strong>Data:</strong> {event.date} <DateRangeOutlined color="primary" />
                    </Typography>
                    <Typography variant="body2">
                      <strong>Horário:</strong> {event.time} <TimeToLeaveOutlined color="primary" />
                    </Typography>
                    <div className={classes.actionIcons}>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(index)}
                        aria-label="Favoritar"
                      >
                        {favorites[index] ? (
                          <Star style={{ color: "gold" }} />
                        ) : (
                          <StarOutlined style={{ color: "gray" }} />
                        )}
                      </IconButton>
                      <IconButton size="small" aria-label="Compartilhar">
                        <ShareOutlined color="primary" />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Eventos;
