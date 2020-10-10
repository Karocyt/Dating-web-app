import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from '../models/user';
import axios from 'axios';


const MyProfile: FunctionComponent = () => {
    
  const [user, setUser] = useState<User[]|[]>([]);

  useEffect(() => {
    axios.get('/profile')
    .then(res => {
        setUser(Array(res.data));
        console.log(res)
        alert("sucess_get_users");
      //setIsLogged(true);
      //setIsLoad(true);
    })
    .catch(function (error) {
        console.log(error)
        alert("error_get_users");
      //setIsLoad(true);
    })

}, [])

  return (
    <div>
      { user[0] ? (
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
                        <td>Modify</td> 
                        <i className="fa fa-cog"> </i>
                      </tr>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ user[0].first_name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Age</td> 
                        <td><strong>{ user[0].age }</strong></td> 
                      </tr>
                      <tr> 
                        <td>id</td> 
                        <td><strong>{ user[0].id }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Last seens</td> 
                        <td><strong>{ user[0].last_seens }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Pictures[0]</td> 
                        <td><strong>{ user[0].pictures[0] }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Sex</td> 
                        <td><strong>{ user[0].sex }</strong></td> 
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
                <div className="card-action">
                  <Link to="/users">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">Aucun utilisateur à afficher !</h4>
      )}
    </div>
  );
}
  
export default MyProfile;