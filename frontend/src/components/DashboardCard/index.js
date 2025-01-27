import { Card, CardContent, CardHeader, Divider, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useState, useContext } from "react";
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CasinoIcon from '@material-ui/icons/Casino';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
import MoneyIcon from '@material-ui/icons/Money';
import CardData from "../CardData";
const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: 20,
        borderColor: "#32383e",
        minWidth: 275,
        background: "#121517"
    },
    cardIcon: {
        background: "#001100",
        borderRadius: "50%",
        width: 50,
        height: 50,
        padding: 7,
        color: "#33ee12"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function DashboardCard({ stakingData }) {
    const classes = useStyles();
    console.log("stakingData ", stakingData)
    return (
        <Card className={classes.root} variant="outlined" >


            <CardContent >
                <Grid container justifyContent="space-between">
                    <Grid item  >
                        <CardData icon={<MoneyIcon fontSize="large" className={classes.cardIcon} />} title={"Lucro (%)"} data={stakingData.percentProfit} />

                    </Grid>
                    <Divider style={{ background: "#32383e" }} orientation="vertical" flexItem />
                    <Grid item  >
                        <CardData icon={<AttachMoneyIcon fontSize="large" className={classes.cardIcon} />} title={"Lucro (R$)"} data={stakingData.profit} />

                    </Grid>
                    <Divider style={{ background: "#32383e" }} orientation="vertical" flexItem />
                    <Grid item  >
                        <CardData icon={<BusinessCenterIcon fontSize="large" className={classes.cardIcon} />} title={"ROI"} data={stakingData.roi} />

                    </Grid>
                    <Divider style={{ background: "#32383e" }} orientation="vertical" flexItem />
                    <Grid item  >
                        <CardData icon={<CasinoIcon fontSize="large" className={classes.cardIcon} />} title={"Taxa de acerto"} data={stakingData.winRate} />

                    </Grid>
                    <Divider style={{ background: "#32383e" }} orientation="vertical" flexItem />

                    <Grid item  >
                        <CardData icon={<SettingsEthernetOutlinedIcon fontSize="large" className={classes.cardIcon} />} title={"Bets"} data={stakingData.count} />

                    </Grid>


                </Grid>
            </CardContent>

        </Card>
    )
}