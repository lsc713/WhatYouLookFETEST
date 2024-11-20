import { ref,watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useClothStore } from './cloth'

const REST_API_URL = `http://localhost:8080/api/v1/weather`

export const useWeatherStore = defineStore('weather',()=>{
  const weatherList = ref([])
  const currentTemperature = ref(null)
  const maxTemperature = ref(null)
  const getWeatherList = function(longitude, latitude){
    axios.get(REST_API_URL,{
      params:{
        longitude: longitude,
        latitude: latitude
      }
    })
    .then((res)=>{
      
      // console.log(res.data)
      // console.log(res.data.response.body.items.item)
      weatherList.value = res.data.response.body.items.item
    })
    .catch((res)=>{
      console.log(res)
    })
}

const getCurrentWeatherList = function(longitude, latitude){
  axios.get(`http://localhost:8080/api/v1/weather/2`,{
    params:{
      longitude: longitude,
      latitude: latitude
    }
  })
  .then((res)=>{
    const temperatureItem = res.data.response.body.items.item.find(item => item.category === "T1H")
    if(temperatureItem){
      currentTemperature.value = temperatureItem.fcstValue;
    }
    // console.log(res.data)
    // console.log(res.data.response.body.items.item)
    // weatherList.value = res.data.response.body.items.item
  })
  .catch((res)=>{
    console.log(res)
  })
}

const getTodayMaxTemperature = function(longitude, latitude){
  axios.get(`http://localhost:8080/api/v1/weather/3`,{
    params:{
      longitude: longitude,
      latitude: latitude
    }
  })
  .then((res)=>{
    const temperatureItem = res.data.response.body.items.item.find(item => item.category === "TMX")
    if(temperatureItem){
      maxTemperature.value = temperatureItem.fcstValue;
    }
    // console.log(res.data)
    // console.log(res.data.response.body.items.item)
    // weatherList.value = res.data.response.body.items.item
  })
  .catch((res)=>{
    console.log(res)
  })
}

const getPTY = ref(null);
const getPYTNow = function(longitude, latitude){
  axios.get(`http://localhost:8080/api/v1/weather/4`,{
    params:{
      longitude: longitude,
      latitude: latitude
    }
  })
  .then((res)=>{
    const temperatureItem = res.data.response.body.items.item.find(item => item.category === "TMX")
    if(temperatureItem){
      getPTY.value = temperatureItem.fcstValue;
    }
    // console.log(res.data)
    // console.log(res.data.response.body.items.item)
    // weatherList.value = res.data.response.body.items.item
  })
  .catch((res)=>{
    console.log(res)
  })
}

  return {getWeatherList,weatherList,currentTemperature,getCurrentWeatherList,maxTemperature,getTodayMaxTemperature,getPTY,getPYTNow}
})
