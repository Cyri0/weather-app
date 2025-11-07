import axios from "axios"
import { useState } from "react"

type Place = {
  name: string,
  country: string
}

const App = () => {
  const [place, setPlace] = useState("")

  const [responsePlaces, setResponsePlaces] = useState<Place[]>([])

  const searchPlace = () => {
    if(place.length === 0) return

    axios.get("https://geocoding-api.open-meteo.com/v1/search?name=" + place)
    .then(response => setResponsePlaces(response.data.results))
  }

  return (
    <div>
      <h1>How's the sky looking today?</h1>
      <div>
        <input type="text" 
               placeholder="Search for a place..."
               value={place}
               onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={searchPlace}>Search</button>
        
        {responsePlaces.map(resPlace => <button>{resPlace.name} ({resPlace.country})</button>)}
      </div>

      Feels like

      Humidity

      Wind

      Precipitation

      Daily forecast

      Hourly forecast
    </div>
  )
}

export default App