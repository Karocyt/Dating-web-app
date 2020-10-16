import React, { FunctionComponent, useState, useEffect } from 'react';
import User from '../models/user';

//import formatDate from '../helpers/format-date'

import { useHistory } from 'react-router-dom'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import axios from 'axios';
import { useRouteMatch } from "react-router-dom";
  

const UsersDetail = ({like_management}) => {

  let match = useRouteMatch("/users/:id");
  const history = useHistory()


  const [user, setUser] = useState([]);

  useEffect(() => {
    setMy_profile_loader(true)
    axios.get(`/users/${match.params.id}`)
    .then(res => {
        setUser(Array(res.data));
    })
    .catch(function (error) {
        console.log(error)
        alert("error_get_users");
      //setIsLoad(true);
    })
    setMy_profile_loader(false);

}, [])


const [my_profile_loader, setMy_profile_loader] = useState(true);

  return (
    <div>
      { user[0] && !my_profile_loader ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ user[0].first_name }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={user[0].pictures[0]} alt={user[0].first_name} style={{width: '250px', margin: '0 auto'}}/>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td><i className="far fa-heart"> </i></td> 
                        <td><i onClick={() => like_management(match.params.id)} className="fa fa-heart"> </i></td> 
                      </tr>
                      <tr> 
                        <td>Prénom</td> 
                        <td>{user[0].first_name}</td> 
                      </tr>
                      <tr> 
                        <td>Nom</td> 
                        <td>{user[0].last_name}</td> 
                      </tr>
                      <tr> 
                        <td>Age</td> 
                        <td>{user[0].age}</td> 
                      </tr>
                      <tr> 
                        <td>Last seens</td> 
                        <td><strong>{ user[0].last_seen }</strong></td>
                      </tr>
                      <tr> 
                        <td>Pictures[0]</td> 
                        <td><strong>{ user[0].pictures[0] }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Sex</td> 
                        <td>{user[0].sex}</td> 
                      </tr>
                      <tr> 
                        <td>Bio</td> 
                        <td>{user[0].bio}</td>
                      </tr>
                      {/*
                      <tr> 
                        <td>Points de vie</td> 
                        <td><strong>{ user.hp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Dégâts</td> 
                        <td><strong>{ user.cp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {user.types.map(type => (
                           <span key={type} className="badge badge-pill badge-secondary">{type}</span>
                          ))}</td> 
                          </tr> */}
                      <tr> 
                        <td>Date de création</td> 
                        <td>{/*formatDate(user.created)*/}</td> 
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button type="button" onClick={() => history.push('/users')} className="btn btn-danger">Retour</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div style={{lineHeight: "400px", height: "600px", textAlign: "center"}}>
        <Loader type="Hearts" color="red" height={200} width={200} />
        <p style={{position: "absolute", textAlign: "center", top: "150px", marginLeft: "auto", marginRight: "auto", left: "0", right: "0"}}>Chargement En cours ...</p>
      </div>
      )}
    </div>
  );
}
  
export default UsersDetail;