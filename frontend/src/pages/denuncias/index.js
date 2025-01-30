import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ImageIcon from "@material-ui/icons/Image";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(8)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: "600px",
  },
  textField: {
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  button: {
    marginTop: theme.spacing(2), // Ajustado para ficar mais próximo
    padding: theme.spacing(1.5),
    fontWeight: "bold",
    borderRadius: "8px",
  },
  mediaButtons: {
    display: "flex",
    gap: theme.spacing(2),
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  selectField: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "8px",
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

const Denuncias = () => {
  const classes = useStyles();
  const history = useHistory();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [statusLixo, setStatusLixo] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmDialog(true);
  };

  const handleConfirm = () => {
    setConfirmDialog(false);
    setNotification({
      open: true,
      message: "Denúncia enviada com sucesso! Redirecionando...",
    });
    
    setTimeout(() => {
      history.push("/bem-vindo");
    }, 2000);
  };

  const handleCancel = () => {
    setConfirmDialog(false);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

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

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.header}
        style={{ fontWeight: 700 }}
      >
        Nova Denúncia
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Título"
          variant="outlined"
          placeholder="Ex.: Lixo acumulado na praça"
          className={classes.textField}
        />

        <TextField
          label="Provável Autor"
          variant="outlined"
          placeholder="Opcional"
          className={classes.textField}
        />

        <FormControl variant="outlined" className={classes.selectField}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            label="Categoria"
            MenuProps={menuProps}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value="residuos-toxicos">Resíduos Tóxicos</MenuItem>
            <MenuItem value="reciclaveis">Recicláveis</MenuItem>
            <MenuItem value="eletronicos">Eletrônicos</MenuItem>
            <MenuItem value="sanitario">Sanitário</MenuItem>
            <MenuItem value="residuos-animais">Resíduos de Animais</MenuItem>
            <MenuItem value="lixo-espalhado">Lixo Espalhado</MenuItem>
            <MenuItem value="outro">Outro</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          rows={4}
          placeholder="Detalhe a situação observada..."
          className={classes.textField}
        />

        <FormControl variant="outlined" className={classes.selectField}>
          <InputLabel>Status do Lixo</InputLabel>
          <Select
            value={statusLixo}
            onChange={(e) => setStatusLixo(e.target.value)}
            label="Status do Lixo"
            MenuProps={menuProps}
          >
            <MenuItem value="espalhado">Espalhado</MenuItem>
            <MenuItem value="amontoado">Amontoado</MenuItem>
            <MenuItem value="decomposicao">Em Decomposição</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Referência"
          variant="outlined"
          placeholder="Ex.: Próximo à entrada do parque"
          className={classes.textField}
        />

        <div className={classes.mediaButtons}>
          <IconButton color="primary" aria-label="Carregar foto" component="span">
            <PhotoCamera />
          </IconButton>
          <IconButton color="primary" aria-label="Carregar imagem" component="span">
            <ImageIcon />
          </IconButton>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Enviar Denúncia
        </Button>
      </form>

      <Dialog
        open={confirmDialog}
        onClose={handleCancel}
        classes={{ paper: classes.dialogPaper }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          className: classes.backdrop,
        }}
      >
        <DialogTitle>Confirmar Denúncia</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja enviar esta denúncia?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Voltar à edição
          </Button>
          <Button onClick={handleConfirm} color="primary">
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
          severity="success"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Denuncias;