import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeCity } from '../Redux/slices/citySlices';


function Form() {
  const dispatch = useDispatch();
  const cities = useSelector((state: any) => state.city.cities);


  const handleRemoveCity = (cityName: string) => {
    // Dispatch action to remove the city from Redux state
    dispatch(removeCity(cityName));
  };

  return (
  <div className='flex flex-col text-white glass-background px-4 w-full rounded-xl shadow-xl hover:shadow-2xl'>
  <div className='m-2'>
    {cities.length > 0 ? (
      cities.map((city: any) => (
        <div key={city.name} className='sm:flex flex justify-between items-center gap-5'>
          <div className='flex gap-5 items-center'>
            <img src={city?.iconUrl} alt={city.name} />
            <div>{city.name}</div>
            <div>{city.temperature}°C</div>
          </div>
          <div>
            <button className="bg-blue-100 text-blue-500 rounded-xl py-1 px-3 m-5 h-[50%]" onClick={() => handleRemoveCity(city.name)}>Remove</button>
          </div>
        </div>
      ))
    ) : (
      <div className=' flex justify-center items-center text-xl'> 
        <p className='text-white'>Add cities to dashboard</p>
      </div>
    )}
  </div>
</div>
  );
}

export default Form;

