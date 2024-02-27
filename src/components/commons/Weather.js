import { useEffect, useState } from "react";

const Weather = () => {
const [coords, saveCoords] = useState();
const [temp, setTemp] = useState();
const [weather, setWeather] = useState();
  
 function handleGeoSucc(position) {
  console.log(position);
  const latitude = position.coords.latitude;  // 경도  
  const longitude = position.coords.longitude;  // 위도
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoErr(err) {
  console.log("geo err! " + err);
}

function requestCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
}

function getWeather(lat, lon) {
  fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'3a1455373172f7b70e886937412ed249'}&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const temp = data.main.temp;
      const weathers = data.weather[data.weather.length - 1];
      setTemp(temp);
      setWeather(weathers.main);
    })
}

useEffect(() => {
  requestCoords();
}, []);
};

export default Weather