import React, { Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
//import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Components
import Landing from './components/Landing.component';
import LoginPatient from './components/auth/LoginPatient.component';
import RegisterPatient from './components/auth/RegisterPatient.component';
import LoginProvider from './components/auth/LoginProvider.component';
import RegisterProvider from './components/auth/RegisterProvider.component';
import Navbar from './components/Nbar.component';
import CreateSymptom from './components/Create-patient-symptom.component';
import PatientProfile from './components/PatientProfile.component';
import WelcomeProvider from './components/WelcomeProvider.component';
import PatientSearch from './components/PatientSearch.component';
import PatientAlertList from './components/PatientAlertList.component';
import PatientImmediateAttList from './components/PatientImmediateAttList.component';

// check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='mainBody'>
          <div className='container'>
            <br />
            <Route exact path='/'>
              <Landing />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/patient/login'>
              <LoginPatient />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/patient/register'>
              <RegisterPatient />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/provider/login'>
              <LoginProvider />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/provider/register'>
              <RegisterProvider />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/patient/login/:id'>
              <Navbar />
              <CreateSymptom />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/patient/:id/profile'>
              <Navbar />
              <PatientProfile />
            </Route>
          </div>
          <div className='container'>
            <Route exact path='/provider/login/:id'>
              <Navbar />
              <WelcomeProvider />
              <PatientSearch />
              <PatientAlertList />
              <PatientImmediateAttList />
            </Route>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
export default App;
