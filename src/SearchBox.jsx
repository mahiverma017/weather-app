import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import './SearchBox.css'

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "0bb2ed101ba66e6211d6b671c6871138";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            // console.log(jsonResponse);
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMax: jsonResponse.main.temp_max,
                tempMin: jsonResponse.main.temp_min,
                feelsLike: jsonResponse.main.feels_like,
                humidity: jsonResponse.main.humidity,
                weather: jsonResponse.weather[0].description,
                wind: jsonResponse.wind.speed,

            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }

    };


    let handleChange = (event) => {
        setCity(event.target.value);
        setError(false);
    };
    let handleSearch = async (event) => {
        try {
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSearch}>
                <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                <Button variant="contained" type='submit'>Search</Button>
            </form>

            {error &&
                <Alert severity="error" className='error'>
                   <AlertTitle className='title' ><b>Error</b></AlertTitle>
                    No such place exists!
                </Alert>
            }        

        </div>
    );
}