// import React from 'react';
// import "./CoinData.css"
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //           <--Contains brief info about coin and button, that expand this component and make moreInfo visible-->
// const CoinData = ({
//     price,
//     marketcap,
//     volume,
//     priceChange,
//     setColorScheme,
//     setExpanded,
//     isOpened
//                   }) => {
//
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //                                                  <--HTML-->
//     return (
//         <>
//             <div className={"info"}>
//                 <p>Price: ${price}</p>
//                 <p>Market cap: ${marketcap.toLocaleString()}</p>
//                 <p>Volume: ${volume.toLocaleString()}</p>
//                 {priceChange > 0 ?
//                     (<p style={{color: "#00AE07"}}>Price change: +{priceChange.toFixed(2)}%</p>)
//                     :
//                     (<p style={{color: "red"}}>Price change: {priceChange.toFixed(2)}%</p>)
//                 }
//             </div>
//             <div className={isOpened ? "button-container visible" : "button-container"}>
//                 <p className={setColorScheme("button")} onClick={() => {setExpanded(true)}}>GET MORE INFO</p>
//             </div>
//         </>
//     );
// };
//
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export default React.memo(CoinData);

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CoinData component displays brief information about a coin and a button to expand the component and display more information
import React from 'react';
import PropTypes from 'prop-types';
import "./CoinData.css"

const CoinData = ({
                      price,
                      marketcap,
                      volume,
                      priceChange,
                      setColorScheme,
                      setExpanded,
                      isOpened
                  }) => {
    const color = priceChange > 0 ? "#00AE07" : "red";

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This component returns the JSX for the coin component
    return (
        <>
            {/* Display basic information about the coin */}
            <div className="info">
                <p>Price: ${price}</p>
                <p>Market cap: ${marketcap.toLocaleString()}</p>
                <p>Volume: ${volume.toLocaleString()}</p>
                <p style={{color}}>Price change: {priceChange > 0 ? "+" : ""}{priceChange.toFixed(2)}%</p>
            </div>
            <div className={`button-container ${isOpened ? "visible" : ""}`}>
                <p className={setColorScheme("button")} onClick={() => {setExpanded(true)}}>GET MORE INFO</p>
            </div>
        </>
    );
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Defines the required props for the CoinData component
CoinData.propTypes = {
    price: PropTypes.number.isRequired,
    marketcap: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    priceChange: PropTypes.number.isRequired,
    setColorScheme: PropTypes.func.isRequired,
    setExpanded: PropTypes.func.isRequired,
    isOpened: PropTypes.bool.isRequired
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exports the Coin component with React.memo to optimize performance
export default React.memo(CoinData);