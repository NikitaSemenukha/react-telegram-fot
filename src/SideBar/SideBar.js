import React from 'react';
import SideBarData from "./SideBarData";
import "./SideBar.css"
import {useNavigate, Outlet, useLocation} from "react-router-dom";

const SideBar = ({setColorScheme, moreInfoExpanded}) => {

    const navigate = useNavigate()

    const current_location = "./" + useLocation().pathname.split('/').pop()

    for(let i = 0; i < SideBarData.length; i++)
        if(current_location === SideBarData[i].path) SideBarData[i].cName = "section active"

    function changeColor(e) {
        document.querySelector('.section.active').classList.remove('active');
        e.target.className = setColorScheme("section active")
    }


    return (
       <div>
           <div className={moreInfoExpanded ? setColorScheme("sidebar hidden") : setColorScheme("sidebar")}>
               <div className="logo-wrapper">
                   <img src={require("../Icons/fptp_logo.png")} alt="Logo not found"
                        className={setColorScheme("fptp-logo")}/>
               </div>
               <nav>
                   <ul>
                       {SideBarData.map((item, index) => {
                           return(
                               <li key={index} className={setColorScheme(item.cName)}
                                   onClick={(event) => {
                                       changeColor(event)
                                       navigate(item.path)
                                   }}>
                                   {item.title}
                               </li>
                           )
                       })}
                   </ul>
               </nav>
           </div>
           <div id={(moreInfoExpanded) ? "outlet-expanded" : "outlet"}>
               <Outlet/>
           </div>
       </div>
    );
};

export default SideBar;