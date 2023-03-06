import React, {useState, useEffect} from 'react';
import axios from "axios"
import Coin from "./CoinInfo/Coin"
import "./Market/Market.css"
import CoinData from "./CoinInfo/CoinData";
import MoreInfo from "./CoinInfo/MoreInfo";
import useScrollbarSize from "react-scrollbar-size";


const Favourite = ({setColorScheme, setExpanded, moreInfoExpanded, favourites, setFavourites}) => {

    //For closing info about crypto when you open info about another crypto.
    const [selected, setSelected] = useState(null)

    const [favCoins, setFavCoins] = useState([])

    const scrollWidth = useScrollbarSize().width

    //Setting width of scrollbar to variable in CSS
    if(favourites.length > 0 && document.querySelector(".market").clientHeight < window.innerHeight) {
        document.documentElement.style.setProperty("--scrollbar-width", "0px")
    }
    else {
        document.documentElement.style.setProperty("--scrollbar-width", `${scrollWidth}px`)
    }

    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then(res => {
                let newArray = []
                for(let i = 0; i < res.data.length; i++) {
                    if(favourites.includes(res.data[i].symbol)) {
                        newArray = newArray.concat(res.data[i])
                        setFavCoins(newArray)
                    }
                }
            })
            .catch(error => console.log(error));
    }, []);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                <--Opening and closing info about cryptos-->
    function openAndCloseInfo(i) {
        if(selected === i) {
            if(moreInfoExpanded) {
                const element = document.querySelector(".coin.full")
                setTimeout(() => {
                    element.scrollIntoView()
                }, 100)
                setExpanded(false)
            }
            setSelected(null)
            return
        }
        setSelected(i)
    }


    return (
            <div className="market">
                {favCoins.map((coin, i) => {
                    return (
                        <div className={moreInfoExpanded ? ((selected === i) ? "coin full" : "coin hidden") : setColorScheme("coin")}>
                            <button  style={{marginLeft: (moreInfoExpanded) ? "12.5vw" : "0"}}
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
                                              key = {coin.id}
                                              symbol={coin.symbol}
                                              price={coin.current_price}
                                              isFull={(moreInfoExpanded && selected === i)}
                                              isFavourite={favourites.includes(coin.symbol)}
                                              setExpanded={setExpanded}
                                    />
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default Favourite;