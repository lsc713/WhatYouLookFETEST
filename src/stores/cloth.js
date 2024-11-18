import {defineStore} from 'pinia'
import axios from 'axios'
import {ref} from 'vue'

export const useClothStore = defineStore('cloth',()=>{
    const clothes = ref([])


    const getClothesRecommendation = async (temperature)=>{
        try{
            const response = await axios.get('http://localhost:8080/api/v1/cloth',{
            params: {temperature}
            })
            console.log(response.data)
            clothes.value = response.data
        } 
        catch (error){
            console.log('clothes reommendation failed',error)
        }
    }
    const temperature = ref(null)
    const setTemperature = (temp) =>{
        temperature.value = temp
        getClothesRecommendation(temp)
    }
    return {clothes,getClothesRecommendation,setTemperature}
})