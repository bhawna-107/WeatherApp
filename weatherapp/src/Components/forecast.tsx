import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';


function Forecast({query}) {

  const [forecastData, setForecastData] = useState<any>(null);


  function formatDate(dateString:string) {
    const dateTime = new Date(dateString);

    const formattedDate = dateTime.toLocaleDateString('en-US',{
        month: 'long',
        day: '2-digit',
        year: "numeric",
      })
      return formattedDate;
  };

  useEffect(() => {
    
    const fetchForecastWeather = async () => {
      try {
        const resp = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=f1ac97e0781dcc6481c178f9c34a758b&units=metric`
        );
        setForecastData(resp);
        // setError('');
        console.log(resp);
        
        // Dispatch action to add the city to Redux state
        // dispatch(addCity({ name: query, temperature: data.main.temp }));
      } catch (err) {
        console.error('Error fetching data', err);
        setForecastData(null);
        // setError('City not found');
      }
    };
    fetchForecastWeather();
  
    }, [query]);

    const newDataArray = [];

    for (let i=3;i<forecastData?.data?.list.length; i++){

        const listItem = forecastData.data.list[i];
        const temp = listItem?.main?.temp;
        const weatherDescription = listItem?.weather[0]?.main;
        const iconUrl = listItem?.weather[0]?.icon;
        const dateTimeString = listItem.dt_txt;
        const formattedDate = formatDate(dateTimeString);

        const newForecastData = {
            temp: temp,
            weatherDescription: weatherDescription,
            iconUrl: `https://openweathermap.org/img/wn/${iconUrl}.png`,
            formattedDate: formattedDate,
        }


        newDataArray.push(newForecastData);
        i+=7;
    }

    console.log(newDataArray);

  return (
    <div className='w-full flex flex-col p-5 rounded-xl text-white shadow-xl hover:shadow-2xl glass-background'>
  <p className='text-xl'>5 Days Forecast</p>
  <div className='flex flex-wrap mt-2'>
    {newDataArray.map((data, index) => (
      <div key={index} className='sm:flex sm:flex-col flex flex-col flex-wrap gap-4 m-2 bg-blue-600 shadow-xl hover:shadow-2xl glass-background border border-gray-300 px-6'>
        <div className='sm:flex flex flex-col flex-wrap px-3 py-4 justify-center items-center'>
          <p>{data.formattedDate}</p> 
          <img className='w-full' src={data.iconUrl} alt="weatherimage" />
          <div className='flex gap-1'>
            <p>{data.temp}</p>
            <span>°C</span>
          </div>
          <p>{data.weatherDescription}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    // <div className='w-full flex flex-col p-5  rounded-xl text-white shadow-xl hover:shadow-2xl glass-background'>
    //   <p className='text-xl'>5 Days Forecast</p>
    //     <div className=' flex mt-2'>
    //         {newDataArray.map((data,index)=> (
    //             <div key={index} className='sm:flex flex-col flex-wrap  gap-4 m-2 bg-blue-600 shadow-xl hover:shadow-2xl glass-background border border-gray-300 px-6'>
    //               <div className='sm:flex flex flex-col flex-wrap px-4 py-4 justifuy-center items-center'>
    //               <p>{data.formattedDate}</p> 
    //               <img className='w-full' src={data.iconUrl} alt="weatherimage" />
                  
    //               <div className='flex gap-1'><p> {data.temp}</p>
    //               <span>°C</span></div>
    //               <p>{data.weatherDescription}</p>
    //               </div>
    //             </div>
    //         ))}
    //     </div>
    // </div>
  );
}

export default Forecast;