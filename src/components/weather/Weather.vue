<template>
    <div>
        <div v-if="store.weatherList.length>0">
            <h3>날씨 정보</h3>
            <div>
                <p>현재 기온 (TMP): {{ tmp }}°C</p>
                <p>일 최저 기온 (TMN): {{ tmn }}°C</p>
                <p>일 최고 기온 (TMX): {{ tmx }}°C</p>
                <p>하늘 상태 (SKY): {{ sky }}</p>
                <p>강수형태 (PTY): {{ pty }}</p>
                <p>강수확률 (POP): {{ pop }}%</p>
            </div>
        </div>
        <div v-else>
            <p>ㄱㄷㄱㄷzz11</p>
        </div>
        
        <hr>
    </div>
</template>


<script setup>
import {useWeatherStore} from '@/stores/weather';
import { ref,onMounted,watch } from 'vue';
const store = useWeatherStore();

const longitude = ref("");
const latitude = ref("");

const getUserLocation = ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            longitude.value = position.coords.longitude;
            latitude.value = position.coords.latitude;
            store.getWeatherList(longitude.value,latitude.value);
        })
    }
}

const tmp = ref(null);
const sky = ref(null);
const pty = ref(null);
const pop = ref(0);
const tmn = ref(null);
const tmx = ref(null);

onMounted(()=>{
    getUserLocation();
})
const mapWeatherData = () =>{
    const weatherData = store.weatherList
    console.log(weatherData)
    weatherData.forEach((item)=>{
        switch(item.category){
            case 'TMP':
                tmp.value=item.fcstValue;
                break;
            case 'TMN':
                tmn.value = item.fcstValue;
                break;
            case 'TMX':
                tmx.value = item.fcstValue;
                break;
            case 'SKY':
                sky.value = item.fcstValue;
                break;
            case 'PTY':
                pty.value = item.fcstValue;
                break;
            case 'POP':
                pop.value = item.fcstValue;
                break;
            default:
                break;
        }
    })
}
watch(()=> store.weatherList,mapWeatherData,{immediate:true});
</script>

<style lang="scss" scoped>

</style>