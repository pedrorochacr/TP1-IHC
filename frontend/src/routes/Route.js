import React, { useContext, useEffect } from "react";
import { Route as RouterRoute, Redirect } from "react-router-dom";

import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";

const Route = ({ component: Component, isPrivate = false, ...rest }) => {
    const { isAuth, loading } = useContext(AuthContext);

   
    // Exibe o carregamento enquanto a autenticação está em progresso
  

        // Redireciona para o login se não autenticado e a rota é privada
    if (!isAuth && isPrivate) {
        return(
            <>
                {loading && <BackdropLoading />}
                <Redirect to={{ pathname: `/login`, state: { from: rest.location } }} />
            </>
        )
            
    }
    // Redireciona para a página principal se autenticado e a rota não é privada
    if (isAuth && !isPrivate) {
        return(
            <>
                        {loading && <BackdropLoading />}
                        <Redirect to={{ pathname: `/`, state: { from: rest.location } }} />;
            </>
        )

    }



    // Renderiza a rota normalmente
    return (
        <>
        {loading && <BackdropLoading />}
        <RouterRoute {...rest} component={Component} />
        </>
    );
};

export default Route;
