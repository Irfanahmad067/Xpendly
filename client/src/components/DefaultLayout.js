import React from 'react'
import {Dropdown } from "antd";
import '../resources/default-layout.css'
import { useNavigate } from 'react-router-dom';

export const DefaultLayout = (props) => {
    const user = JSON.parse(localStorage.getItem('track-it-user'))
    const navigate = useNavigate()
    const items = [
      {
        key: "1",
        label: (
         <li onClick={()=>{
            localStorage.removeItem('track-it-user')
            navigate('/login')
         }}>Log Out</li>
        ),
      },

    ];
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Xpendly</h1>
        </div>
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <button className="primary">{user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}
