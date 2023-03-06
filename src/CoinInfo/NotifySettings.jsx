import React, {useState} from 'react';
import "./NotifySettings.css"

const NotifySettings = ({index, settingsArray, setSettingsArray, setConfirm, setColorScheme, symbol}) => {


    // Color of text in input.
    const[settingsColor, setSettingsColor] = useState("#666666")


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                    <--Adding and deleting settings-->
    function addSetting() {
        if(settingsArray.length < 10) {
            const newArray = settingsArray.concat({value: 0, valueSide: "+", unit: "%"})
            setSettingsArray(newArray)
        }
        else {
            alert("You cant configure more than 3 notification for 1 coin.")
        }
    }

    function deleteSetting() {
        if(settingsArray.length > 1) {
            for(let j = index; j < settingsArray.length-1; j++) {
                document.getElementById(`input${symbol}${j}`).value = document.getElementById(`input${symbol}${j+1}`).value
                document.getElementById(`plus-minus${symbol}${j}`).value = document.getElementById(`plus-minus${symbol}${j+1}`).value
                document.getElementById(`unit${symbol}${j}`).value = document.getElementById(`unit${symbol}${j+1}`).value

                document.getElementById(`input${symbol}${j}`).style.color = document.getElementById(`input${symbol}${j+1}`).style.color
                inputControl()
            }
            const newArray = []
            for(let j = 0; j < settingsArray.length; j++){
                if(j < index)
                    newArray[j] = settingsArray[j]
                if(j > index) {
                    newArray[j-1] = settingsArray[j]
                }
            }
            setSettingsArray(newArray)
        }
    }


    function inputControl() {
        const input = document.getElementById(`input${symbol}${index}`)
        const unit = document.getElementById(`unit${symbol}${index}`)
        const side = document.getElementById(`plus-minus${symbol}${index}`)
        if(unit.value === "$") {
            if(input.value < 0) input.value *= -1
            side.className = "plus-minus-hidden"
            input.className = "settings-input expanded"
            setSettingsColor("#666666")
        }
        else {
            side.className = "plus-minus"
            input.className = "settings-input"
            if(input.value < 0) {
                input.value *= -1
                side.value = "-"
            }
            if(input.value > 0) {
                if(side.value === "+") setSettingsColor("#00AE07")
                else if(side.value === "-") setSettingsColor("red")
                else setSettingsColor("#666666")
                setConfirm(true)
            }
            else {
                setSettingsColor('#666666')
                let notEmpty = false
                for(let i = 0; i < settingsArray.length; i++) {
                    if(document.getElementById(`input${symbol}${i}`).value > 0) notEmpty = true
                }
                setConfirm(notEmpty)
            }
        }
        let newArray = settingsArray
        newArray[index].value = input.value
        newArray[index].valueSide = side.value
        newArray[index].unit = unit.value
    }


    return (
        <>
            <div className="settings-row">
                <button className={setColorScheme("settings-button")} onClick={addSetting}>
                    <svg width="5vh" height="5vh" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50" y1="75" x2="50" y2="25" stroke-width="1.5vh"/>
                        <line x1="25" y1="50" x2="75" y2="50" stroke-width="1.5vh"/>
                    </svg>
                </button>
                <select className="plus-minus"
                        id={`plus-minus${symbol}${index}`}
                        onChange={inputControl}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="+/-">+/-</option>
                </select>
                <input className="settings-input"
                       id={`input${symbol}${index}`}
                       style={{color: settingsColor}}
                       onChange={() => {inputControl();}}
                       type="number"
                       placeholder="Enter a value"
                />
                <select id={`unit${symbol}${index}`} onChange={inputControl}>
                    <option value="%">%</option>
                    <option value="$">$</option>
                </select>
                <button className={setColorScheme("settings-button")} onClick={deleteSetting}>
                    <svg width="5vh" height="5vh" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="25" y1="75" x2="75" y2="25" stroke-width="1.5vh"/>
                        <line x1="25" y1="25" x2="75" y2="75" stroke-width="1.5vh"/>
                    </svg>
                </button>
            </div>
        </>
    );
};

export default NotifySettings;