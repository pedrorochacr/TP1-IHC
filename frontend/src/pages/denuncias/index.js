import React from 'react';
import MainContainer from '../../components/MainContainer';
import { Typography, TextField, Select, MenuItem, Button, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  textField: {
    backgroundColor: '#f0f0f0',
  },
  select: {
    backgroundColor: '#f0f0f0',
    '& .MuiPaper-root': {
      backgroundColor: '#f0f0f0',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: '#f0f0f0',
    },
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  mediaButtons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

const Denuncias = () => {
  const classes = useStyles();

  return (
    <MainContainer>
      <Typography variant="h5" component="h2" gutterBottom>
        Nova denúncia
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Título"
          variant="outlined"
          placeholder="Opcional"
          className={classes.textField}
        />
        <TextField
          label="Provável autor"
          variant="outlined"
          placeholder="Opcional"
          className={classes.textField}
        />
        <Select
          variant="outlined"
          displayEmpty
          className={classes.select}
        >
          <MenuItem value="" disabled>
            Categoria
          </MenuItem>
          <MenuItem value="categoria1">Categoria 1</MenuItem>
          <MenuItem value="categoria2">Categoria 2</MenuItem>
          <MenuItem value="categoria3">Categoria 3</MenuItem>
        </Select>
        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          rows={4}
          className={classes.textField}
        />
        <Select
          variant="outlined"
          displayEmpty
          className={classes.select}
        >
          <MenuItem value="" disabled>
            Status do lixo
          </MenuItem>
          <MenuItem value="status1">Status 1</MenuItem>
          <MenuItem value="status2">Status 2</MenuItem>
          <MenuItem value="status3">Status 3</MenuItem>
        </Select>
        <TextField
          label="Referência"
          variant="outlined"
          placeholder="Opcional"
          className={classes.textField}
        />
        <div className={classes.mediaButtons}>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          <IconButton color="primary" aria-label="upload image" component="span">
            <ImageIcon />
          </IconButton>
        </div>
        <div className={classes.buttons}>
          <Button variant="outlined">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Confirmar edição
          </Button>
        </div>
      </form>
    </MainContainer>
  );
};

export default Denuncias;
