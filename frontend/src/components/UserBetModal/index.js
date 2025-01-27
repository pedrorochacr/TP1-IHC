import React, { useState, useEffect, useRef, useContext } from "react";
import { Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";
import api from "../../services/api";
import { toast } from "react-toastify";
import toastError from "../../errors/toastError";
import { Field, Form, Formik } from "formik";
import { useUser } from "../../hooks/useUser";
import { head } from "lodash";
import useStaking from "../../hooks/useStaking";
import { AuthContext } from "../../context/Auth/AuthContext";
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    modal: {
        "& .MuiDialog-paper": {
            background: theme.palette.secondary.main
        }
    },
    pagePagination: {
        marginTop: 15,
        "& .MuiPaginationItem-root": {
            color: theme.palette.textPrimary
        }

    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    multFieldLine: {
        display: "flex",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(1),
        },
    },
    userDialog: {
        background: theme.palette.background
    },
    btnWrapper: {
        position: "relative",
    },
    menuItem: {
        backgroundColor: `#ffff !important`,

        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: "#279114"
        }
    },

    whiteField: {
        marginTop: 0,

        "& .MuiInputBase-input": {
            color: theme.palette.secondary.main, // Cor do texto

            backgroundColor: "white", // Fundo branco
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white", // Cor da borda
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
        },
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
    dialogStyle: {
        color: "#fff",
        backgroundColor: "#333"
    }
}));

const initialState = {
    odd: 0,
    stake: 0,
    win: false,
    sportName: "volei",
    profit: 0
};
export default function UserBetModal({ open, handleClose, userId, fetchStakingData, betId }) {
    const classes = useStyles();
    const { create, remove } = useStaking();
    const {user} = useContext(AuthContext);
    const [bet, setBet] = useState(initialState);


    const handleSubmit = async values => {
        const betData = { ...values };
        betData.userId = userId;

        const sucessWord = betId ? 'excluída' : 'criada';
        try {
            if (betId) {
                const removeData = {
                    betId,
                    userId:user.id
                }
                await remove(removeData);
            } else {
                await create(betData)
            }

            await fetchStakingData();

        } catch (err) {
            toastError(err);
            return
        } finally {

            handleClose();
        }
        toast.success(`Bet ${sucessWord} com sucesso`);

    };

    return (
        <div className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                scroll="paper"
                BackdropProps={{
                    style: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                }}
            >
                <DialogTitle id="form-dialog-title" className={classes.dialogStyle}>
                    {!betId
                        ? 'Adicionar Bet'
                        : 'Remover Bet'}
                </DialogTitle>

                <Formik
                    initialValues={bet}
                    enableReinitialize={true}

                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            handleSubmit(values);
                            actions.setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (

                        <Form>
                            <DialogContent className={classes.dialogStyle} >
                                {betId ? (
                                    <Typography>Deseja confirmar a exclusão da Bet {betId} para o usuário?</Typography>
                                ) : (

                                    <>
                                    <div className={classes.multFieldLine}>
                                        <Grid container direction="column">
                                            <Typography variant="subtitle1">Ganho</Typography>
                                            <Field
                                                as={Select}
                                                name="win"
                                                className={classes.whiteField}
                                                variant="outlined"
                                                margin="dense"
                                                fullWidth
                                            >
                                                <MenuItem className={classes.menuItem} value={true}>Sim</MenuItem>
                                                <MenuItem className={classes.menuItem} value={false}>Não</MenuItem>
                                            </Field>

                                        </Grid>
                                        <Grid container direction="column">
                                            <Typography variant="subtitle1">Esporte</Typography>
                                            <Field
                                                as={Select}
                                                name="sportName"
                                                className={classes.whiteField}
                                                variant="outlined"
                                                margin="dense"
                                                fullWidth
                                            >
                                                <MenuItem className={classes.menuItem} value={"dota"}>Dota</MenuItem>
                                                <MenuItem className={classes.menuItem} value={"volei"}>Vôlei</MenuItem>
                                                <MenuItem className={classes.menuItem} value={"remates"}>Remates</MenuItem>
                                            </Field>

                                        </Grid>

                                    </div><div className={classes.multFieldLine}>
                                            <Grid container direction="column">
                                                <Typography variant="subtitle1">Odd</Typography>
                                                <Field
                                                    as={TextField}
                                                    placeholder="Odd"

                                                    type="number"
                                                    name="odd"
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                    className={classes.whiteField}
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth />

                                            </Grid>
                                            <Grid container direction="column">
                                                <Typography variant="subtitle1">Lucro</Typography>
                                                <Field
                                                    as={TextField}
                                                    placeholder="Lucro"

                                                    type="number"
                                                    name="profit"
                                                    error={touched.profit && Boolean(errors.profit)}
                                                    helperText={touched.profit && errors.profit}
                                                    className={classes.whiteField}
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth />

                                            </Grid>
                                            <Grid container direction="column">
                                                <Typography variant="subtitle1">Stake</Typography>
                                                <Field
                                                    as={TextField}
                                                    placeholder="Stake"

                                                    type="number"
                                                    name="stake"
                                                    error={touched.stake && Boolean(errors.stake)}
                                                    helperText={touched.stake && errors.stake}
                                                    className={classes.whiteField}
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth />
                                            </Grid>
                                        </div></>
                                )}

                            </DialogContent>
                            <DialogActions className={classes.dialogStyle}>
                                <Button
                                    onClick={handleClose}

                                    disabled={isSubmitting}
                                    color="error"
                                    variant="contained"
                                    style={{ background: "#f44336" }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting}
                                    variant="contained"
                                    className={classes.btnWrapper}
                                >
                                    Salvar
                                    {isSubmitting && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.buttonProgress}
                                        />
                                    )}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};