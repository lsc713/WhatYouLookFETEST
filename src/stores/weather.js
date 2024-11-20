import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_URL = `http://localhost:8080/api/v1/weather`;

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref([]);
  const currentTemperature = ref(null);
  const maxTemperature = ref(null);
  const getPTY = ref(null);

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
    fetchWeatherData('', longitude, latitude, (res) => {
      weatherList.value = res.data.response.body.items.item;
    });
  };

  const getCurrentWeatherList = (longitude, latitude) => {
    fetchWeatherData('/2', longitude, latitude, (res) => {
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'T1H'
      );
      if (temperatureItem) {
        currentTemperature.value = temperatureItem.fcstValue;
      }
    });
  };

  const getTodayMaxTemperature = (longitude, latitude) => {
    fetchWeatherData('/3', longitude, latitude, (res) => {
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'TMX'
      );
      if (temperatureItem) {
        maxTemperature.value = temperatureItem.fcstValue;
      }
    });
  };

  const getPYTNow = (longitude, latitude) => {
    fetchWeatherData('/4', longitude, latitude, (res) => {
      const temperatureItem = res.data.response.body.items.item.find(
        (item) => item.category === 'TMX'
      );
      if (temperatureItem) {
        getPTY.value = temperatureItem.fcstValue;
      }
    });
  };

  return {
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
