import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, removeCity } from '../Redux/slices/citySlices';
import wind from '../assets/wind.png';
import  humidity from '../assets/humidity.png';
import DashboardComponent from './dashboardComponent';

function Form() {

  const currentDate: Date = new Date();
  const [query, setQuery] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const cities = useSelector((state: any) => state.city.cities);

  const formattedDate: string = currentDate.toLocaleDateString('en-US',{
    month: 'long',
    day: '2-digit',
    year: "numeric",
  })

  const formattedTime : string = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const fetchWeatherData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=f1ac97e0781dcc6481c178f9c34a758b&units=metric`
      );
      setWeatherData(data);
      setError('');
      console.log(data);
      
      // Dispatch action to add the city to Redux state
      // dispatch(addCity({ name: query, temperature: data.main.temp }));
    } catch (err) {
      console.error('Error fetching data', err);
      setWeatherData(null);
      setError('City not found');
    }
  };

  const handleAddCity = () => {
    if(query)
    // Dispatch action to add the city to Redux state
  { 
    fetchWeatherData();
    dispatch(addCity({ name: query, temperature: weatherData.main.temp, iconUrl : `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png` }));
  }
  };


  const handleRemoveCity = (cityName: string) => {
    // Dispatch action to remove the city from Redux state
    dispatch(removeCity(cityName));
  };

  return (
    <div className='w-full flex flex-col justify-center items-center  bg-image h-screen'>
    <div className='flex flex-row gap-5 justify-center items-center w-[100%] mx-10'>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-[30%] p-2 rounded-xl border border-gray-900 h-30px'
      />
      <button className="bg-blue-500 rounded-full py-2 px-3" onClick={fetchWeatherData}>search</button>
      <button className="bg-red-500 rounded-full py-2 px-3" onClick={handleAddCity}>Add to Dashboard</button>
      </div>

      <div className='flex w-full  '>

      <div className='flex flex-wrap m-20 px-2 py-2 w-[30%] h-[70%] text-white rounded-xl border border-gray-300 h-[40%] bg-gradient-to-r from-blue-400 to-blue-400'>
      {weatherData && (
        <div className='flex flex-col w-full'>
          <div className=' flex  flex-col my-4  px-2 text-xl font-bold w-full  '>
            <div className='flex justify-between w-full'>
              <p>{weatherData.name}</p>
              <p>{formattedTime}</p>
            
             
             </div>
           
            <div>{formattedDate}</div>
           </div>
          <div className='flex my-2  w-[90%] '> 
            <div className='flex w-full h-[100%]'>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
                alt="Weather Icon"
              />
              </div>
            <div className='flex flex-col my-5 text-white'>
              <div className='flex'>
              <div className='text-7xl'>{weatherData.main.temp}</div>
              <span className='text-xl font-bold'>°C</span>
              </div>
              <div className='text-xl font-bold pt-3'> {weatherData?.weather[0]?.description}</div>
              <p className='text-xl '> Feels like {weatherData?.main?.feels_like}</p>
          </div>
        </div>

        <div className='flex m-5 p-2 justify-center items-center'>
          <div className='p-2 w-[30%] '>
            <p>Humidity</p>
            {/* <img className=" w-[50%] h-[60%] " src={humidity} alt="windimg" /> */}
          <p>{weatherData?.main?.humidity}%</p>
          </div>
          <div className='p-2 w-[30%] '>
            <p>Pressure</p>
            {/* <img className=" w-[50%] h-[60%] " src={humidity} alt="windimg" /> */}
          <p>{weatherData?.main?.pressure}</p>
          </div>
          <div className='p-2 w-[30%]'>
          <p>Wind speed</p>
            {/* <img className=" w-[50%] h-[60%] " src={wind} alt="windimg" /> */}
          <p>{weatherData?.wind?.speed} Km/hr</p>
          </div>
          </div>
        </div>


      )}
      {error && <div className='flex  m-12 justify-center items-center text-xl font-bold'>{error}</div>}
      </div>
      {/* </div> */}

      <DashboardComponent />

</div>
    </div>
  
  );
}

export default Form;

