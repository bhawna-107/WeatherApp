// import React, { useEffect, useState } from 'react' 
// import axios from 'axios';
// function form() {

//     const [query, setQuery] = useState<string>('');
//     const [weatherData, setWeatherData] = useState<any>('');
//     const [error, setError] = useState<any>('')


//         const fetchWeatherData = async () => {
//             try{
//                 const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=f1ac97e0781dcc6481c178f9c34a758b&units=metric`);
//                 setWeatherData(data?.data);
//                 // setError("");
//                 console.log(data);

//             }catch(Error){
//                 console.log("error fetching data",Error);
//                 // setWeatherData("");
//                 setError(Error);

//             }
//         }

//   return (
//     <div>
//         <input type='text' placeholder='Enter city name' value={query} onChange={(e) => setQuery(e.target.value)}/>
//         <button onClick={fetchWeatherData}>Search</button>
//         {
//   error ? (
//     <div>City Not found</div>
//   ) : (
//     weatherData && (
//       <div>
//         <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`} />
//         {weatherData?.main?.temp}
//         {weatherData?.name}
//       </div>
//     )
//   )
// }

            
      
//     </div>
//   )
// }

// export default form;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [query, setQuery] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=f1ac97e0781dcc6481c178f9c34a758b&units=metric`
        );
        setWeatherData(data);
        setError('');
      } catch (err) {
        console.error('Error fetching data', err);
        setWeatherData(null);
        setError('City not found');
      }
    };

    if (query) {
      fetchWeatherData();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>Search</button>
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
    </div>
  );
}

export default Form;

