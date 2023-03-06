import React from 'react';
import Login from "./Login";
import "./Portfolio.css"
import useScrollbarSize from "react-scrollbar-size";


const Portfolio = ({setColorScheme, token, setToken}) => {

    document.documentElement.style.setProperty("--scrollbar-width", `${useScrollbarSize().width}px`)

    if(!token) {
        return (<Login setColorScheme={setColorScheme} setToken = {setToken}/>)
    }

    return (
        <div className={setColorScheme("portfolio")}>
            <p>TOTAL BALANCE</p>
            <h2>000$</h2>
            <div className="statistics">

            </div>
            <div className={setColorScheme("log-out")}>
                <button>LOG OUT</button>
            </div>
        </div>
    );
};


export default Portfolio;