import axios from "axios"
import { useEffect, useState } from "react"

type Place = {
  name: string,
  country: string,
  latitude: number,
  longitude: number
}

type CurrentWeather = {
  interval:number,
  is_day: number,
  temperature: number,
  time: string,
  weathercode: number,
  winddirection: number,
  windspeed: number
}

const App = () => {
  const [place, setPlace] = useState("")
  const [responsePlaces, setResponsePlaces] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place>()

  const searchPlace = () => {
    if(place.length === 0) return

    axios.get("https://geocoding-api.open-meteo.com/v1/search?name=" + place)
    .then(response => setResponsePlaces(response.data.results))
  }

  useEffect(()=>{
    if(selectedPlace === undefined) return

    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${selectedPlace.latitude}&longitude=${selectedPlace.longitude}&current_weather=true`)
    .then(response => console.log(response.data))
  },[selectedPlace])

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

        <div className="responseWrapper">
          {responsePlaces.map(resPlace => 
          <button onClick={()=>setSelectedPlace(resPlace)}>
            {resPlace.name} ({resPlace.country})
          </button>)}
        </div>
      </div>

      {
        selectedPlace &&
        <div>
          Selected place: {selectedPlace.name}
        </div>
      }



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