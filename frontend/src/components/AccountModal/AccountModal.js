import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@material-ui/core";

import useBroker from "../../hooks/useBroker";
import { green } from "@material-ui/core/colors";
import api from "../../services/api";
import { toast } from "react-toastify";
import toastError from "../../errors/toastError";
import { Field, Form, Formik } from "formik";
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
    userDialog:{
        background: theme.palette.background
    },
	btnWrapper: {
		position: "relative",
	},
	whiteField: {
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
  dialogStyle:{
    color: "#fff", 
    backgroundColor: "#333"
  }
}));




export default function AccountModal({ open, handleClose, userId, fetchAccounts })  {
	const classes = useStyles();
	const {createAccount} = useBroker();
	const initialState = {
		loginName: "",
		initialInvestment: "",
		balance: "",
		startDate:"",
		endDate:null,
		unit: "",
	};

	//const { user: loggedInUser } = useContext(AuthContext);
	
	const [user, setUser] = useState(initialState);





	const handleSaveUser = async values => {
		const accountData = { ...values };
		try {
			// if (userId) {
			// 	await api.put(`/users/${userId}`, userData);
			// } else {
			// 	await api.post("/users", userData);
			// }
			await createAccount(accountData, userId)
			await fetchAccounts();
			toast.success("Conta criada com sucesso");
		} catch (err) {
			toastError(err);
		} finally{
			handleClose();
		}
		
	};

	return (
		<div className={classes.root}>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				scroll="paper"
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
			>
				<DialogTitle id="form-dialog-title" className={classes.dialogStyle}>
					{userId
						? 'Adicionar Conta'
						: 'Editar Conta'}
				</DialogTitle>
				<Formik
					initialValues={user}
					enableReinitialize={true}
		
					onSubmit={(values, actions) => {
						setTimeout(() => {
							handleSaveUser(values);
							actions.setSubmitting(false);
						}, 400);
					}}
				>
					{({ touched, errors, isSubmitting }) => (
						<Form>
							<DialogContent  className={classes.dialogStyle} >
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										placeholder="Nome"
										autoFocus
										
										name="loginName"
										error={touched.loginName && Boolean(errors.loginName)}
										helperText={touched.loginName && errors.loginName}
										className={classes.whiteField}
										variant="outlined"
										margin="dense"
										fullWidth
									/>

								</div>
								<div className={classes.multFieldLine}>
								<Field
										as={TextField}
										placeholder={"Saldo"}
										type="number"
										name="balance"
										error={touched.balance && Boolean(errors.balance)}
										className={classes.whiteField}
										helperText={touched.balance && errors.balance}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
									<Field
										as={TextField}
										placeholder={"Unidade"}
										type="number"
										name="unit"
										error={touched.unit && Boolean(errors.unit)}
										className={classes.whiteField}
										helperText={touched.unit && errors.unit}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
									<Field
										as={TextField}
										placeholder={"Investimento"}
										type="number"
										name="initialInvestment"
										error={touched.initialInvestment && Boolean(errors.initialInvestment)}
										className={classes.whiteField}
										helperText={touched.initialInvestment && errors.initialInvestment}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
								</div>
								<div className={classes.multFieldLine}>
									<Grid container direction="column">
									<Typography variant="subtitle1" >Data de Início</Typography>
									<Field
										as={TextField}
										type="Date"
									
										name="startDate"
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
										className={classes.whiteField}
										variant="outlined"
										margin="dense"
										fullWidth
									/>

									</Grid>
								</div>
								<div className={classes.multFieldLine}>
									<Grid container direction="column">
									<Typography variant="subtitle1" >Data de Fim</Typography>
									<Field
										as={TextField}
										type="Date"
									
										name="endDate"
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
										className={classes.whiteField}
										variant="outlined"
										margin="dense"
										fullWidth
									/>

									</Grid>
								</div>
							</DialogContent>
							<DialogActions className={classes.dialogStyle}>
								<Button
									onClick={handleClose}
									
									disabled={isSubmitting}
									 color="error"
									variant="contained"
									style={{ background: "#f44336"}}
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