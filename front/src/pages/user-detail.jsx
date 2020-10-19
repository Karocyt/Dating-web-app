import React, { FunctionComponent, useState, useEffect } from "react";
import User from "../models/user";
//import formatDate from '../helpers/format-date'

import { useHistory } from "react-router-dom";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import axios from "axios";
import { useRouteMatch } from "react-router-dom";

const UsersDetail = ({ like_management }) => {
  let match = useRouteMatch("/users/:id");
  const history = useHistory();

  const [user, setUser] = useState([]);
  const [first_picture, setFirst_picture] = useState("");

  const get_user = () => {
    setMy_profile_loader(true);
    axios
      .get(`/users/${match.params.id}`)
      .then((res) => {
        setUser(Array(res.data));
        setFirst_picture(res.data.pictures[0]);
      })
      .catch(function (error) {
        console.log(error);
        alert("error_get_users");
        //setIsLoad(true);
      });
    setMy_profile_loader(false);
  };
  useEffect(() => {
    get_user();
  }, []);

  const [my_profile_loader, setMy_profile_loader] = useState(true);

  return (
    <div>
      {user[0] && !my_profile_loader ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center" style={{ textAlign: "center" }}>
              {user[0].first_name} {user[0].last_name ? user[0].last_name : ""}
            </h2>
            <div className="card">
              <div className="card-body">
                <div className="card-image">
                  <img
                    src={user[0].pictures[0]}
                    alt={user[0].pictures[0]}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50%",
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-4"> </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      {user[0].pictures.map(function (picture) {
                        return (
                          <div key={picture} className="p-2 flex-fill">
                            <img
                              onClick={() => {
                                setFirst_picture(picture);
                                alert(picture);
                              }}
                              src={picture}
                              alt={picture}
                              style={{ width: "150px" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-4"> </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-3" style={{ textAlign: "center" }}>
                    {(user[0].liked && (
                      <i
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          like_management(match.params.id, false);
                          get_user();
                        }}
                        className="fa fa-heart fa-2x"
                      >
                        {" "}
                      </i>
                    )) || (
                      <i
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          like_management(match.params.id, true);
                          get_user();
                        }}
                        className="far fa-heart fa-2x"
                      >
                        {" "}
                      </i>
                    )}
                  </div>
                  <div className="col-lg-3" style={{ textAlign: "center" }}>
                    <button type="button" className="btn btn-warning">
                      Report
                    </button>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card">
                      <h5
                        className="card-title"
                        style={{ textAlign: "center" }}
                      >
                        Infos
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6">
                            <p>Age</p>
                          </div>
                          <div className="col-lg-6">
                            <p>{user[0].age}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <p>Dernière connexion</p>
                          </div>
                          <div className="col-lg-6">
                            <strong>{user[0].last_seen}</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <p>Sex</p>
                          </div>
                          <div className="col-lg-6">
                            <p>{user[0].sex}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card">
                      <h5
                        className="card-title"
                        style={{ textAlign: "center" }}
                      >
                        Description
                      </h5>
                      <div className="card-body">
                        <p style={{ textAlign: "center" }}>{user[0].bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  type="button"
                  onClick={() => history.push("/users")}
                  className="btn btn-danger btn-block"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ lineHeight: "400px", height: "600px", textAlign: "center" }}
        >
          <Loader type="Hearts" color="red" height={200} width={200} />
          <p
            style={{
              position: "absolute",
              textAlign: "center",
              top: "150px",
              marginLeft: "auto",
              marginRight: "auto",
              left: "0",
              right: "0",
            }}
          >
            Chargement En cours ...
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersDetail;
