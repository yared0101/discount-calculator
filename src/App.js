import "./App.css";
import { useEffect, useState } from "react";

// import calculatorImage from "./assets/calculator.svg";
import homeImageForLightTheme from "./assets/home-black.svg";
import homeImageForDarkTheme from "./assets/home-white.svg";
import settingsImageForLightTheme from "./assets/settings-black.svg";
import settingsImageForDarkTheme from "./assets/settings-white.svg";
import Calculator from "./components/Calculator";
import Settings from "./components/Settings";
function App() {
    const [theme, setTheme] = useState("light");
    const [page, setPage] = useState("Calculator");
    const [settings, setSettings] = useState({
        maxNumberOfPeople: 15,
        pricePerOnePerson: 5000,
        maximumDiscountAmount: 5000,
    });
    /**
     *
     * @param {MediaQueryListEvent} event
     */
    const themeChangeHandler = (event) => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log(`theme ${newColorScheme} set`);
        setTheme(newColorScheme);
    };
    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
        //add event listener
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", themeChangeHandler);
        //remove event listener upon unmount
        return window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", themeChangeHandler);
    }, []);
    const homeImage =
        theme === "dark" ? homeImageForDarkTheme : homeImageForLightTheme;
    const settingsImage =
        theme === "dark"
            ? settingsImageForDarkTheme
            : settingsImageForLightTheme;
    return (
        <div className="App">
            <div
                className={`App ${theme}-theme h-screen flex justify-center items-center`}
            >
                <div
                    className={`border w-full  md:w-1/2 rounded-lg ${
                        theme === "light" ? "" : "shadow-gray-400"
                    } shadow`}
                >
                    <div className="flex justify-between items-center p-5 border-b">
                        <span className="text-4xl">{page}</span>
                        <img
                            src={
                                page === "Calculator"
                                    ? settingsImage
                                    : homeImage
                            }
                            alt={page === "Calculator" ? "settings" : "home"}
                            onClick={() => {
                                setPage((page) =>
                                    page === "Calculator"
                                        ? "Settings"
                                        : "Calculator"
                                );
                            }}
                            className={`cursor-pointer w-10 ${theme}-theme`}
                        />
                    </div>
                    {page === "Calculator" ? (
                        <Calculator theme={theme} settings={settings} />
                    ) : (
                        <Settings
                            theme={theme}
                            setSettings={setSettings}
                            settings={settings}
                            changePage={() => setPage("Calculator")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
