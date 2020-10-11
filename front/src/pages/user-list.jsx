/* eslint-disable */
import React, { FunctionComponent, useState, useEffect } from "react";
import User from "../models/user";
//import USER_LIST from '../models/mock-user';
import UserCard from "../components/user-card";
import getGenderColor from "../helpers/get-gender-color";

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
  }, []);

  return (
    <div className="container">
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
                <a className="nav-link active" href="#">Vue globales</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Ça va matché ! </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Carte</a>
              </li>
            </ul> 
            <br/>
              <div className="row">
                {users && users.map((user) => (
                      <UserCard user={user} key={user.id} borderColorHover={getGenderColor(user.sex)}/>
                    )
                  )  || <div>No UsEr !</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
