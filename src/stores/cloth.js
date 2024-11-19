import {defineStore} from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export const useClothStore = defineStore('cloth',()=>{
    const clothes = ref({tops:[],bottoms:[],outers:[],shoes:[]})


    const getClothesRecommendation = (temperature)=>{
        axios.get('http://localhost:8080/api/v1/cloth',{
            params: {temperature}
            })
            .then((response)=>{
              clothes.value = response.data
              console.log(clothes.value.tops)
            })
            .catch ((error)=>{
            console.log('clothes reommendation failed',error)
        });
    }
    const temperature = ref(null)
    const setTemperature = (temp) =>{
        temperature.value = temp
        // getClothesRecommendation(temp)
    }
    return {clothes,getClothesRecommendation,setTemperature,temperature}
})