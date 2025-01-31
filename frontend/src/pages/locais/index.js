import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Grid,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import mapa from "../../assets/mapa.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    marginBottom: theme.spacing(5),
  },
  header: {
    textAlign: "center",
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8),
    color: theme.palette.primary.main,
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
    marginTop: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
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

const Locais = () => {
  const classes = useStyles();
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
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
    if (!local || !tipo) {
      setNotification({
        open: true,
        message: "Por favor, preencha ambos os campos antes de buscar.",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: "Locais encontrados com sucesso!",
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
        <Typography variant="h3" className={classes.header}>
          Locais de Descarte
        </Typography>

        <div className={classes.filterContainer}>
          <TextField
            label="Local"
            variant="outlined"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className={classes.inputField}
            placeholder="Digite o local"
            aria-label="Campo para o local do descarte"
          />

          <FormControl variant="outlined" className={classes.inputField}>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              label="Tipo"
              aria-label="Campo para o tipo do descarte"
              MenuProps={menuProps}
            >
              <MenuItem value="">Selecione uma opção</MenuItem>
              <MenuItem value="residuos-toxicos">Resíduos tóxicos</MenuItem>
              <MenuItem value="plastico">Plástico</MenuItem>
              <MenuItem value="papel">Papel</MenuItem>
              <MenuItem value="metal">Metal</MenuItem>
              <MenuItem value="vidro">Vidro</MenuItem>
              <MenuItem value="eletronicos">Eletrônicos</MenuItem>
            </Select>
          </FormControl>

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

        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress size={32} />
          </div>
        ) : (
          <div className={classes.mapContainer}>
            <img
              src={mapa}
              alt="Mapa de locais de descarte"
              style={{ width: "100%" }}
            />
          </div>
        )}

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
            severity={notification.message.includes("sucesso") ? "success" : "error"}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Locais;
