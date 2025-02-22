// To run with access to the protected key:
// export VITE_WEATHER_KEY=<key> && npm run dev
//
// To access the key:
// const weather_key = import.meta.env.VITE_WEATHER_KEY

import { useState } from "react"

import Info from "./Info"

const Country = ({ country }) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            {country.name.common}
            <button onClick={toggleShow}>
                {show ? 'Hide' : 'Show'}
            </button>
            
            {show && <Info country={country} />}
        </div>
        
    )
}

export default Country