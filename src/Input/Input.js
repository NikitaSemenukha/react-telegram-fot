import React, {useState} from 'react';
import "./Input.css"

const Input = ({handleChange, setColorScheme, moreInfoExpanded}) => {

    const [icon_class_name, setClass] = useState("icon-search")


    return (
        <div className={moreInfoExpanded ? "search hidden" : setColorScheme("search")}>
            <svg viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg"
            className={setColorScheme(icon_class_name)}>
                <circle cx="9.5" cy="9.5" r="9.5"/>
                <line x1="4.97641" y1="5.8613" x2="24.3007" y2="22.4315" strokeWidth="3"/>
            </svg>

            <input className={setColorScheme("input")}
                    type="text"
                    placeholder="Enter a cryptocurrency"
                    onChange={handleChange}
                    onFocus={() => {setClass("icon-search focused")}}
                    onBlur={() => {setClass("icon-search")}}
                />
        </div>
    );
};

export default Input;