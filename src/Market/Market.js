import React, {useState, useEffect} from 'react';
import axios from "axios";
import Input from "../Input/Input.js"
import Coin from "../CoinInfo/Coin.jsx"
import CoinData from "../CoinInfo/CoinData.jsx";
import "./Market.css"
import MoreInfo from "../CoinInfo/MoreInfo";
import useScrollbarSize from "react-scrollbar-size";
import {findAllByDisplayValue} from "@testing-library/react";
import {getFirstHiddenTime} from "web-vitals/dist/modules/lib/polyfills/getFirstHiddenTimePolyfill";
// import {client} from '../DB/DatabaseConnect.js';
// import dotenv from 'dotenv'
// dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                     <--Component that displays coins, info about them and have search option-->
const Market = ({setColorScheme, moreInfoExpanded, setExpanded, favourites, setFavourites, scrollTop}) => {

    //Setting width of scrollbar to variable in CSS
    document.documentElement.style.setProperty("--scrollbar-width", `${useScrollbarSize().width}px`)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                            <--useState's-->
    //For getting info about coins from site:
    const [coins, setCoins] = useState([])
    //For dynamic search:
    const [search, setSearch] = useState('')
    //For closing info about crypto when you open info about another crypto.
    const [selected, setSelected] = useState(null)


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                             <--Searching-->
    //When user write something in input, function 'handleChange' works and sets in input variable 'search';
    //also it set variable "select" to null, that it would close info about all cryptos
    const handleChange = e => {
        setSelected(null)
        setSearch(e.target.value)
    };
    // Result of filtering array of coins with variable 'search' by coin name saves in 'filtered coins'. Only filtered
    // coins shown to user.
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().substring(0,search.length) === search.toLowerCase()
    );

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                             <--Getting data-->
    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then(res => {
                setCoins(res.data);
            })
            .catch(error => console.log(error));
    }, []);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                <--Opening and closing info about cryptos-->
    // Set coins to selected when you click them. Only one coin can be selected. Also, when user closing MoreInfo about
    // selected coin, this function scrolling page to this coin.
    function openAndCloseInfo(i) {
        if(selected === i) {
            if(moreInfoExpanded) {
                const element = document.querySelector(".coin.full")
                setTimeout(() => {
                    element.scrollIntoView()
                }, 2)
                setExpanded(false)
            }
            setSelected(null)
        }
        else setSelected(i)
    }


    const[startIndex, setStart] = useState(0)
    const[endIndex, setEnd] = useState(10)
    const items = []
    for (let i = startIndex; i <= endIndex; i++) {
        if(filteredCoins[i] !== undefined) items.push(i)
    }

    useEffect(() => {
        if(!moreInfoExpanded) {
            const scrollCount = Math.floor(scrollTop/(document.documentElement.clientHeight * 0.125))
            if(scrollCount > 5) setStart(scrollCount - 5)
            else setStart(0)
            if(scrollCount < 87) setEnd(scrollCount + 13)
            else setEnd(99)
        }
    },[scrollTop])

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                <--HTML-->
    return (
        <div className="market" >
                <Input setColorScheme={setColorScheme} handleChange={handleChange} moreInfoExpanded={moreInfoExpanded}/>
            <div className={(moreInfoExpanded) ? "coin-list hidden" : "coin-list"}>
                {filteredCoins.map((coin, i) => {
                    if(items.includes(i)){
                        return (
                            <div className={moreInfoExpanded ? ((selected === i) ? "coin full" : "coin hidden") : setColorScheme("coin")}>
                                <button style={{marginLeft: (moreInfoExpanded) ? "12.5vw" : "0"}}
                                        onClick={() => {openAndCloseInfo(i)}}>
                                    <Coin setColorScheme={setColorScheme}
                                          key={coin.id}
                                          name={coin.name}
                                          symbol={coin.symbol}
                                          image={coin.image}
                                          favourites={favourites}
                                          setFavourites={setFavourites}
                                    />
                                </button>
                                <div className={selected === i ? setColorScheme("crypto-info") : setColorScheme("crypto-info") + " hidden"}>
                                    <CoinData setColorScheme={setColorScheme}
                                              key={coin.id}
                                              symbol={coin.symbol}
                                              price={coin.current_price}
                                              marketcap={coin.market_cap}
                                              volume={coin.total_volume}
                                              priceChange={coin.price_change_percentage_24h}
                                              setExpanded={setExpanded}
                                              isOpened={(!moreInfoExpanded && selected === i)}
                                    />
                                    <div className={(moreInfoExpanded && i === selected) ? "more-info-container visible" : "more-info-container"}>
                                        <MoreInfo setColorScheme={setColorScheme}
                                                  key={coin.id}
                                                  symbol={coin.symbol}
                                                  price={coin.current_price}
                                                  isFull={(moreInfoExpanded && selected === i)}
                                                  isFavourite={favourites.includes(coin.symbol)}
                                                  setExpanded={setExpanded}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                else {
                    return (
                        <div style={{height: "12.15vh", display: (moreInfoExpanded) ? "none" : "block"}}>

                        </div>
                    )
                    }})}
            </div>
        </div>
    )}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default Market;
