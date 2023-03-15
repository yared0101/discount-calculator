import { useState } from "react";

import saveImageForLightTheme from "../assets/save-black.svg";
import saveImageForDarkTheme from "../assets/save-white.svg";

const Settings = ({ theme, setSettings, settings, changePage }) => {
    const [insideSettings, setInsideSettings] = useState(settings);
    const updater = (key, value) => {
        if (value) value = Number(value);
        setInsideSettings({ ...settings, [key]: value });
    };
    const updateSettings = () => {
        for (let i in insideSettings) {
            if (!insideSettings[i] || insideSettings[i] < 1) {
                return;
            }
        }
        console.log(insideSettings);
        setSettings(insideSettings);
        changePage();
    };
    const saveImage =
        theme === "light" ? saveImageForLightTheme : saveImageForDarkTheme;
    return (
        <>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>Max Number of People - </label>
                <input
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                    type="number"
                    onChange={({ target }) => {
                        updater("maxNumberOfPeople", target.value);
                    }}
                    value={insideSettings.maxNumberOfPeople}
                />
            </div>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>Max Discount - </label>
                <input
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                    type="number"
                    onChange={({ target }) => {
                        updater("maximumDiscountAmount", target.value);
                    }}
                    value={insideSettings.maximumDiscountAmount}
                />
            </div>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>Price per Person - </label>
                <input
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                    type="number"
                    onChange={({ target }) => {
                        updater("pricePerOnePerson", target.value);
                    }}
                    value={insideSettings.pricePerOnePerson}
                />
            </div>
            <div className="w-full flex justify-end">
                <button
                    onClick={() => {
                        updateSettings();
                    }}
                    className="flex mr-10 border items-center justify-center rounded-lg px-6 mb-3"
                >
                    Save
                    <img
                        src={saveImage}
                        className={`cursor-pointer w-10 ${theme}-theme`}
                        alt="save"
                    />
                </button>
            </div>
        </>
    );
};

export default Settings;
