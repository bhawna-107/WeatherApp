import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useDispatch} from 'react-redux';
import { addCity } from '../Redux/slices/citySlices';
import DashboardComponent from './dashboardComponent';
import wind from '../assets/wind.png';
import humidity1 from '../assets/humidity1.png';
import pressure from '../assets/pressure.png';
import Forecast from './forecast';
import visibility from '../assets/visibility.png';

function Form() {

  const currentDate: Date = new Date();
  const [query, setQuery] = useState<string>('Delhi');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

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
      setError('City Not found');
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

  return (
  <div className='w-full flex bg-blue-700 p-5 bg-cover h-[100%] '>
    <div className='w-full flex flex-col p-5  '>
    <div className='flex flex-row gap-5 justify-end w-[100%]'>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='md:w-[28.5%] p-2 rounded-xl border border-gray-900 h-30px'
      />
      <button className="bg-blue-100 text-blue-500 rounded-full py-2 px-3" onClick={handleAddCity}>Add to Dashboard</button>
    </div>

  <div className='w-full lg:flex gap-10 my-10'>
  <div className=' relative lg:w-[70%] bg-cover bg-image'>
  {weatherData ? (
    <div className='flex flex-col w-full absolute top-2 px-8 z-10 text-white'>
      <div className=' flex flex-col text-xl font-bold w-full'>
        <div className='flex justify-between w-full'>
          <p>{weatherData?.name ? weatherData?.name : "N/A"}</p>
          <p>{formattedTime ? formattedTime : "N/A"}</p>
        </div>
        <div>{formattedDate ? formattedDate :"N/A"}</div>
      </div>
      <div className='flex w-[90%] justify-between '>
        <div className='flex w-full h-[100%]'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
            alt="Weather Icon"
            className='sm:w-[35%] w-full h-full sm:h-[50%] '
          />
        </div>
        <div className='flex flex-col text-white'>
          <div className='flex justify-center w-full '>
            <div className='sm:text-7xl text-4xl'>{weatherData.main.temp ? weatherData.main.temp : "N/A"}</div>
            <span className='text-xl font-bold'>°C</span>
          </div>
          <div className='text-xl font-bold pt-3 w-full'>{weatherData?.weather[0]?.description ? weatherData?.weather[0]?.description : "N/A" }</div>
          <p className='text-xl'>Feels like {weatherData?.main?.feels_like ? weatherData?.main?.feels_like : "N/A"}</p>
        </div>
      </div>
    </div>
  ) : <div>
  {error && <div className='flex text-white text-2xl justify-center items-center '>City not found</div>}
</div>}
  {/* <img className='w-full h-[50%] rounded-xl relative z-0 object-cover' src={frontbg} alt="frontbg" /> */}
  </div>
 
  <div className='flex lg:w-1/2 w-full h-[100%] lg:mt-0 mt-7'>
    <div className='w-full  py-8  text-white glass-background text-blue-500 text-xl rounded-xl shadow-xl hover:shadow-2xl'>
      <div className='flex w-full justify-between px-8'>
        <div className='p-2 flex items-center gap-4 w-full'>
            <div className='justify-center items-center w-[15%]' >              
              <img className="w-full h-full" src={humidity1} alt="windimg" />
            </div>
           <div className='flex flex-col'>
            <p>Humidity</p>
            <p className=''>{weatherData?.main?.humidity}%</p>
           </div>
        </div>

        <div className='p-2 flex items-center gap-4 w-full'>
          <div className='justify-center items-center w-[15%]' >              
            <img className=" w-full h-full " src={pressure} alt="pressure" />
          </div>
          <div className='justify-center'>
              <p>Pressure</p>
              <p>{weatherData?.main?.pressure}</p>
          </div>
          </div>
        </div>

     <div className='flex w-full justify-between px-8'>
        <div className='p-2 flex items-center gap-4  w-full'>
          <div className='justify-center items-center w-[15%]' >              
            <img className=" w-full h-full" src={visibility} alt="windimg" />
          </div>
          <div className='justify-center'>
            <p>Visibility</p>
            <p>{weatherData?.visibility}</p>
          </div>
        </div>

        <div className='p-2  flex items-center gap-4 w-full'>
          <div className='justify-center items-center w-[15%]' >              
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
    <div className='w-full flex  xl:gap-14 gap-8  flex-wrap'>
  <div  className='xl:w-[26%] w-full lg:mt-0 mt-64 flex'><DashboardComponent /></div>
  <div className='xl:w-[70%]  w-full flex'><Forecast query= {query} /></div> 
  </div>
  </div>
  
          </div>
  );
}

export default Form;

