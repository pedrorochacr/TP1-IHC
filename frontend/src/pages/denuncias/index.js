import React from 'react';
import MainContainer from '../../components/MainContainer';
import { Typography, TextField, Select, MenuItem, Button, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: '600px',
  },
  textField: {
    backgroundColor: '#f0f0f0',
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
    <MainContainer style={{display: 'flex', justifyContent: 'center'}}>
        <div className={classes.container}>
            <Typography variant="h4" color="primary" style={{ textAlign: "center", fontWeight: 700, marginTop: '24px', marginBottom: '24px' }}>
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
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                <select
                    style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                    }}
                >
                    <option value="" disabled selected>
                    Categoria
                    </option>
                    <option value="opcao1">Resíduos tóxicos </option>
                    <option value="opcao2">Recicláveis </option>
                    <option value="opcao3">Eletronicos</option>
                    <option value="opcao4">Sanitário</option>
                    <option value="opcao5">Resíduos de Animais</option>
                    <option value="opcao6">Lixo Espalhado</option>
                    <option value="opcao7">Outro</option>
                </select>
                </Grid>
                <TextField
                label="Descrição"
                variant="outlined"
                multiline
                rows={4}
                className={classes.textField}
                />
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                <select
                    style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                    }}
                >
                    <option value="" disabled selected>
                    Status do Lixo
                    </option>
                    <option value="opcao1">Espalhado </option>
                    <option value="opcao2">Amontoado </option>
                    <option value="opcao3">Em decomposicao</option>
                </select>
                </Grid>
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
        </div>
    </MainContainer>
  );
};

export default Denuncias;
