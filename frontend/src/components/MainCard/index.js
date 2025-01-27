import React, { useState, useEffect, useContext } from "react";
import { forwardRef } from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// header style

const useStyles = makeStyles((theme) => ({
  headerSX:{
    padding: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
  }
 
}));
function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {
  const classes = useStyles();
  const theme = useTheme();
  boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      style={{
        border: border ? `1px solid ${theme.palette.textPrimary}` : 'none',
        borderRadius: 2,
        borderColor: theme.palette.cardBorder,
        boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
        ':hover': {
          boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      <CardHeader className={classes.headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
      {/* card content */}
      {content && <CardContent style={{contentSX}}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
}

export default forwardRef(MainCard);

