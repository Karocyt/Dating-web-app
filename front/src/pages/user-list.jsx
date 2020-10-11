/* eslint-disable */
import React, { FunctionComponent, useState, useEffect } from "react";
import User from "../models/user";
//import USER_LIST from '../models/mock-user';
import UserCard from "../components/user-card";
import getGenderColor from "../helpers/get-gender-color";

import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'

import axios from "axios";

const UserList = () => {
  const [users, setUSers] = useState([]);

  useEffect(() => {
    (async function () {
      axios
        .get("/users")
        .then((res) => {
          //console.log("SuCcEsS:");
          //console.log(res)
          setUSers(res.data.users);
        })
        .catch(function (error) {
          console.log(error);
          //alert("error_get_users");
        });
    })();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }, []);
  function getPosition(position) {
    setGeoloc_pos(Array(position.coords.latitude, position.coords.longitude))
  }


  //const [users, setUSers] = useState([]);
  useEffect(() => {
    (async function () {
      axios
        .get("/matches")
        .then((res) => {
          console.log("SuCcEsS:");
          console.log(res.data)
          alert("GeT MaTcHeS");
          //setUSers(res.data.users);
        })
        .catch(function (error) {
          console.log(error);
          //alert("error_get_users");
        });
    })();
  }, []);

  const [geoloc_pos, setGeoloc_pos] = useState([]);
  const [frame, setFrame] = useState(0);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3" style={{ top: "50px" }}>
          <div className="list-group" style={{ paddingBottom: "15px" }}>
            <div className="card">
              <div className="card-body">
                <div id="menulinks" className="nav nav-pills">
                  <a style={{ width: "100%" }} className="nav-link ">
                    <i className="fa fa-home" aria-hidden="true"></i> Age min:
                    18
                  </a>
                  <div className="row">
                    <div className="col-4">18</div>
                    <div className="col-4">
                      <input
                        type="range"
                        min="18"
                        max="100"
                        className="custom-range"
                      ></input>
                    </div>
                    <div className="col-4">99</div>
                  </div>
                  <a style={{ width: "100%" }} className="nav-link ">
                    <i className="fa fa-line-chart" aria-hidden="true"></i> Age
                    max: 99
                  </a>
                  <div className="row">
                    <div className="col-4">18</div>
                    <div className="col-4">
                      <input
                        type="range"
                        min="18"
                        max="100"
                        className="custom-range"
                      ></input>
                    </div>
                    <div className="col-4">99</div>
                  </div>
                  <a style={{ width: "100%" }} className="nav-link ">
                    <i className="fa fa-suitcase" aria-hidden="true"></i>{" "}
                    Popularité min
                  </a>

                  <div className="row">
                    <div className="col-4">0</div>
                    <div className="col-4">
                      <input
                        type="range"
                        min="18"
                        max="100"
                        className="custom-range"
                      ></input>
                    </div>
                    <div className="col-4">100</div>
                  </div>
                  <a style={{ width: "100%" }} className="nav-link ">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                    Popularité max
                  </a>

                  <div className="row">
                    <div className="col-4">0</div>
                    <div className="col-4">
                      <input
                        type="range"
                        min="18"
                        max="100"
                        className="custom-range"
                      ></input>
                    </div>
                    <div className="col-4">100</div>
                  </div>

                <button type="button" onClick={() => {}} className="btn btn-success">Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9" style={{ top: "50px" }}>
          <div className="card">
            <div className="card-body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={frame == 0 ? "nav-link active" : "nav-link"} style={{cursor: "pointer"}} onClick={() => setFrame(0)}>Vue globales</a>
              </li>
              <li className="nav-item">
                <a className={frame == 1 ? "nav-link active" : "nav-link"} style={{cursor: "pointer"}} onClick={() => setFrame(1)}>Ça va matché ! </a>
              </li>
              <li className="nav-item">
                <a className={frame == 2 ? "nav-link active" : "nav-link"} style={{cursor: "pointer"}} onClick={() => setFrame(2)} >Carte</a>
              </li>
            </ul> 
            <br/>
            {
              frame == 0 ?
              <div className="row">
                {users && users.map((user) => (
                      <UserCard user={user} key={user.id} borderColorHover={getGenderColor(user.sex)}/>
                    )
                  )  || <div>No UsEr !</div>
                }
              </div>
              : frame == 1 ?
              <div>
                Match
              </div>
              :
                <Map center={geoloc_pos} zoom={12} width={600} height={400}>
                <Marker anchor={geoloc_pos} payload={1} onClick={({ event, anchor, payload }) => {}} />
            
                <Overlay anchor={geoloc_pos} offset={[120, 79]}>
                  <img src='https://cdn.intra.42.fr/users/medium_pcachin.jpg' width={24} height={15} alt='' />
                </Overlay>
              </Map>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
