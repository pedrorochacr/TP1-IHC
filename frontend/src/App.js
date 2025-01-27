import React, { useState, useEffect, useContext } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {

    const [locale, setLocale] = useState();
    
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");
    
    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#e8e8e8",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
                },
            },
            typography: {
                fontFamily: [
                    'Inria Sans',
                ].join(','),
            },
            overrides: {
                // MuiButton: {
                //     contained: {
                //         color: 'white !important',
                       
                //     },
                // },
            },
            palette: {
                type: mode,
                primary: { main:  "#6924a6" },
                error: { main:"#f44336", contrastText: '#ffffff'},
                danger:"#f44336",
                background: "#ADAAAA",
                secondary:{ main: "#ADAAAA" },
                textPrimary:"#FFFFFF",
                borderPrimary: mode === "light" ?  "#369eff" : "#FFFFFF",
                dark: { main: mode === "light" ? "#001100" : "#001100" },
                leftBar: "#f5f5f5",
                fieldBackground: "#D9D9D9"

            },
            mode,
        },
        locale
    );
    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);


    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);

    return (
        <>
                    <ThemeProvider theme={theme}>
                        <QueryClientProvider client={queryClient}>
                            <Routes  />
                        </QueryClientProvider>
                    </ThemeProvider>
        </>
    );
}
export default App;
