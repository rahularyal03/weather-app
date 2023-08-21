import React, { useEffect, useState } from 'react';
import './index.css';
import sunny from './img/sun.png';
import cloudy from './img/cloudy.png';
import cloud from './img/cloud.png';
// import thunder from './img/rainy.png';
// import rainy from './img/rainy-day.png';
import snow from './img/snowman.png';
import mist from './img/haze.png';
import drizzle from './img/drizzle.png';

import axios from 'axios';

const App = () => {

  const [data, setdata] = useState({
    celcius: "--",
    name: "---", 
    minTemp:"--",
    maxTemp:"--",
    humidity: "--",
    feels: "--",
    image: ""
  })

  const[input, setInput] = useState("");
  const[searched, setSearched] = useState("");

  

  const changed = (e) =>{
    const value = e.target.value;
    
    setInput(value);

  }

  const submit = () =>{
    setSearched(input);

    setInput("")
  }

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searched}&appid=8f52671d6b334bcdd82effbbde5049e1`
    axios.get(apiUrl)

      .then((res)=>{
        console.log(res)
        let imageDiagram = "";
        const img = res.data.weather[0].main;
        if(img === "Clouds"){
          imageDiagram =  cloudy;
        }

        else if(img === "Rain"){
          imageDiagram =  cloudy;
        }

        else if(img === "Clouds"){
          imageDiagram =  cloud;
        }

        else if(img === "Drizzle"){
          imageDiagram =  drizzle;
        }

        else if(img === "Mist"){
          imageDiagram =  mist;
        }

        else if(img === "Snow"){
          imageDiagram =  snow;
        }

        else{
          imageDiagram = sunny;
        }

        setdata({
          ...data, celcius: res.data.main.temp, name: res.data.name, minTemp: res.data.main.temp_min, maxTemp: res.data.main.temp_max, feels: res.data.main.feels_like, humidity: res.data.main.humidity, image: imageDiagram
        })

        
      }).catch((err) =>{
        console.log(err)
      })



  })

  

  return (
    <>
      <div className='main-box'>
        <div className='box'>
          <div className='search-box'>
            <input onChange={changed} className='input' placeholder='Enter City Name' value = {input}/>
            <i class="fa-solid fa-magnifying-glass-location" onClick={submit}></i>
          </div>
          <div className='display-box'>
            <div className='logo-box'>
              <img className='weather-logo' src={data.image} alt='sunny' />


            </div>

            <div className='temp-box'>
              <div className='temp-box1'>
                <h1 className='temp'>{(data.celcius - 273).toFixed(0)} °C</h1>
                <div className='location'>{data.name}</div>
              </div>
              <div className='extra-box'>
                <div className='extra-box1'>
                  <div className='location'>Min.: {(data.minTemp -273).toFixed(0) } °C</div>
                  <div className='location'>Max.: {(data.maxTemp -273).toFixed(0)} °C</div>
                </div>

                <div className='extra-box2'>
                  <div className='location'>Feels like: {(data.feels -273).toFixed(0) } °C</div>
                  <div className='location'>Humidity: {(data.humidity)} %</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;