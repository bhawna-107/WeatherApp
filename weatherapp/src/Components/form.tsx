import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, removeCity } from '../Redux/slices/citySlices';
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
      
      // Dispatch action to add the city to Redux state
      // dispatch(addCity({ name: query, temperature: data.main.temp }));
    } catch (err) {
      console.error('Error fetching data', err);
      setWeatherData(null);
      setError('City not found');
    }
  };

  const handleAddCity = () => {
    // Dispatch action to add the city to Redux state
    dispatch(addCity({ name: query, temperature: weatherData.main.temp }));
  };


  const handleRemoveCity = (cityName: string) => {
    // Dispatch action to remove the city from Redux state
    dispatch(removeCity(cityName));
  };

  return (
    <div className='flex justify-center items-center m-5'>
    <div className='bg-red-300'>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>hello</p>
      {weatherData && (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
            alt="Weather Icon"
          />
          <div>Temperature: {weatherData.main.temp}°C</div>
          <div>City: {weatherData.name}</div>
        </div>
      )}
      {error && <div>{error}</div>}
      <button onClick={fetchWeatherData}>search</button>
      <button onClick={handleAddCity}>Add to Dashboard</button>

      {cities.map((city: any) => (
        <div key={city.name}>
          <div>City: {city.name}</div>
          <div>Temperature: {city.temperature}°C</div>
          <button onClick={() => handleRemoveCity(city.name)}>Remove</button>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
    </div> 
  );
}

export default Form;

