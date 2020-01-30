import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './app/auth'
//import NavBar from './components/navbar'
const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/*", state: { from: props.location } }} />
        )
      }
    />
  );
  /*function Router(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </HashRouter>
      )
  
  }*/
  export default PrivateRouter;