import React, {createContext, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer'; 

import Login from './Screens/Login';
import CreateRequest from './Screens/CreateRequest';
import Dashboard from './Screens/Dashboard';
import AddressAdmit from './Screens/AddressAdmit';
import MyRequests from './Screens/MyRequests';
import RequestHistory from './Screens/RequestHistory';
import Timeline from './Screens/Timeline';
import Request from './Screens/Request';
import VerifyAddress from './Screens/VerifyAddress';
//import { send } from './utils/Push';
// send("Push Notifications", "Push notification successfully sent to the browser! Check it out!")

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/home' exact component={Dashboard} />
        <Route path='/login' exact component={Login} />
        <Route path='/createRequest' exact component={CreateRequest} />
        <Route path='/addressAdmit' exact component={AddressAdmit} />
        <Route path='/MyRequests' exact component={MyRequests} />
        <Route path='/history' exact component={RequestHistory} />
        <Route path='/queryTimeline' exact component={Timeline} />
        <Route path='/request' exact component={Request} />
        <Route path='/verifyAddress' exact component={VerifyAddress} />

      </Switch>
      </Router>
      <br/>
      <Footer></Footer>
    </div>
  );
}

export default App;
