import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";
import api from "../../services/api";
import { toast } from "react-toastify";
import toastError from "../../errors/toastError";
import { Field, Form, Formik } from "formik";
import { useUser } from "../../hooks/useUser";
import { head } from "lodash";
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
	name: "",
	email: "",
	password: "",
	isBroker: false,
	isStaking: false,
	isAdmin: false,
	profilePic:null
};
export default function UserModal({ open, handleClose, userId, fetchUsers }) {
	const classes = useStyles();
	const { createUser, findUser, editUser } = useUser();
	const [user, setUser] = useState(initialState);
	const [profilePic, setProfilepic] = useState(null);
	const [selectedPic, setSelectedPic] = useState(null);
	const profilePicFile = useRef(null);

	useEffect(() => {
		const fetchUser = async () => {
			if (!userId) return;
			try {
				const response = await findUser(userId);

				setUser(prevState => {
					return { ...prevState, ...response };
				});

			} catch (err) {
				toastError(err);
			}
		};

		fetchUser();
	}, [userId, open]);
	//const { user: loggedInUser } = useContext(AuthContext);	

	function formatProfilePic(profilePath){
   
		if(!profilePath) return null
		const urlImage = `${process.env.REACT_APP_BACKEND_URL}/${profilePath.replace(/\\/g, '/').substring(profilePath.indexOf('public'))}`;
		console.log(urlImage)
		return urlImage;
	}
	const handleProfliePicFile = (e) => {
		const file = head(e.target.files);
		console.log(file)
		if (file) {
			setProfilepic(file);
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedPic(reader.result); // Salva a URL da imagem no estado
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSaveUser = async values => {
		const userData = { ...values };
		userData.profilePic = profilePicFile;
		const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('password', userData.password);
        formData.append('email', userData.email)
        formData.append('isStaking', userData.isStaking)
        formData.append('isBroker', userData.isBroker);
        formData.append('isAdmin', userData.isAdmin);
        formData.append('file', profilePic); 
		const sucessWord = userId ? 'editada' : 'criada';
		try {
			if (userId) {
				await editUser(userId, formData);
			} else {
				await createUser(formData)
			}
			
			await fetchUsers();
			toast.success(`Conta ${sucessWord} com sucesso`);
		} catch (err) {
			toastError(err);
		} finally {
			setProfilepic(null);
			setSelectedPic(null);
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
					{!userId
						? 'Adicionar Usuário'
						: 'Editar Usuário'}
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
					{({ touched, errors, isSubmitting, values }) => (
						<Form>
							<DialogContent className={classes.dialogStyle} >
								<Grid container justifyContent="center" direction="column" alignItems="center" style={{ marginBottom: 9 }}>
									<Typography>Foto de Perfil</Typography>
									<Button onClick={() => profilePicFile.current.click()}>
										<Avatar style={{ width: 100, height: 100 }} src={selectedPic || formatProfilePic(user.profilePic) }  >
											{(!profilePic && !user.profilePic ) && <EditIcon />}
										</Avatar>
									</Button>
									<div style={{ display: "none" }}>
										<input
											type="file"
											accept="image/*"
											ref={profilePicFile}
											onChange={(e) => handleProfliePicFile(e)}
										/>
									</div>

								</Grid>
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										placeholder="Nome"
										autoFocus

										name="name"
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
										className={classes.whiteField}
										variant="outlined"
										margin="dense"
										fullWidth
									/>

								</div>
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										placeholder={"Email"}
										type="email"
										name="email"
										error={touched.email && Boolean(errors.email)}
										className={classes.whiteField}
										helperText={touched.email && errors.email}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
									<Field
										as={TextField}
										placeholder={"Senha"}
										type="password"
										name="password"
										error={touched.password && Boolean(errors.password)}
										className={classes.whiteField}
										helperText={touched.password && errors.password}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
								</div>
								<div className={classes.multFieldLine}>
									<Grid container direction="column">
										<Typography variant="subtitle1" >Administrador</Typography>
										<Field
											as={Select}
											name="isAdmin"
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
										<Typography variant="subtitle1" >Broker</Typography>
										<Field
											as={Select}
											name="isBroker"
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
										<Typography variant="subtitle1" >Staking</Typography>
										<Field
											as={Select}
											name="isStaking"
											className={classes.whiteField}
											variant="outlined"
											margin="dense"
											fullWidth
										>
											<MenuItem className={classes.menuItem} value={true}>Sim</MenuItem>
											<MenuItem className={classes.menuItem} value={false}>Não</MenuItem>
										</Field>
									</Grid>
								</div>
								<div className={classes.multFieldLine}>

									{/* 									
									{values.isAdmin === true && (
									<Grid container spacing={1} sx={{ marginTop: 2 }}>
										<FormControlLabel
										control={<Checkbox name="checkboxOption1"  checked={values.checkboxOption1} />}
										label="Vôlei"
										/>
										<FormControlLabel
										control={<Checkbox name="checkboxOption2"  checked={values.checkboxOption2} />}
										label="Dota"
										/>
										<FormControlLabel
										control={<Checkbox name="checkboxOption3" checked={values.checkboxOption3} />}
										label="Remates"
										/>
									</Grid>
									)} */}

								</div>
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