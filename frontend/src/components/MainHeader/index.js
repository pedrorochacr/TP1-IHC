import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	header: {
		display: "flex",
		alignItems: "center",
		padding: 15,
	},
}));

const MainHeader = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.header}>{children}</div>;
};

export default MainHeader;
