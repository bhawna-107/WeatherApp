import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, removeCity } from '../Redux/slices/citySlices';
import wind from '../assets/wind.png';
import  humidity from '../assets/humidity.png';

function Form() {
  const [query, setQuery] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const cities = useSelector((state: any) => state.city.cities);

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
    if(query && weatherData && !error)
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
    
<div className='flex flex-col text-white m-10 w-[25%]  border border-gray-800 bg-gradient-to-r from-blue-400 to-blue-400 '>
{cities.map((city: any) => (
  <div className='flex  gap-8 justify-between '>
        <div key={city.name} className='p-5 flex gap-5 justify-center items-center'>
        <div><img src={city?.iconUrl} /></div>
          <div>{city.name}</div>

          <div> {city.temperature}°C</div>
          </div>
          <div className='flex'> <button className="bg-blue-100  text-blue-500 rounded-xl py-1 px-3 m-5 h-[50%]" onClick={() => handleRemoveCity(city.name)}>Remove</button>
</div>
        </div>
      ))}
      {error && <div>{error}</div>}
</div>

    
  
  );
}

export default Form;

