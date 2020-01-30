import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Login from './views/login'
import ConsultaAssociados from './views/associados/consulta-associados'
import {isAuthenticated} from './app/auth'

function PrivateRoutes ({component : Component, ...props}){
  return (
      <Route {...props} render={ (componentProps) => {
          if(isAuthenticated){
            return (
              <Component {...componentProps} />
            )
          }else{
            return (
              <Redirect to={{ pathname: "/*" }} />
            )
          
          }
        }
      } />
        
  )
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <PrivateRoutes  path="/consulta-associados" component={ConsultaAssociados}/>
                
    </Switch>
  </BrowserRouter>
);
export default Routes;
