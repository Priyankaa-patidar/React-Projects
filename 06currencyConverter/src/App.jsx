import { useState } from 'react'

import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'



function App() {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedValue, setConvertedValue] = useState(0)

    const currencyInfo = useCurrencyInfo(from)

    const options = Object.keys(currencyInfo)

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedValue(amount)
        setAmount(convertedValue)
    }

    const convert = () => {
        setConvertedValue(amount * currencyInfo[to])
    }

    return (
        <>
            <div
                className="w-1/2 absolute inset-y-0 right-0 bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/North_indian_chai.jpg/1536px-North_indian_chai.jpg')`,
                }}
            >
            </div>

            <div
                className="w-1/2 h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/20392251/pexels-photo-20392251/free-photo-of-a-brown-butterfly-sitting-on-a-leaf-with-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`,
                }}
            >
                <div className="w-full">
                    <div className="w-full height-1/2 max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert()
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => {
                                        setFrom(currency)
                                    }}
                                    selectCurrency={from}
                                    onAmountChange={(amount) => {
                                        setAmount(amount)
                                    }}

                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedValue}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => {
                                        setTo(currency)
                                    }}
                                    amountDisable
                                    selectCurrency={to}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default App
