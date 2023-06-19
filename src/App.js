import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

const API_KEY="c29eb0cd53271f0ac175d1153ea2296c";

function App() {
  const[query,setQuery]=useState("")
  const[name,setName]=useState("");
  const[temp,setTemp]=useState('');
  const[weather,setWeather]=useState("");
  const[desc,setDesc]=useState("");
  const[icon,setIcon]=useState("");
  function handleClick(){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
    .then(res=>{
      setName(res.data.name)
      var t=Math.floor(res.data.main.temp-273.15);
      setTemp(t);
      setWeather(res.data.weather[0].main);
      setDesc(res.data.weather[0].description);
      setIcon(res.data.weather[0].icon)

    })
    .catch((err)=>{
      console.log("error", err);
      });
    setQuery("")
  }
  return (
    <div className='container'>
      <div>
      <input value={query} onChange={(e)=>setQuery(e.target.value)}></input>
      <button onClick={handleClick}>Click me</button>
    </div>
    {
      name&&(
        <div>
          <h4>{name}</h4>
          <h2>{temp}°C</h2>
          <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt=""/>
          <h3>{weather}</h3>
          <p><strong>description:</strong> {desc}</p>
        </div>
      )
    }
    </div>
  )
}

export default App;
