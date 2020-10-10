/* eslint-disable */
import React, { FunctionComponent, useState, useEffect } from "react";
import User from "../models/user";
//import USER_LIST from '../models/mock-user';
import UserCard from "../components/user-card";
import getGenderColor from "../helpers/get-gender-color";

import axios from "axios";

const UserList: FunctionComponent = () => {
  const [users, setUSers] = useState<User[]>([]);

  useEffect(() => {
    (async function () {
      axios
        .get("/users")
        .then((res) => {
          //console.log("SuCcEsS:");
          //console.log(res)
          setUSers(res.data);
          //alert("sucess_get_users");
        })
        .catch(function (error) {
          console.log(error);
          //alert("error_get_users");
        });
    })();
  }, []);
  /*
    function get_users()
    {
        var ret = new Array();
        axios.get('/users')
        .then(res => {
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
        return ret;
    }
    */
  /*
    useEffect(() => {
        //setUSers(USER_LIST);
        setUSers(get_users())
    },[])*/
  //Le [] veut dire que l on execute setUSers seulement si users vaut [] (la premiere fois seulement quoi ^^)

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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9" style={{ top: "50px" }}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/*users && users.map((user: User) => (
                        <UserCard user={user} key={user.id} borderColorHover={getGenderColor(user.sex)}/>
                    ))*/}
                {users && users[0] && (
                  <UserCard
                    user={users[0]}
                    key={users[0].id}
                    borderColorHover={getGenderColor(users[0].sex)}
                  />
                )}
                {(users && users[0] && (
                  <div>FIRST USER IS : {users[0].first_name}</div>
                )) || <div>No UsEr !</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
