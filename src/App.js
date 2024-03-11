import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdSearch, IoMdThunderstorm } from 'react-icons/io';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer,BsWind} from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

const APIkey = 'c708fb3385169d5e02dacbe0ed9783ad';

const App = () => {
const [data, setData] = useState(null);
const [location, setLocation] = useState('Bucharest');
const []

//fetch data
useEffect(() => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
  axios.get(url).then(res => {
    setData(res.data)
  })
}, [location]);

//if data is false show  loader

if(!data) {
  return (
    <div>
      <div>
        <ImSpinner8 className="text-5xl animate-spin"/>
      </div>
    </div>
  )
};

//set the icon according to the weather

let icon;

switch(data.weather[0].main) {
  case 'Clouds':
    icon = <IoMdCloudy/>;
    break;
  case 'Haze':
    icon = <BsCloudHaze2Fill/>;
    break;
  case 'Rain':
    icon = <IoMdRainy/>;
    break;
  case 'Clear':
    icon = <IoMdSunny/>;
    break;
  case 'Drizzle':
    icon = <BsCloudDrizzleFill/>;
    break
  case 'Snow':
    icon = <IoMdSnow/>;
    break;
  case 'Thunderstorm':
    icon = <IoMdThunderstorm/>;
    break
}

//date data

const date = new Date()


  return (
  <div className="w-100% h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
    {/* Form */}
    <form className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
      <div className="h-full relative flex justify-between items-center p-4 text-[16px] font-light pl-6 ">
        <input className="flex-1 bg-transparent outline-none placeholder:text-white text-white h-full" type="text" placeholder="Search by city or country"/>
        <button className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition">
          <IoMdSearch className="text-2xl text-white"/>
        </button>
      </div>
    </form>
    {/* card */}
    <div className="w-full max-w-[450px] min-h-[580px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 bg-black/20">
      <div>
        {/* card top */}
        <div className="flex items-center gap-x-5">
          {/* icon */}
          <div className="text-[82px]">{icon}</div>
          <div>
            {/* country name */}
            <div className="text-2xl font-semibold ">
              {data.name}, {data.sys.country}
            </div>
            {/* date */}
            <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
          </div>

        </div>
        {/* card body */}
        <div className="my-20">
          <div className="flex justify-center">
            {/* temp */}
            <div className="text-[122px] leading-none font-light">{parseInt(data.main.temp)}</div>
            {/* celsius */}
            <div className="text-4xl"><TbTemperatureCelsius/></div>
          </div>
          <div>
            {/* weather description */}
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
        </div>
        {/* card bottom */}
        <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              {/*icon*/}
              <div className="text-[20px]">
                <BsEye/>
              </div>
              <div>
                Visibility <span className="ml-2">{data.visibility / 1000} km</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {/*icon*/}
              <div className="text-[20px]">
                <BsThermometer/>
              </div>
              <div className="flex">
                Feels Like <div className="flex ml-2">{parseInt(data.main.feels_like)} <TbTemperatureCelsius/></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              {/*icon*/}
              <div className="text-[20px]">
                <BsWater/>
              </div>
              <div>
                Humidity <span className="ml-2">{data.main.humidity} %</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {/*icon*/}
              <div className="text-[20px]">
                <BsWind/>
              </div>
              <div>
                Wind <span className="ml-2">{parseInt(data.wind.speed)} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default App;
