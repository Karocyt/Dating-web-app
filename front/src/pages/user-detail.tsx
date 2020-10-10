import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import User from '../models/user';
//import USERS from '../models/mock-user';
import formatDate from '../helpers/format-date';
  
type Props = { user_id: string };
  

const UsersDetail: FunctionComponent<Props> = ({user_id}) => {
    
  const [user, setUser] = useState<User|null>(null);
    
  return (
    <div>
      { user ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ user.first_name }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={user.pictures[0]} alt={user.first_name} style={{width: '250px', margin: '0 auto'}}/>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ user.first_name }</strong></td> 
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
  
export default UsersDetail;