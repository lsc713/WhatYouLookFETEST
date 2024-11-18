import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useClothStore = defineStore('cloth',()=>{
    const clothes = ref([])


    const getClothesRecommendation = async (temperature)=>{
        try{
            const response = await axios.get('http://localhost:8080/api/v1/cloth',{
            params: {temperature}
            })
            clothes.value = response.data
        } 
        catch (error){
            console.log('clothes reommendation failed',error)
        }
    }
    return {clothes}
})