/* eslint-disable */
import React,{ FunctionComponent, useState } from 'react';
import Navbar from './components/navbar'
import Footer from './components/footer'
import UserList from './pages/user-list'
import UserDetail from './pages/user-detail'
import Begin_loader from './pages/begin_loader'
import Home from './pages/home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PageNotFound from './pages/page-not-found'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: FunctionComponent = () => {
    const login = (email:String, password:String) => {
      //alert("SEND")
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
            toast.success("Vous êtes connécté :)");
        })
        .catch(function (error) {
              // console.log(error.response.data);
              // console.log(error.response.status);
              console.log(error);
            toast.error("Identifiant incorrect ! On t'a reconnu Marc !");
          });
    }
    const logout = () => {
        axios.post('/logout')
        .then(res => {
          setIsLogged(false);
            console.log(res);
            console.log(res.data);
            toast.success("Vous êtes bien déconnécté :)");
        })
        .catch(function (error) {
              // console.log(error.response.data);
              // console.log(error.response.status);
              console.log(error);
            toast.error("Problème de déconnexion");
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
        alert("SUCCESS_signup");
        axios.post('/validate/' + res.data.validation_id,
      )
      .then(res => {
        console.log(res);
        alert("SUCCESS_validate");
      })
      .catch(function (error) {
            console.log(error);
            alert("ERROR_validate");
        });
      })
      .catch(function (error) {
            console.log(error);
            alert("ERROR_signup");
        });
  }

    const [IsLogged, setIsLogged] = useState<Boolean>(false);
    const [IsLoad, setIsLoad] = useState<Boolean>(false);

      axios.get('/profile')
      .then(res => {
        setIsLogged(true);
        setIsLoad(true);
      })
      .catch(function (error) {
        setIsLoad(true);
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
          {IsLogged && <Navbar logout={logout} />}
          {IsLoad &&
            <div>
                <Switch>
                    <Route exact path="/" component={() => !IsLogged&&<Home login={login} signup={signup}/>||<UserList/>}/>
                    <Route exact path="/users" component={() => IsLogged && <UserList/> || <Home login={login} signup={signup}/>}/>
                    <Route path="/users/:id" component={() => IsLogged && <UserDetail user_id={""}/> || <Home login={login} signup={signup}/> }/>
                    <Route component={PageNotFound}/>
                </Switch>
                <Footer/>
            </div>
            ||
            <Begin_loader />
          }
        </Router>
    )
}

export default App;
//https://www.udemy.com/course/reactjs-tutorial-francais-authentication-api-rest-autocomplete-router/learn/lecture/17374676#overview