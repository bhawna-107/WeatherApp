import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, removeCity } from '../Redux/slices/citySlices';
import DashboardComponent from './dashboardComponent';
import frontbg from  '../assets/frontimg.jpg';
import wind from '../assets/wind.png';
import humidity1 from '../assets/humidity1.png';
import pressure from '../assets/pressure.png';

function Form() {

  const currentDate: Date = new Date();
  const [query, setQuery] = useState<string>('Delhi');
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

  useEffect(() => {
    
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
  fetchWeatherData();

  }, [query]);

  const handleAddCity = () => {
    if(query)
    // Dispatch action to add the city to Redux state
  { 
    dispatch(addCity({ name: query, temperature: weatherData.main.temp, iconUrl : `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png` }));
  }
  };


  const handleRemoveCity = (cityName: string) => {
    // Dispatch action to remove the city from Redux state
    dispatch(removeCity(cityName));
  };

  return (
    <div>
  <div className='w-full flex flex-col bg-gradient-to-r from-gray-100 to-gray-100 p-5 h-screen overflow-y-hidden'>
    <div className='flex flex-row gap-5 justify-end w-[100%]'>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-[30%] p-2 rounded-xl border border-gray-900 h-30px'
      />
      <button className="bg-blue-500 rounded-full py-2 px-3">search</button>
      <button className="bg-red-500 rounded-full py-2 px-3" onClick={handleAddCity}>Add to Dashboard</button>
    </div>
    
    <div className='my-4 relative '>
  {weatherData && (
    <div className='flex flex-col w-full absolute top-10  px-8 z-10 text-white'>
      <div className=' flex flex-col text-xl font-bold w-full'>
        <div className='flex justify-between w-full'>
          <p>{weatherData.name}</p>
          <p>{formattedTime}</p>
        </div>
        <div>{formattedDate}</div>
      </div>
      <div className='flex w-[90%] justify-between '>
        <div className='flex w-full h-[100%]'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
            alt="Weather Icon"
            className='w-[15%] h-[50%] '
          />
        </div>
        <div className='flex flex-col text-white'>
          <div className='flex'>
            <div className='text-7xl'>{weatherData.main.temp}</div>
            <span className='text-xl font-bold'>°C</span>
          </div>
          <div className='text-xl font-bold pt-3'>{weatherData?.weather[0]?.description}</div>
          <p className='text-xl'>Feels like {weatherData?.main?.feels_like}</p>
        </div>
      </div>
    </div>
  )}
  <img className='w-full h-[20%] rounded-xl relative z-0' src={frontbg} alt="frontbg" />
  
  <div className='w-full flex  gap-12 my-10 flex-wrap'>
  <div className='w-[30%] flex'><DashboardComponent /></div>
    <div className='w-[30%]  py-8  text-black bg-gray-200 text-blue-500 text-xl rounded-xl shadow-xl hover:shadow-2xl'>
      <div className='flex w-full justify-between px-8'>
        <div className='p-2 flex items-center gap-4'>
            <div className='justify-center items-center' >              
              <img className="w-full h-full" src={humidity1} alt="windimg" />
            </div>
           <div className='flex flex-col text-black '>
            <p>Humidity</p>
            <p className='text-black'>{weatherData?.main?.humidity}%</p>
           </div>
        </div>

        <div className='p-2 flex items-center gap-4'>
          <div className='justify-center items-center' >              
            <img className=" w-full h-full " src={pressure} alt="pressure" />
          </div>
          <div className='justify-center'>
              <p>Pressure</p>
              <p>{weatherData?.main?.pressure}</p>
          </div>
          </div>
        </div>

     <div className='flex w-full justify-between px-8'>
        <div className='p-2 flex items-center gap-4'>
          <div className='justify-center items-center' >              
            <img className=" w-full h-full" src={humidity1} alt="windimg" />
          </div>
          <div className='justify-center'>
            <p>Humidity</p>
            <p>{weatherData?.main?.humidity}%</p>
          </div>
        </div>

        <div className='p-2  flex items-center gap-4 '>
          <div className='justify-center items-center' >              
            <img className=" w-full h-full" src={wind} alt="windimg" />
          </div>
          <div className='flex  flex-col justify-end'>
            <p>Speed</p>
            <p>{weatherData?.wind?.speed}Km/hr</p>
          </div>
        </div>
     </div>
    
          </div>

          </div>
         
          </div>

</div>



</div>
  );
}

export default Form;

