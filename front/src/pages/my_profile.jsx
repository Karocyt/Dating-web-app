import React, { FunctionComponent, useState, useEffect } from 'react';
import User from '../models/user';

//import formatDate from '../helpers/format-date'

import { useHistory } from 'react-router-dom'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import axios from 'axios';


const MyProfile = ({send_picture}) => {
    

  const history = useHistory()


  const [user, setUser] = useState([]);

  useEffect(() => {
    setMy_profile_loader(true)
    axios.get('/profile')
    .then(res => {
        setUser(Array(res.data));
        setMy_profile_first_name(res.data.first_name);
        setMy_profile_last_name(res.data.last_name);
        setMy_profile_age(parseInt(res.data.age));
        setMy_profile_bio(res.data.bio);
        setMy_profile_sex(res.data.sex);
        console.log(res)
        //alert("sucess_get_users");
      //setIsLogged(true);
      //setIsLoad(true);
    })
    .catch(function (error) {
        console.log(error)
        alert("error_get_users");
      //setIsLoad(true);
    })
    setMy_profile_loader(false);

}, [])


const [my_profile_loader, setMy_profile_loader] = useState(true);

const [my_profile_first_name, setMy_profile_first_name] = useState("");
const [my_profile_last_name, setMy_profile_last_name] = useState("");
const [my_profile_age, setMy_profile_age] = useState(0);
const [my_profile_bio, setMy_profile_bio] = useState("");
const [my_profile_sex, setMy_profile_sex] = useState("");

  const send_modification = () => {
    setMy_profile_loader(true);
    axios.put("/profile",
    {
      'first_name':my_profile_first_name,
      'last_name':my_profile_last_name,
      "age": my_profile_age,
      "bio":my_profile_bio,
      "sex":my_profile_sex,
    })
    .then((res) => {
      setUser(Array(res.data));
      setMy_profile_first_name(res.data.first_name);
      setMy_profile_last_name(res.data.last_name);
      setMy_profile_age(parseInt(res.data.age));
      setMy_profile_bio(res.data.bio);
      setMy_profile_sex(res.data.sex);
      console.log(res)
    })
    .catch(function (error) {

    axios.get('/profile')
    .then(res => {
        setUser(Array(res.data));
        setMy_profile_first_name(res.data.first_name);
        setMy_profile_last_name(res.data.last_name);
        setMy_profile_age(parseInt(res.data.age));
        setMy_profile_bio(res.data.bio);
        setMy_profile_sex(res.data.sex);
        console.log(res)
        //alert("sucess_get_users");
      //setIsLogged(true);
      //setIsLoad(true);
    })
    .catch(function (error) {
        console.log(error)
        alert("error_get_users");
      //setIsLoad(true);
    })
    });
    setMy_profile_loader(false);
  }

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
                        <td>Ajouter une photo</td> 
                        <td>
                          <label htmlFor="myfile">Select a file:</label>
                          <input type="file" onChange={(e) => {console.log(e.target);alert(e.target.value);send_picture(e.target.files[0])}} id="myFile" name="myFile"/>
                          </td> 
                      </tr>
                      <tr> 
                        <td>Prénom</td> 
                        <td><input type="text" onChange={(e) => setMy_profile_first_name(e.target.value)} value={my_profile_first_name}></input></td> 
                      </tr>
                      <tr> 
                        <td>Nom</td> 
                        <td><input type="text" onChange={(e) => setMy_profile_last_name(e.target.value)} value={my_profile_last_name}></input></td> 
                      </tr>
                      <tr> 
                        <td>Age</td> 
                        <td><input type="number" onChange={(e) => setMy_profile_age(parseInt(e.target.value))} value={my_profile_age}></input></td> 
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
                        <td><input type="text" onChange={(e) => setMy_profile_sex(e.target.value)} value={my_profile_sex}></input></td> 
                      </tr>
                      <tr> 
                        <td>Bio</td> 
                        <td><textarea onChange={(e) => setMy_profile_bio(e.target.value)} value={my_profile_bio}></textarea></td>
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
                <button type="button" onClick={() => send_modification()} className="btn btn-success">Enregistrer</button>
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
  
export default MyProfile;