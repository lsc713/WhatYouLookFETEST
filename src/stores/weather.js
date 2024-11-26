import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_URL = `${import.meta.env.VUE_APP_API_URL}/api/v1/weather`;
console.log(REST_API_URL)

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([]);
  const currentTemperature = ref(null);
  const maxTemperature = ref(null);
  const getPTY = ref(null);
  const SKY = ref(null);

  // 공통 API 호출 함수
  const fetchWeatherData = async (endpoint, longitude, latitude, callback) => {
    try {
      const res = await axios.get(`${REST_API_URL}${endpoint}`, {
        params: {
          longitude: longitude,
          latitude: latitude,
        },
      });
      callback(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherList = (longitude, latitude) => {
    fetchWeatherData('/TMN', longitude, latitude, (res) => {
      weatherList.value = res.data.response.body.items.item;
    });
  };

  const getCurrentWeatherList = (longitude, latitude) => {
    fetchWeatherData('/CurrentTMP', longitude, latitude, (res) => {
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'T1H'
      );
      if (temperatureItem) {
        currentTemperature.value = temperatureItem.fcstValue;
      }
    });
  };

  const getTodayMaxTemperature = (longitude, latitude) => {
    fetchWeatherData('/TMX', longitude, latitude, (res) => {
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'TMX'
      );
      if (temperatureItem) {
        maxTemperature.value = temperatureItem.fcstValue;
      }
    });
  };

  const getPYTNow = (longitude, latitude) => {
    fetchWeatherData('/PTY', longitude, latitude, (res) => {
      
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'PTY'
      );
      
      if (temperatureItem.fcstValue==0) {
        getPTY.value = temperatureItem.fcstValue;
        // console.log(getPTY.value)
        if(getPTY.value==0){
          fetchWeatherData('/SKY',longitude,latitude,(res)=>{
            SKY.value = res.data.response.body.items.item.find(
              (item) => item.category === 'SKY'
            )
          })
        }
      }
    });
  };

  return {
    SKY,
    getWeatherList,
    weatherList,
    currentTemperature,
    getCurrentWeatherList,
    maxTemperature,
    getTodayMaxTemperature,
    getPTY,
    getPYTNow,
  };
});
