import React from 'react'
import './styles/bulma.scss';
import './styles/global.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/home';
import Status from './pages/Status';

import Localizacao from './pages/localizacao';
import LGPD from './pages/LGPD';

import About from './pages/About';
import Blog from './pages/Blog';
import VizualizarNoticia from './pages/VizualizarNoticia';


import Contato from './pages/Contato';

import Login from './pages/Login';
import ContaAdmin from './pages/painelAdmin/MinhaConta';
import ContaCliente from './pages/painelCliente/Minha Conta';

import Contratos from './pages/Contratos/';
import Romaneios from './pages/Romaneios/';

import MinhasNoticias from './pages/painelAdmin/MinhasNoticias';
import CadastroNoticia from './pages/painelAdmin/CadastroNoticia';
import AlterarNoticia from './pages/painelAdmin/AlterarNoticia';

import Cotacoes from './pages/Cotacoes';
import InfoPatio from './pages/InfoPatio';


import Cookies from 'js-cookie';
import api from './services/api';

function isAuthenticated() {
  var token = Cookies.get('token');
  console.log(typeof token)
  if (token === null || token === undefined || token === "undefined") {
    // This means that there's no JWT and no user is logged in.
    api.defaults.headers.common.Authorization = null;
    console.log("token invalido: ");
    return false;
  } else {
    // This means that there's a JWT so someone must be logged in.
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log("token valido: " + token);
    return true;

  }
};

function regra() {
 
    return Cookies.get('regra');;


};





const renderConta = () =>{
 let rule = regra();
  console.log("regra na funcao render: " + rule);

  if( isAuthenticated()  && rule === "ROLE_ADMIN" ){
     return <ContaAdmin  />
 }else if(isAuthenticated()  && rule === "ROLE_CLIENTE"){
  return <ContaCliente />
 }else{
  return <Login />

 }
}

const ContaRoute = ({...rest}) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
        renderConta() 
      )} />
  );
};




const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        isAuthenticated() && restricted ?
              <Redirect to="/minhaconta" />
          : <Component {...props} />
      )} />
  );
};


const PrivateAdminArmazemAutorizationRoute = ({component: Component, ...rest}) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
       (isAuthenticated() && (regra() === "ROLE_ADMIN" || regra() === "ROLE_CLIENTE")) ?
              <Component {...props} />
          : <Redirect to="/minhaconta" />
      )} />
  );
};







function App() {


  return (

    <BrowserRouter>

      <Switch>
      <PublicRoute restricted={false} component={Home} path="/" exact />
      <PublicRoute restricted={false} component={Localizacao} path="/localizacao" exact />
      <PublicRoute restricted={false} component={About} path="/sobre" exact />
      <PublicRoute restricted={false} component={Blog} path="/noticias/:categoria" exact />
      <PublicRoute restricted={false} component={Blog} path="/noticias/" exact />

      <PublicRoute restricted={false} component={Contato} path="/contato" exact />
      <PublicRoute restricted={false} component={LGPD} path="/lgpd" exact />
      <PublicRoute restricted={false} component={Cotacoes} path="/cotacoes" exact />
      <PublicRoute restricted={false} component={InfoPatio} path="/patio" exact />
      <PublicRoute restricted={false} component={Status} path="/status" exact />

      <PublicRoute restricted={false} component={VizualizarNoticia} path="/noticias/:dia/:mes/:ano/:titulo/:idNoticia" exact />

     
      <PublicRoute restricted={true} component={Login} path="/login" exact />
      <ContaRoute path="/minhaconta" exact />


      <PrivateAdminArmazemAutorizationRoute component={Contratos} path="/contratos/:tipo" exact />     
      <PrivateAdminArmazemAutorizationRoute component={Romaneios} path="/romaneios/" exact />     

      <PrivateAdminArmazemAutorizationRoute component={MinhasNoticias} path="/minhasnoticias/" exact />     
      <PrivateAdminArmazemAutorizationRoute component={CadastroNoticia} path="/cadastrarnoticia/" exact />     
      <PrivateAdminArmazemAutorizationRoute component={AlterarNoticia} path="/alterarnoticia/:idNoticia" exact />     


      </Switch>

    </BrowserRouter>

  );
}

export default App;
