// api.openweathermap.org/data/2.5/weather?q=delhi&appid=8df9851417ab5e41831bad982f56f679
import React, {useState, useEffect} from 'react';
import './style.css';
import Weathercard from './weathercard';
const Temp = () => {
    
  const [searchValue, setSearchValue] = useState("patna");
  const [tempInfo, setTempInfo] = useState({});
   
  const getWeatherInfo = async () =>{
    try {
      let url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8df9851417ab5e41831bad982f56f679`;
       
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      const {temp, humidity, pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp, 
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      }
      setTempInfo(myNewWeatherInfo);
      // console.log(temp);
    } catch (error) {
      console.log(error);
    }

  }

  //[] jb empty array pass krte useEffect se toh 
  //sirf ek baar yh call hota hai
  useEffect(() => {
    getWeatherInfo();
  }, []);
  

  return <div>
    <div className='wrap'>
        <div className='search'>
            <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(event)=> setSearchValue(event.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>

    {/*temperature card div*/}
    <Weathercard tempInfo = {tempInfo}></Weathercard>

  </div>
};

export default Temp;
