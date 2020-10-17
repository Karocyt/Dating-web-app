import React, { FunctionComponent, useState, useEffect } from 'react';
import User from '../models/user';

//import formatDate from '../helpers/format-date'

import { useHistory } from 'react-router-dom'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import axios from 'axios';


const Mailbox = () => {
    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3" style={{ top: "50px" }}>
          <div className="list-group" style={{ paddingBottom: "15px" }}>
            <div className="card">
              <div className="card-body">
                  User list
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                  User list
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                  User list
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9" style={{ top: "50px" }}>
          <div className="card">
            <div className="card-body">
                Messages
            </div>
          </div>
          <div className="card">
            <div className="card-body">
                Messages
            </div>
          </div>
          <div className="card">
            <div className="card-body">
                Messages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Mailbox;