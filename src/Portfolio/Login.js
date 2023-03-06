import React from 'react';
import "./Login.css"


const Login = ({setColorScheme, setToken}) => {

    //Setting width of scrollbar to variable in CSS
    document.documentElement.style.setProperty("--scrollbar-width", "0px")

    const testRightTokens = ["123456789", "09090909"]

    function inputSubmit(e) {
        if(e.key === "Enter") {
            if(testRightTokens.includes(e.target.value)) setToken(e.target.value)
            else alert("This API does not exist")
        }
    }

    return (
        <div className={setColorScheme("login-wrapper")}>
            <div className="login">
                <div>
                    <span>Log in to your Binence account by </span>
                    <span style={{color: (window.Telegram.WebApp.colorScheme === "light") ? "var(--selected-color)" : "#BDA800"}}>API</span>
                    <span> key</span>
                </div>
                <input className={setColorScheme("login-input")} type="text" placeholder="Enter an API" onKeyDown={inputSubmit}/>
            </div>
        </div>
    );
};

export default Login;