import { useEffect, useState } from 'react';
import weatherDescKo from './WeatherDescKo';
import TodayData from '../commons/TodayData';
import { FaLocationDot } from 'react-icons/fa6';

const Weather = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [coords, saveCoords] = useState();
  const [temp, setTemp] = useState();
  const [name, setName] = useState();
  const [weatherKo, setWeatherKo] = useState();
  const [weatherIconAdr, setWeatherIconAdr] = useState();

  function handleGeoSucc(position) {
    console.log(position);
    const latitude = position.coords.latitude; // 경도
    const longitude = position.coords.longitude; // 위도
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.log('geo err! ' + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const temp = Math.round(data.main.temp);
        const name = data.name;
        const weathers = data.weather[0];
        const weatherIcon = data.weather[0].icon;
        const weatherIconAdr = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const weatherKo = weatherDescKo.find(function (item) {
          return item.id === weathers.id;
        });
        setName(name);
        setTemp(temp);
        setWeatherKo(weatherKo);
        setWeatherIconAdr(weatherIconAdr);
      });
  }

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <div>
      <ul>
        <li>
          <TodayData />
        </li>
        <li>
          <FaLocationDot />
          <b>{name}</b>
        </li>
        <li>
          <img src={weatherIconAdr} width={110} />
        </li>
        <li>
          <b>{temp}°</b>
        </li>
        <li>{weatherKo && weatherKo.desc}</li>
      </ul>
    </div>
  );
};

export default Weather;
