<template>
    <div>
        <div v-if="store.weatherList.length > 0">
            <h3 class="text-center ">날씨 정보</h3>
            <hr>
            <div class="container text-center background-image">
                <div class="row justify-content-start ">
                </div>
                <div class="row justify-content-center">
                    <div class="col-4 border border-info p-2 mb-2 border-opacity-75">
                        일 최고 기온 (TMX): {{ maxTmp }}°C
                    </div>
                    <div class="col-4 border border-info p-2 mb-2 border-opacity-50">
                        일 최저 기온 (TMN): {{ tmn }}°C
                    </div>
                    <!-- <i :class="weatherIcon" class="iconSize">{{ tmp }}°C</i> -->
                    <i :class="weatherIcon" class="iconSize">{{ curTmp }}°C</i>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4 border border-info p-2 mb-2 border-opacity-10">
                        강수확률 (POP): {{ pop }}%
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <hr>

    </div>
</template>


<script setup>
import { useClothStore } from '@/stores/cloth';
import { useWeatherStore } from '@/stores/weather';
import { ref, onMounted, watch, computed } from 'vue';
const store = useWeatherStore();

const longitude = ref("");
const latitude = ref("");

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            longitude.value = position.coords.longitude;
            latitude.value = position.coords.latitude;
            store.getWeatherList(longitude.value, latitude.value);
            store.getCurrentWeatherList(longitude.value, latitude.value);
            store.getTodayMaxTemperature(longitude.value, latitude.value);
            store.getPYTNow(longitude.value, latitude.value);
        })
    }
}
const weatherIcon = computed(() => {
    if (pty.value == 0) {
        switch (sky.value) {
            case "1":
                return "bi bi-brightness-high-fill";
            case "3":
                return "bi bi-cloudy-fill";
            case "4":
                return "bi bi-cloud";
            default:
                return "bi-sun";
        }
    } else {
        switch (pty.value) {
            case "1":
                return "bi bi-cloud-drizzle-fill";
            case "2":
                return "bi bi-cloud-sleet-fill";
            case "3":
                return "bi bi-cloud-snow-fill";
            default:
                return "bi bi-cloud-drizzle-fill";
        }
    }


})
const curTmp = ref(null);
const maxTmp = ref(null);
const tmp = ref(null);
const sky = ref(null);
const pty = ref(null);
const pop = ref(0);
const tmn = ref(null);
const tmx = ref(null);

onMounted(() => {
    getUserLocation();
})
const mapWeatherData = () => {
    const weatherData = store.weatherList
    const currentTemperature = store.currentTemperature
    curTmp.value = currentTemperature;
    maxTmp.value = store.maxTemperature;
    pty.value = store.getPTY;
    console.log(weatherData)
    weatherData.forEach((item) => {
        switch (item.category) {
            case 'TMP':
                tmp.value = item.fcstValue;
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
const clothStore = useClothStore();
watch(() => store.weatherList, () => {
    const temp = store.weatherList.find(item => item.category === 'TMP')?.fcstValue;
    if (temp) clothStore.setTemperature(Number(temp))
}, { immediate: true }) 
watch(() => store.weatherList, mapWeatherData, { immediate: true });
watch(()=>store.currentTemperature, mapWeatherData, { immediate: true })
watch(()=>store.maxTemperature, mapWeatherData, { immediate: true })
watch(()=>store.getPTY, mapWeatherData, { immediate: true })
</script>

<style >
/* 전역 스타일로 body에 대한 스타일을 정의 */
body {
    --rg-gradient-a-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(250, 236, 248, 0.25) 7.63%, rgba(196, 188, 252, 0.25) 37.94%, rgba(0, 234, 255, 0.25) 65.23%, rgba(193, 255, 251, 0.25) 92.12%);
    --rg-gradient-b-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-c-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(187, 178, 252, 0.25) 37.94%, rgba(124, 244, 255, 0.25) 65.23%, rgba(143, 255, 248, 0.25) 92.12%);
    background:
        var(--rg-gradient-a-25),
        var(--rg-gradient-b-25),
        var(--rg-gradient-c-25);
    background-position: 0% 0%;
    background-repeat: no-repeat;
    background-size: 600% 600%; /* 배경 크기를 더 크게 설정 */
    height: 100vh;
    margin: 0;
    padding: 0;
    animation: flowingBackground 30s ease infinite; /* 애니메이션을 더 느리게 하여 흐름을 더 부드럽게 */
}

/* 흐르는 배경 애니메이션 */
@keyframes flowingBackground {
    0% {
        background-position: 0% 0%;
    }
    25% {
        background-position: 50% 50%;
    }
    50% {
        background-position: 100% 0%;
    }
    75% {
        background-position: 50% 50%;
    }
    100% {
        background-position: 0% 0%;
    }
}


.background-image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

.iconSize {
    font-size: 100px;
}

</style>