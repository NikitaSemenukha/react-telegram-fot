// import React, {useEffect, useState} from 'react';
// import "./Coin.css"
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //            <--Component that shows main info about coin and has "star" button, that adds it to favourites-->
// const Coin = ({name, symbol, image, favourites, setFavourites, setColorScheme}) => {
//
//     const[starColor, setStarColor] = useState(window.Telegram.WebApp.colorScheme === "light" ? "var(--unselected-color)" : "grey")
//
//
//     // Sets color of star depending on is coin in favourites or not.
//     useEffect(() => {
//         if(favourites.includes(symbol))
//             setStarColor("var(--selected-color)")
//         else {
//             setStarColor((window.Telegram.WebApp.colorScheme === "light") ? "var(--unselected-color)" : "grey")
//         }
//     }, [favourites])
//
//
//     // Add to or delete from favourites.
//     function changeFav() {
//         if(!favourites.includes(symbol)) {
//             const newArray = favourites.concat(symbol)
//             setFavourites(newArray)
//             setStarColor("var(--selected-color)")
//         }
//         else {
//             const newArray = favourites.filter(data => data !== symbol)
//             setFavourites(newArray)
//             setStarColor((window.Telegram.WebApp.colorScheme === "light") ? "var(--unselected-color)" : "grey")
//         }
//     }
//
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //                                                <--HTML-->
//     return (
//             <div className={setColorScheme("coin-row")}>
//                 <img src={image} alt="no logo"/>
//                 <h2 className="coin-name">{name}</h2>
//                 <h2 className={setColorScheme("coin-symbol")}>{symbol.toUpperCase()}</h2>
//                 <svg width="9vw" height="7vw" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                         d="M9.54894 0.927049C9.8483 0.00573857 11.1517 0.00574037 11.4511 0.927051L13.0819 5.9463C13.2158 6.35833 13.5997 6.63729 14.033 6.63729H19.3105C20.2792 6.63729 20.682 7.8769 19.8983 8.4463L15.6287 11.5484C15.2782 11.803 15.1315 12.2544 15.2654 12.6664L16.8963 17.6857C17.1956 18.607 16.1411 19.3731 15.3574 18.8037L11.0878 15.7016C10.7373 15.447 10.2627 15.447 9.91221 15.7016L5.64258 18.8037C4.85887 19.3731 3.80439 18.607 4.10374 17.6857L5.7346 12.6664C5.86847 12.2544 5.72181 11.803 5.37132 11.5484L1.10169 8.4463C0.317977 7.8769 0.720754 6.63729 1.68948 6.63729H6.96703C7.40026 6.63729 7.78421 6.35833 7.91809 5.9463L9.54894 0.927049Z"
//                         fill={starColor} onClick={(e) => {
//                         e.stopPropagation();
//                         changeFav()
//                     }}/>
//                 </svg>
//             </div>
//     );
// };
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export default React.memo(Coin);
//

import React, { useMemo } from 'react';
import "./Coin.css"
import PropTypes from 'prop-types';

// This component is responsible for rendering the UI for each coin with its details
const Coin = ({name, symbol, image, favourites, setFavourites}) => {

    // useMemo hook is used to memoize the calculation of star color,
    // which depends on the current color scheme and whether the coin is in the list of favourites or not
    const starColor = useMemo(() => favourites.includes(symbol) ? "var(--selected-color)" :
        (window.Telegram.WebApp.colorScheme === "light" ? "var(--unselected-color)" : "grey"), [favourites, symbol]);

    // changeFav function toggles the favourite status of a coin,
    // either adding it to the list of favourites or removing it, depending on its current status
    const changeFav = () => {
        setFavourites(favourites.includes(symbol) ? favourites.filter(data => data !== symbol) : [...favourites, symbol]);
    };

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This component returns the JSX for the coin component
    return (
        <div className="coin-row">
            <img src={image} alt="no logo"/>
            <h2 className="coin-name">{name}</h2>
            <h2 className="coin-symbol">{symbol.toUpperCase()}</h2>
            <svg width="9vw" height="7vw" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.54894 0.927049C9.8483 0.00573857 11.1517 0.00574037 11.4511 0.927051L13.0819 5.9463C13.2158 6.35833 13.5997 6.63729 14.033 6.63729H19.3105C20.2792 6.63729 20.682 7.8769 19.8983 8.4463L15.6287 11.5484C15.2782 11.803 15.1315 12.2544 15.2654 12.6664L16.8963 17.6857C17.1956 18.607 16.1411 19.3731 15.3574 18.8037L11.0878 15.7016C10.7373 15.447 10.2627 15.447 9.91221 15.7016L5.64258 18.8037C4.85887 19.3731 3.80439 18.607 4.10374 17.6857L5.7346 12.6664C5.86847 12.2544 5.72181 11.803 5.37132 11.5484L1.10169 8.4463C0.317977 7.8769 0.720754 6.63729 1.68948 6.63729H6.96703C7.40026 6.63729 7.78421 6.35833 7.91809 5.9463L9.54894 0.927049Z"
                    fill={starColor} onClick={(e) => {
                    e.stopPropagation();
                    changeFav();
                }}/>
            </svg>
        </div>
    );
};

// Defines the required props for the Coin component
Coin.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    favourites: PropTypes.array.isRequired,
    setFavourites: PropTypes.func.isRequired,
};

// Exports the Coin component with React.memo to optimize performance
export default React.memo(Coin);