import axios from 'axios'
import React, { useEffect, useState } from 'react'
import clear from './assets/images/clear.png'
import clouds from "./assets/images/clouds.png";
import rain from "./assets/images/rain.png";
import drizzle from "./assets/images/drizzle.png";
import mist from "./assets/images/mist.png";
import snow from "./assets/images/snow.png";
import humidity from './assets/images/humidity.png'
import wind from './assets/images/wind.png'


export default function App() {

  const [isLoading, setisLoading] = useState(false)
  const [allData, setallData] = useState(null)
  const [cityName, setCityName] = useState(`cairo`)
  const [searchValue, setSearchValue] = useState("")


  function checkWeather(cityName) {
    setisLoading(true)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=53d466e45b173002a580d785ffb5f74e&units=metric`)

      .then(response => {
        setallData(response.data)
        console.log(response.data)
      })

      .catch(error => console.log(error))

      .finally(() => setisLoading(false))
  }

  useEffect(() => {
    checkWeather(cityName)
  }, [])

  function handleSearch() {
    if (searchValue.trim() !== "") {
      checkWeather(searchValue);
      setCityName(searchValue);
    }
  }

  if (isLoading) {
    return (<>
      <div className='flex justify-center items-center w-full h-screen bg-[#222] '>
        <section className="dots-container">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </section>
      </div></>)
  }

  const weatherIcons = {
    Clear: clear,
    Clouds: clouds,
    Rain: rain,
    Drizzle: drizzle,
    Mist: mist,
    Snow: snow,
  };


  return (
    <div className='h-screen w-full flex justify-center items-center'>

      <div className="bg-[linear-gradient(135deg,#00feba,#5b548a)] card w-[90%] max-w-[500px]  mx-auto  text-white  rounded-[20px] py-[40px] px-[35px] text-center ">
        <div className="search w-full flex justify-between items-center gap-4  relative overflow-hidden">
          <input onChange={(e) => setSearchValue(e.target.value)} className='search border-0 outline-none bg-color-active text-[#555]  py-[10px] px-[25px] h-[60px] w-full rounded-[30px] text-[18px]  ' type="text" placeholder='Enter a city name' spellCheck='false' />
          <button onClick={handleSearch} className='bg-[linear-gradient(90deg,#00feba,#5b548a)] border-none outline-none rounded-full min-w-[60px] min-h-[60px] cursor-pointer shadow-2xl absolute right-0'>
            <i className="fa-solid fa-magnifying-glass text-[20px] text-[#555] "></i>
          </button>
        </div>

        <div className="weather">
          <img src={weatherIcons[allData?.weather[0].main] || clear} className='weatherIcon mx-auto w-[170px] mt-[30px] ' />
          <p className='mb-[-10px] text-[18px]'>{allData?.weather[0].main}</p>
          <h1 className="temp text-[80px] font-[500] ">{Math.round(allData?.main.temp)}°c</h1>
          <h2 className="city text-[45px] font-[400] mt-[-10px] ">{allData?.name}</h2>

          <div className='details w-full flex justify-between items-center  mt-[30px] gap-4 '>

            <div className="col flex items-center text-left gap-2  ">
              <img className='w-8 md:w-[40px] ' src={humidity} alt="" />
              <div>
                <p className="humidity text-[24px] mt-[-6] ">{allData?.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col flex items-center text-left gap-3  ">
              <img className='w-8 md:w-[40px] ' src={wind} alt="" />
              <div>
                <p className="wind text-[24px] mt-[-6] ">{allData?.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
