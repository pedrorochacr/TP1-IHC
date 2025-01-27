import React, { useState, useEffect, useContext, useRef } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditIcon from "@material-ui/icons/Edit";
import { Avatar, Box, Button, CardActions, CircularProgress, Divider, makeStyles, Paper, TextField, useTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AuthContext } from '../../context/Auth/AuthContext.js';
import MainContainer from "../../components/MainContainer/index.js";
import MainHeader from "../../components/MainHeader/index.js";
import Title from "../../components/Title/index.js";
import { useUser } from "../../hooks/useUser/index.js";
import { toast } from "react-toastify";
import { head } from "lodash";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        border: '1px solid white', // Borda branca
        borderRadius: '8px',       // (Opcional) Arredondar os cantos
        padding: '16px',
        marginLeft: 25
    },
    padding: {
        padding: theme.spacing(2),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
    dataTitle: {
        fontWeight: 600,
        marginBottom: 15
    }
}));



export default function Configuration() {
    const classes = useStyles();
    const theme = useTheme();
    const { addProfilePic, alterUnit } = useUser();
    const { user } = useContext(AuthContext);
    const [unit, setUnit] = useState(user.unit);
    const [loading, setLoading] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [selectedPic, setSelectedPic] = useState(null);
    const profilePicFile = useRef(null);
    function formatProfilePic(profilePath) {

        if (!profilePath) return null
        const urlImage = `${process.env.REACT_APP_BACKEND_URL}/${profilePath.replace(/\\/g, '/').substring(profilePath.indexOf('public'))}`;
        console.log(urlImage)
        return urlImage;
    }
    const handleProfliePicFile = (e) => {
        const file = head(e.target.files);
        console.log(file)
        if (file) {
            setNewProfilePic(file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedPic(reader.result); // Salva a URL da imagem no estado
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpdateProfilePic = async (event) => {

        const formData = new FormData();
        formData.append('file', newProfilePic); 
        try {
            await addProfilePic(user.id, formData);
            toast.success("Foto de Perfil atualizada com sucesso")
        } catch (e) {
            toast.error(e)
        } finally {
            setNewProfilePic(null);
        }
    };
    const handleUpdateUnit = async (event) => {
        const data = {
            unit
        }
        try {
            await alterUnit(user.id, data);
            toast.success("Unidade atualizada com sucesso")
        } catch (e) {
            toast.error(e)
        }
    };

    return (
        <MainContainer className={classes.mainContainer}>
            <MainHeader>

                <Title>Configurações</Title>

            </MainHeader>


            {loading ?
                (
                    <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                        <CircularProgress color="primary" />
                    </Grid>

                ) :
                (
                    <Grid spacing={3} container>
                        <Grid item lg={4} md={6} xs={12} className={classes.grid} >
                            <Grid container alignItems='center' spacing={2} justifyContent='center' direction='column' >
                                <Grid item >
                                    <Avatar style={{ width: 100, height: 100 }} src={selectedPic || formatProfilePic(user.profilePic)}  >

                                    </Avatar>



                                </Grid>
                                <Grid item container spacing={1} direction='column' style={{ textAlign: 'center' }}>
                                    <Grid item >
                                        <Typography variant="h5" style={{ fontWeight: 500, color: theme.palette.textPrimary }} >{user.name}</Typography>


                                    </Grid>

                                </Grid>
                            </Grid>
                            <Divider style={{ marginTop: 15 }} />
                            {!newProfilePic ? (
                                <Button fullWidth variant="outlined" color="primary" onClick={() => profilePicFile.current.click()} >
                                    Alterar Foto de Perfil
                                </Button>
                            ) : (
                                <Grid container direction="row" style={{ gap: 9 }} justifyContent="center">
                                    <Button variant="contained" style={{ background: theme.palette.danger, width:"47%" }} onClick={() => setSelectedPic(null)} >
                                        cancelar
                                    </Button>
                                    <Button variant="contained" style={{ width:"47%" }} color="primary" onClick={handleUpdateProfilePic} >
                                        Salvar
                                    </Button>

                                </Grid>

                            )}

                            <div style={{ display: "none" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={profilePicFile}
                                    onChange={(e) => handleProfliePicFile(e)}
                                />
                            </div>
                        </Grid>
                        <Grid item className={classes.grid} >
                            <Grid container alignItems='center' spacing={2} justifyContent='center' direction='column' >
                                <Grid item >
                                    <Typography style={{ color: theme.palette.textPrimary }}>Alterar Unidade</Typography>


                                </Grid>
                                <Grid item container spacing={1} direction='column' style={{ textAlign: 'center' }}>
                                    <TextField id="outlined-basic" size="small" variant="outlined" value={unit} type="number" style={{
                                        backgroundColor: 'white',  // Fundo branco
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white', // Borda branca
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'lightgray', // (Opcional) Cor ao passar o mouse
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'blue', // (Opcional) Cor ao focar
                                            },
                                        },
                                        marginBottom: 15
                                    }}
                                        onChange={(e) => setUnit(e.target.value)}

                                    />
                                    <Button variant="contained" color="primary" onClick={handleUpdateUnit}>
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>




                    </Grid>
                )

            }
        </MainContainer>

    );
}
