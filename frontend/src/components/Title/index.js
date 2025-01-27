import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core";

export default function Title(props) {

	const theme = useTheme();
	return (
		<Typography variant="h5" style={{color:theme.palette.textPrimary}} gutterBottom>
			{props.children}
		</Typography>
	);
}
