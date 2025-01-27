import React, { useState, useEffect, useContext } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormControlLabel, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Slide, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tooltip, Typography, useTheme } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import useBroker from "../../hooks/useBroker";
import AccountModal from "../AccountModal/AccountModal";
import useStaking from "../../hooks/useStaking";
import BetsTable from "../BetsTable";
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DashboardCard from "../../components/DashboardCard";
import ColumnChart from "../../components/ColumnChart";
import PieChart from "../../components/PieChart";
import ArchiveIcon from '@material-ui/icons/Archive';
import BetsModal from "../../components/BetsModal";
import { AuthContext } from "../../context/Auth/AuthContext";
import UserBetModal from "../UserBetModal";
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        borderRadius: 4,
        background: theme.palette.primary.main
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

    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    menuItem: {
        backgroundColor: `${theme.palette.primary.main} !important`,

        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: "#279114"
        }
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const sports = [
    {
        name: "Todos",
        id: 0,
        icon: <SettingsEthernetOutlinedIcon />

    },
    {
        name: "Dota",
        id: 1,
        icon: <SportsEsportsIcon />
    },
    {
        name: "Vôlei",
        id: 2,
        icon: <SportsVolleyballIcon />

    },
    {
        name: "Remates",
        id: 3,
        icon: <SportsSoccerIcon />

    },
]
const getDaysDifference = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Diferença em milissegundos
    const diffInMilliseconds = today - firstDayOfMonth;
    // Converter para dias
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
};

export default function StakingModal({ open, handleClose }) {
    const classes = useStyles();
    const { search, findExtraBets } = useStaking();
    const {user} = useContext(AuthContext);
    const theme = useTheme();
    const [stakingData, setStakingData] = useState([]);
    const [extraBets, setExtraBets] = useState([])
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedSportId, setSelectedSportId] = useState(0);
    const [dateRange, setDateRange] = useState(getDaysDifference());
    const [openBetsModal, setOpenBetsModal] = useState(false);
    const [selectedBetId, setSelectedBetId] = useState(null);
    const getExtraBets = async () => {
      
        const apiResponse = await findExtraBets(user.id);
        console.log("apiResponseEx",apiResponse)
        setExtraBets(apiResponse);
    }
    const getBets = async () => {
        const filter = {
            startDate: new Date(new Date().setDate(new Date().getDate() - (dateRange - 1))).toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            sportName: formatSportName(selectedSportId)
        }
        const apiResponse = await search(user.id,filter);
        console.log(apiResponse)
        setStakingData(apiResponse);
    }
    const getStakingData = async () => {
        await getBets();
        await getExtraBets();
    }
    useEffect(() => {
        setLoading(true);
        getStakingData();
   
        
    }, [selectedSportId, dateRange]);

    useEffect(() => {
        if (stakingData && extraBets) {
            setLoading(false);
        }

    }, [stakingData, extraBets]);

    const handleCloseBetModal= () =>{
        setSelectedBetId(null);
        setOpenBetsModal(false)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenBetDeleteModal = (betId) => {
        setSelectedBetId(betId)
        setOpenBetsModal(true);
    };
    const formatSportName = (sportId) =>{
        const selectedSport =  sports.find(sport => sport.id ==sportId)
        if(selectedSport.id == 2){
            return "volei"
        } else{
            return selectedSport.name.toLowerCase()
        }
        
    }

    return (
        <>
            <UserBetModal
                open={openBetsModal}
                userId={user.id}
                fetchStakingData={getStakingData}
                handleClose={handleCloseBetModal}
                betId={selectedBetId}
            />
            <Dialog
                fullWidth={true}
                fullScreen
                TransitionComponent={Transition}
                open={open}
                className={classes.modal}
                onClose={handleClose}
            >
                        <>
                            <DialogTitle id="max-width-dialog-title" style={{ color: theme.palette.textPrimary }}>
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"

                                    centered
                                    onChange={handleChange}

                                >
                                    <Tab label="Bets Extras" />
                                    <Tab label="Bets Registradas" />
                                </Tabs>
                                {value == 0 && (
                                    <Grid container justifyContent="flex-end" alignContent="flex-end"  >
                                        <Button size="small" color="primary" variant="contained"
                                            onClick={() => setOpenBetsModal(true)}
                                        >
                                            Adicionar Bet

                                        </Button>
                                    </Grid>
                                )}
                                                                {value == 1 && (
                                    <Grid style={{marginTop: 15}}>
                                        <Grid container justifyContent="center" alignItems="center" style={{ gap: 17, borderRadius: 4 }}>
                                            <FormControl size="small" variant="outlined" className={classes.formControl}>

                                                <Select
                                                    className={classes.select}
                                                    value={dateRange}
                                                    onChange={(e) => setDateRange(e.target.value)}

                                                >
                                                    <MenuItem className={classes.menuItem} value={getDaysDifference()}>
                                                        <Typography>MÊS ATUAL</Typography>
                                                    </MenuItem>
                                                    <MenuItem className={classes.menuItem} value={15}>
                                                        <Typography>ÚLTIMOS 15 DIAS</Typography>
                                                    </MenuItem>
                                                    <MenuItem className={classes.menuItem} value={7}>
                                                        <Typography>ÚLTIMA SEMANA</Typography>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl size="small" variant="outlined" className={classes.formControl}>

                                                <Select

                                                    className={classes.select}
                                                    value={selectedSportId}
                                                    onChange={(e) => setSelectedSportId(e.target.value)}

                                                >
                                                    {sports.map((sport) => (
                                                        <MenuItem key={sport.id} value={sport.id} className={classes.menuItem} disableGutters={true}>

                                                            <Grid container alignItems="center" justifyContent="center" style={{ gap: 9 }}>
                                                                <Typography>{sport.name.toUpperCase()}</Typography>
                                                                {sport.icon}

                                                            </Grid>

                                                        </MenuItem>

                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </Grid>

                                        
                                    </Grid>

                                )}

                            </DialogTitle>
                            <DialogContent>
                                {value == 0 && (
                                        <BetsTable
                                            isAdmin={false}
                                            data={extraBets} 
                                        />   
                                )}
                                {value == 1 && (
                                 loading ?
                                    (
                                        <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                                            <CircularProgress color="primary" />
                                        </Grid>
                                    ) : (
                                        <BetsTable
                                            isAdmin={true}
                                            data={stakingData.bets} 
                                            handleOpenBetModal={handleOpenBetDeleteModal}
                                            
                                            />   
                                            
                                        )                                 
                                )}

                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={handleClose} color="primary" size="small">
                                    Fechar
                                </Button>
                            </DialogActions>
                        </>
            </Dialog>
        </>
    );

}