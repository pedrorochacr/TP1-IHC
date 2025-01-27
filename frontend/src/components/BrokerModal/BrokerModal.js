import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import useBroker from "../../hooks/useBroker";
import AccountModal from "../AccountModal/AccountModal";
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
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BrokerModal({ userId, open, handleClose }) {
  const classes = useStyles();
  const { loading, searchAccounts } = useBroker();
  const theme = useTheme();
  const [accounts, setAccounts] = useState([]);
    const [openAccountModal, setOpenAccountModal] = useState(false);

    async function fetchAccounts() {
      // You can await here
      if(userId){
        const accounts = await searchAccounts(userId);
        console.log(accounts)
        setAccounts(accounts);
      }


    }
  useEffect(() => {

    fetchAccounts()

  }, [userId]);
  const handleCloseAccountModal = () =>{
    setOpenAccountModal(false);
  }
  const formatActitivityDate = (startDate, endDate) =>{
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };
  
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = endDate ? formatDate(endDate) : 'Atualmente';
  
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  return (
    <>
                   <AccountModal
                      userId={userId}
                      handleClose={handleCloseAccountModal}
                      open={openAccountModal}
                      fetchAccounts={fetchAccounts}
                    />
    <Dialog
      fullWidth={true}
      fullScreen 
      TransitionComponent={Transition}
      open={open}
      className={classes.modal}
      onClose={handleClose}
    >
      {loading ?
        (
          <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
          </Grid>

        ) : (
          <>
            <DialogTitle id="max-width-dialog-title" style={{ color: theme.palette.textPrimary }}>
              <Grid container justifyContent="space-between" alignContent="center" >
                <Typography>Contas registradas</Typography>
                <Button size="small" color="primary" variant="contained" 
                    onClick={()=>setOpenAccountModal(true)}
                >
                  Adicionar Conta
                  
                </Button>
              </Grid>


            </DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table" style={{ border: `1px solid ${theme.palette.textPrimary}` }}>
                  <TableHead>
                    <TableRow >
                      <TableCell style={{ color: theme.palette.textPrimary }}>Id</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Login</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Data Atividade</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Investimento Inicial</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Saldo</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Unidade</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Lucro da Conta</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Lucro do Cliente</TableCell>
                      <TableCell style={{ color: theme.palette.textPrimary }} align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id} >
                        <TableCell style={{ color: theme.palette.textPrimary }} component="th" scope="row">
                          {account.id}
                        </TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">{account.loginName}</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">{formatActitivityDate(account.startDate, account.endDate)}</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">{account.initialInvestment}</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">{account.balance}</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">{account.unit}</TableCell>
                        <TableCell style={{ color: account.initialInvestment - account.balance > 0 ? theme.palette.primary.main : "#fc0303" }} align="right">{account.initialInvestment - account.balance}</TableCell>
                        <TableCell style={{ color: account.initialInvestment - account.balance >0 ? theme.palette.primary.main : "#fc0303" }} align="right">{(account.initialInvestment - account.balance)/2}</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">
                          <Tooltip title="Deletar">
                          <IconButton size="small" color="inherit">
                            <DeleteOutlineIcon />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                          <IconButton size="small" color="inherit">
                            <EditIcon />
                          </IconButton>
                          </Tooltip>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="primary" size="small">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
    </Dialog>
    </>
  );

}