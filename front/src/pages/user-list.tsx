/* eslint-disable */
import React,{ FunctionComponent, useState, useEffect } from 'react';
import User from '../models/user';
import USER_LIST from '../models/mock-user';
import UserCard from '../components/user-card'
import getGenderColor from '../helpers/get-gender-color'


const UserList: FunctionComponent = () => {
    const [users, setUSers] = useState<User[]>([]);

    useEffect(() => {
        setUSers(USER_LIST);
    },[])//Le [] veut dire que l on execute setUSers seulement si users vaut [] (la premiere fois seulement quoi ^^)

    return (

        <div className="container">

        <div className="row">
    
          <div className="col-lg-3" style={{top:"50px"}}>
    
            <div className="list-group" style={{paddingBottom:"15px"}}>
    
              <div className="card">
    
                <div className="card-body">
                    <div id="menulinks" className="nav nav-pills">
                        <a style={{width: "100%"}} className="nav-link "><i className="fa fa-home" aria-hidden="true"></i> Age min: 18</a>
                        <div className="row">
                            <div className="col-4">
                                18
                            </div>
                            <div className="col-4">
                                <input type="range" min="18" max="100" className="custom-range"></input>
                            </div>
                            <div className="col-4">
                                99
                            </div>
                        </div>
                        <a style={{width: "100%"}} className="nav-link "><i className="fa fa-line-chart" aria-hidden="true"></i> Age max: 99</a>
                        <div className="row">
                            <div className="col-4">
                                18
                            </div>
                            <div className="col-4">
                                <input type="range" min="18" max="100" className="custom-range"></input>
                            </div>
                            <div className="col-4">
                                99
                            </div>
                        </div>
                        <a style={{width: "100%"}} className="nav-link "><i className="fa fa-suitcase" aria-hidden="true"></i> Popularité min</a>
                        
                        <div className="row">
                            <div className="col-4">
                                0
                            </div>
                            <div className="col-4">
                                <input type="range" min="18" max="100" className="custom-range"></input>
                            </div>
                            <div className="col-4">
                                100
                            </div>
                        </div>
                        <a style={{width: "100%"}} className="nav-link "><i className="fa fa-sign-out" aria-hidden="true"></i> Popularité max</a>
                        
                        <div className="row">
                            <div className="col-4">
                                0
                            </div>
                            <div className="col-4">
                                <input type="range" min="18" max="100" className="custom-range"></input>
                            </div>
                            <div className="col-4">
                                100
                            </div>
                        </div>
                  </div>
    
                </div>
    
              </div>
    
            </div>
    
          </div>
    
          <div id="conteudo" className="col-lg-9"  style={{top:"50px"}}>
    
            <div className="card">
    
              <div className="card-body">
              <div className="row">
                        {users && users.map((user) => (
                            <UserCard user={user} key={user.id} borderColorHover={getGenderColor(user.gender)}/>
                        ))}
                        </div>
              </div>
    
            </div>
    
          </div>
    
        </div>
    
      </div>
    )
}

export default UserList;