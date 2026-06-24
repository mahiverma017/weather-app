import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './InfoBox.css';


export default function InfoBox({ info }) {
    let [showMore, setShowMore] = useState(false);
    const INIT_URL = "https://www-cdn.eumetsat.int/files/styles/16_9_large/public/2022-03/weather-lzone.jpg?h=d1cb525d&itok=bA0TVACl";

    const HOT_URL = "https://png.pngtree.com/thumb_back/fh260/background/20240718/pngtree-sun-on-the-background-of-a-blue-sky-with-white-clouds-image_15888557.jpg";
    const COLD_URL = "https://www.climaterealityproject.org/sites/default/files/styles/intro_title_impact_small_never_crop/public/adam-chang-iwenq-4jhqo-unsplash.jpg?itok=hYswWfUO";
    const RAINY_URL = "https://img.pikbest.com/backgrounds/20250128/dark-rainy-stormy-cloud-with-lightning-and-rain_11464750.jpg!w700wp";
    const CLOUDY_URL = "https://media.istockphoto.com/id/462881839/photo/epic-super-cell-storm-cloud.jpg?s=612x612&w=0&k=20&c=66lBv3Ybh1b4cNhAyQaRwekC7fpgr2vg8Er49HWyDr4=";

    let showMoreInfo = () => {
        setShowMore(!showMore);
    }

    const weatherCondition = info.weather.toLowerCase();
    let imageUrl, icon;
    if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle") || weatherCondition.includes("thunderstorm")  || weatherCondition.includes("broken clouds")) {
        imageUrl = RAINY_URL;
        icon = <ThunderstormIcon/>;
    } else if (weatherCondition.includes("cloud")) {
        imageUrl = CLOUDY_URL;
        icon = <CloudIcon/>;
    } else if (weatherCondition.includes("snow")) {
        imageUrl = COLD_URL;
        icon = <AcUnitIcon/>;
    } else {
        imageUrl = info.temp > 15 ? HOT_URL : COLD_URL;
        icon = info.temp > 15 ? <WbSunnyIcon/> : <AcUnitIcon/>;
    }

    let date = new Date().toString().split(" ").slice(0, 4);

    return (
        <div className="InfoBox">
            <h2>Weather - {`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</h2>

            <div className="container">
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        sx={{ height: 160 }}
                        image={imageUrl}
                        title="weather"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" id='cityName'>
                            {info.city} {icon}
                        </Typography>
                        <Typography component="div" variant="body2" sx={{ color: 'text.secondary' }}>
                            <div className='temp'>
                                <p>Temperature = {info.temp}&deg;C</p>
                                <p>Humidity = {info.humidity}%</p>
                                <p>Wind = {info.wind} km/h</p>
                            </div>
                            <p>The weather can be described as <b>{info.weather}</b> and feels like {info.feelsLike}&deg;C</p>

                            {showMore && (
                                <>
                                    <div className="moreInfo">
                                        <span>Min Temp = {info.tempMin}&deg;C</span>
                                        <span>Max Temp = {info.tempMax}&deg;C</span>
                                    </div>
                                </>
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions className='showBtn'>
                        <Button size="small" onClick={showMoreInfo}>{showMore ? "show less" : "More Info"}</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}