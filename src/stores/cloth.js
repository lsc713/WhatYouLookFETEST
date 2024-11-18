import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useClothStore = defineStore('cloth',()=>{
    const clothes = ref([])
    return {clothes}
})