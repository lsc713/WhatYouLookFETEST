import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api/v1/weather`

export const useWeatherStore = defineStore('weather',()=>{
  const weatherList = ref([])
  const getWeatherList = function(longitude, latitude){
    axios.get(REST_API_URL,{
      params:{
        longitude: longitude,
        latitude: latitude
      }
    })
    .then((res)=>{
      console.log(res.data)
      console.log(res.data.response.body.items.item)
      weatherList.value = res.data.response.body.items.item
    })
    .catch((res)=>{
      console.log(res)
    })
  }
  return {getWeatherList,weatherList}
})
