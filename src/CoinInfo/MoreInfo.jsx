import React, {useEffect, useState} from 'react';
import "./MoreInfo.css"
import "./NotifySettings.jsx"
import NotifySettings from "./NotifySettings";
import {isDocument} from "@testing-library/user-event/dist/utils";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                            <--Contains timetable, converter and notify settings-->
const MoreInfo = ({symbol, price, setColorScheme, isFull, isFavourite, setExpanded}) => {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                 <--UseStates-->
    // Array of settings from NotifySettings.
    const[settingsArray, setSettingsArray] = useState([])
    // For showing confirm button, if input in NotifySetting isn't empty.
    const[confirm, setConfirm] = useState(false)
    // For converter.
    const[cryptoValue, setCryptoValue] = useState(1)
    const[usd, setUsd] = useState(price)


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                  <--MainButton and BackButton-->
    const tg_button = window.Telegram.WebApp.MainButton
    tg_button.text = "SEND DATA"
    tg_button.color = "#D9A900"
    tg_button.textColor = (window.Telegram.WebApp.colorScheme === "light") ? "#303132" : "#F0ECE2"
    tg_button.onClick(sendData())

    // const tg_back = window.Telegram.WebApp.BackButton
    // tg_back.onClick(() => setExpanded(false))


    // Fill settingsArray with one objects when CoinData expanding, and clear settingsArray, when CoinData loaning.
    // Make MainButton visible when expanded, and unseen when not expanded.
    useEffect(() => {
        if(isFull) {
            setSettingsArray([{value: 0, valueSide: "+", unit: "%"}])
            tg_button.isVisible = true
            // tg_back.isVisible = true
        }
        else {
            tg_button.isVisible = false
            // tg_back.isVisible = false
            setSettingsArray([])
        }
    }, [isFull])

    // Function, that send data about coin in chat after MainButton was clicked.
    function sendData() {

    }


    // Work after "Confirm" button has been pressed.
    function confirmNotify() {
        console.log(settingsArray)
    }


    // Convert crypto to USD and US to crypto.
    function convert(e) {
        if(e.target.className === "left-side")
            setUsd(parseFloat((e.target.value * price).toFixed(2)))
        else
            setCryptoValue(parseFloat((e.target.value / price).toFixed(2)))
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                               <--HTML-->
    return (
        <>
            <div className="timetable">

            </div>
            <div className={(isFavourite) ? setColorScheme("notify-me") : "notify-me alert"}>
                <h3>NOTIFY ME</h3>
                <h4>You have to add this coin to favourite to configure notifications.</h4>
                <>
                    {settingsArray.map((setting, index, array) => {
                        return (
                            <div>
                                <NotifySettings index={index} settingsArray={settingsArray} setSettingsArray={setSettingsArray}
                                setConfirm={setConfirm} setColorScheme={setColorScheme} symbol={symbol}/>
                            </div>
                        )})}
                </>
                <p style={{display: (confirm && isFavourite) ? "inline-block" : "none"}} onClick={confirmNotify}>CONFIRM</p>
            </div>
            <div className="converter">
                <span className={setColorScheme("converter-text")}>{symbol.toUpperCase()}</span> <span>to </span>
                <span className={setColorScheme("converter-text")}>US Dollar</span> <span>Converter</span>
                <div className="converter-row">
                    <p className="left-side">{symbol.toUpperCase()}</p>
                    <input className="left-side" type="number" value={cryptoValue}
                        onChange={(e) => {setCryptoValue(e.target.value);
                        convert(e)}}/>
                    <svg className="arrows"
                        width="7vw" height="5vh" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM27 3.5L14 3.5V4.5L27 4.5V3.5ZM14 3.5L1 3.5V4.5L14 4.5V3.5Z"
                              fill="#474646"/>
                        <path d="M27.3536 14.3536C27.5488 14.1583 27.5488 13.8417 27.3536 13.6464L24.1716 10.4645C23.9763 10.2692 23.6597 10.2692 23.4645 10.4645C23.2692 10.6597 23.2692 10.9763 23.4645 11.1716L26.2929 14L23.4645 16.8284C23.2692 17.0237 23.2692 17.3403 23.4645 17.5355C23.6597 17.7308 23.9763 17.7308 24.1716 17.5355L27.3536 14.3536ZM1 14.5H27V13.5H1V14.5Z"
                              fill="#474646"/>
                    </svg>
                    <p className="right-side">USD</p>
                    <input className="right-side" type="number" value={usd}
                        onChange={(e) => {setUsd(e.target.value);
                        convert(e)}}/>
                </div>
            </div>
        </>
    );
};

export default React.memo(MoreInfo);