import './App.css';
import React, {useState} from 'react'
import {Route, Routes} from "react-router-dom";
import Market from "../Market/Market";
import SideBar from "../SideBar/SideBar";
import Portfolio from "../Portfolio/Portfolio";
import Favourite from "../Favourite";


function App() {

    //Method to start web app expanded
    window.Telegram.WebApp.expand()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                             <--UseStates-->
    // Responds for hiding Input and Sidebar, and for expanding CoinData, when user presses button "Get more info".
    const [moreInfoExpanded, setExpanded] = useState(false)
    // Array of coins, that user choose as favourites.
    const [favourites, setFavourites] = useState([])

    const [scrollTop, setScrollTop] = useState(0);

    const[token, setToken] = useState()


    // Function, that gives classNames to some elements, depending on color scheme of Telegram.
    // (!!! Work in progress !!!)
    function setColorScheme(classname) {
        if (window.Telegram.WebApp.colorScheme === 'dark') {
            return `${classname} dark`
        }
        else if (window.Telegram.WebApp.colorScheme === 'light') {
            return `${classname} light`
        }
        else {
            console.log("Can't find color scheme")
            return classname
        }
    }

    function onScroll(e) {
        setScrollTop(e.currentTarget.scrollTop)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                             <--HTML-->
    return (
        <div className={setColorScheme("App")} onScroll={onScroll}>
            <Routes>
                <Route path='/' element={<SideBar setColorScheme={setColorScheme} moreInfoExpanded={moreInfoExpanded}/>}>
                    <Route index element={<Market setColorScheme={setColorScheme} setExpanded={setExpanded}
                           moreInfoExpanded={moreInfoExpanded} favourites={favourites} setFavourites={setFavourites}
                           scrollTop={scrollTop}/>}/>
                    <Route path='/portfolio' element={<Portfolio setColorScheme={setColorScheme} token={token} setToken={setToken}/>}/>
                    <Route path='/favourite' element={<Favourite setColorScheme={setColorScheme} setExpanded={setExpanded}
                           moreInfoExpanded={moreInfoExpanded} favourites={favourites} setFavourites={setFavourites}/>}/>
                </Route>
            </Routes>
        </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default App;
