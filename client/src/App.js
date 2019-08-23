import React,{useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import {loadUser} from "./actions/index";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux"
import PrivateRoute from "./components/routing/PrivateRoute"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import TransactionsList from "./components/transactions/TransactionsList";



function App() {

  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login}></Route> 
          <Route exact path='/register' component={Register}></Route>  
          <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
          <PrivateRoute exact path="/transactions" component={TransactionsList}></PrivateRoute>
        </Switch>
      </Router> 
      </Provider>
    </div>
  );
}

export default App;
