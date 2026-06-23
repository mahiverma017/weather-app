import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        
        city: "Search a city",
        feelsLike: 0,
        humidity: 0,
        temp: 0,
        tempMax: 0,
        tempMin: 0,
        weather: "__",
        wind: 0,
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div>
            <SearchBox updateInfo={updateInfo}/>
            <hr />
            <InfoBox info={weatherInfo}/>
        </div>
    );
}