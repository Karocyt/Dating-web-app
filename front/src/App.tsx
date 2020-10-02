/* eslint-disable */
import React,{ FunctionComponent, useState } from 'react';
import Navbar from './components/navbar'
import Footer from './components/footer'
import UserList from './pages/user-list'
import UserDetail from './pages/user-detail'
import Home from './pages/home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import PageNotFound from './pages/page-not-found'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FunctionComponent = () => {
    const login = (email:String, password:String) => {
        axios.post('/login',
          {
            'email':email,
            'password':password,
            "remember_me": false
          }
        )
        //axios.get('/debug')
        .then(res => {

        setIsLogged(true);
            //alert('123');
            console.log(res);
            console.log(res.data);
            toast("Vous êtes connécté :)");
        })
        .catch(function (error) {
              // console.log(error.response.data);
              // console.log(error.response.status);
              console.log(error);
            toast.error("Identifiant incorrect ! On t'a reconnu Marc !");
          });
    }
    const signup = (email:String, password:String, firstname:String, lastname:String) => {
      //axios.post('http://app:5000/login', { 'email':'gdssgs', 'password':'sgsssg' })
      axios.post('/signup',
        {
           'email':email,
           //'username':username,
           "password":password,
           "first_name":firstname,
           "last_name":lastname 
        }
      )
      .then(res => {
        console.log(res);
        alert("SUCCESS");
      })
      .catch(function (error) {
            console.log(error);
            alert("ERROR");
        });
  }

    const [IsLogged, setIsLogged] = useState<Boolean>(false);
      axios.post('/logout')
      .then(res => {
        console.log(res);
        alert("SUCCESS");
      })
      .catch(function (error) {
            console.log(error);
            alert("ERROR");
        });
    return (
        <Router>
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
                {IsLogged&&<Navbar />}
                <Switch>
                    <Route exact path="/" component={() => !IsLogged&&<Home login={login} signup={signup}/>||<UserList/>}/>
                    <Route exact path="/users" component={IsLogged&&UserList||Home}/>
                    <Route path="/users/:id" component={IsLogged&&UserDetail||Home}/>
                    <Route component={PageNotFound}/>
                </Switch>
                <Footer/>
                
        </Router>
    )
}

export default App;
//https://www.udemy.com/course/reactjs-tutorial-francais-authentication-api-rest-autocomplete-router/learn/lecture/17374676#overview