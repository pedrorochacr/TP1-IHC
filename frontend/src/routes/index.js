import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/Auth/AuthContext"; // Certifique-se de importar o AuthProvider
import Route from "./Route"; // Importando o Route personalizado
import LoggedInLayout from "../layout"; // Layout para rotas privadas
import Login from "../pages/Login";

import InitialPage from "../pages/initialPage";
import Registration from "../pages/cadastro";
import Dashboard from "../pages/dashboard";
import Locais from "../pages/locais";
import Eventos from "../pages/eventos";
import Estatistica from "../pages/estatistica";
import Perfil from "../pages/perfil";
import Denuncias from "../pages/denuncias";
import ForgotPassword from "../pages/esqueci-minha-senha/ForgotPassword";
import HelpPage from "../pages/help";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path={"/inicial"} component={InitialPage} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/cadastro"} component={Registration} />
          <Route exact path={"/esqueci-minha-senha"} component={ForgotPassword} />
          <LoggedInLayout>
            <Route exact path={"/bem-vindo"} component={Dashboard} />
            <Route exact path={"/locais"} component={Locais} />
            <Route exact path={"/eventos"} component={Eventos} />
            <Route exact path={"/estatistica"} component={Estatistica} />
            <Route exact path={"/perfil"} component={Perfil}  />
            <Route exact path={"/denuncias"} component={Denuncias} />
            <Route exact path={"/help"} component={HelpPage} />
          </LoggedInLayout>
        </Switch>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
