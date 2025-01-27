import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from "@material-ui/core";

import Pagination from '@material-ui/lab/Pagination';
import { DeleteOutlineOutlined } from "@material-ui/icons";
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

export default function BetsTable({ data, open, handleClose, isAdmin = false, handleOpenBetModal }) {
    const classes = useStyles();
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const rowsPerPage = 9;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleRows = data.slice(startIndex, endIndex);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table" style={{ border: `1px solid ${theme.palette.textPrimary}` }}>
                <TableHead>
                    <TableRow >
                        <TableCell style={{ color: theme.palette.textPrimary }}>Id</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">Esporte</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">Odd</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">Lucro</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">Tipo</TableCell>
                        <TableCell style={{ color: theme.palette.textPrimary }} align="right">Resultado</TableCell>
                        {isAdmin && <TableCell style={{ color: theme.palette.textPrimary }} align="right">Ações</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell style={{ color: theme.palette.textPrimary }} component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell style={{ color: theme.palette.textPrimary }} align="right">{row.sportName}</TableCell>
                            <TableCell style={{ color: theme.palette.textPrimary }} align="right">{row.odd}</TableCell>
                            <TableCell style={{ color: theme.palette.textPrimary }} align="right">{(row.profit / 10).toFixed(2)}</TableCell>
                            <TableCell style={{ color: theme.palette.textPrimary }} align="right">{row.type}</TableCell>
                            <TableCell style={{ color: row.win ? theme.palette.primary.main : "#fc0303" }} align="right">{row.win ? "Ganho" : "Perca"}</TableCell>
                            {isAdmin && (
                                <TableCell align="right">
                                    <Tooltip title="Excluir Bet">
                                        <IconButton size="small" style={{ color: theme.palette.danger }} onClick={()=>handleOpenBetModal(row.id)} >
                                            <DeleteOutlineOutlined />
                                        </IconButton>
                                    </Tooltip>


                                </TableCell>
                            )}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                className={classes.pagePagination}
                count={Math.ceil(data.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
            />
        </TableContainer>
    );

}