
import { Grid, Typography, useTheme } from "@material-ui/core";
import React, { useState, useContext } from "react";


export default function CardData({title, data, icon}){
    const theme = useTheme();
    function verifyPercentExibition(title){
        switch(title){
            case "Lucro (%)":
                return true
            case "Taxa de acerto":
                return true
            case "ROI":
                return true
            default:
                return false
        }
    }
    return(
        <Grid container  spacing={6}>
            <Grid item xs={4} style={{marginTop:9}} >
            {icon}
            </Grid>
            
            <Grid item xs={8} container direction="column" justifyContent="center" alignItems="center">
                <Typography style={{fontWeight:400, color:theme.palette.textPrimary}} variant="subtitle1">{title}</Typography>
                <Typography style={{ color:theme.palette.textPrimary}} variant="h5" >{verifyPercentExibition(title) ? `${data}%`: data}</Typography>
            </Grid>
         
        </Grid>
        
    )
}