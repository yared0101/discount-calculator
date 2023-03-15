import { useState } from "react";

const Calculator = ({ theme, settings }) => {
    const [input, setInput] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [error, setError] = useState("");
    /**
     *
     * @param {number} peopleCount number of people to discount to
     * @param {{
     * maxNumberOfPeople: number,
     * pricePerOnePerson: number,
     * maximumDiscountAmount: number
     * }} settings
     */
    const calculateBasedOnSettings = (input, settings) => {
        if (!input) {
            return setError("");
        }
        if (input < 1) {
            setError("people count can't be less than 1");
        } else if (input === 1) {
            setError("");
            setDiscount(0);
            setDiscountPercentage(0);
        } else if (input <= settings.maxNumberOfPeople) {
            const discountAmount =
                (settings.maximumDiscountAmount * input) /
                settings.maxNumberOfPeople;
            const discountPercentageVal =
                (discountAmount * 100) / (settings.pricePerOnePerson * input);
            setError("");
            setDiscount(discountAmount.toFixed(2));
            setDiscountPercentage(discountPercentageVal.toFixed());
        } else if (input > settings.maxNumberOfPeople) {
            setError(
                "people count can't be more than " + settings.maxNumberOfPeople
            );
        }
    };

    return (
        <>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>People count - </label>
                <input
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                    type="number"
                    onChange={({ target }) => {
                        setInput(target.value);
                        calculateBasedOnSettings(target.value, settings);
                    }}
                    value={input}
                />
            </div>
            <div className="text-left ml-20">
                <p className="text-red-400">{error}</p>
            </div>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>Discount - </label>
                <label
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                >
                    {discount.toLocaleString()}
                </label>
            </div>
            <div className="flex justify-start p-5 text-lg items-center flex-wrap">
                <label>Discount Percentage- </label>
                <label
                    className={`${theme}-theme border rounded-lg px-3 py-2 ml-3`}
                >
                    {discountPercentage}%
                </label>
            </div>
        </>
    );
};
export default Calculator;
