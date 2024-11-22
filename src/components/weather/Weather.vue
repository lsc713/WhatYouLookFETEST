<template>
    <div>
        <div v-if="store.weatherList.length > 0">
            <h3 class="text-center ">날씨 정보</h3>
            <hr>
            <div class=" container text-center background-image">
                <div class="row justify-content-start ">
                </div>
                <div class="row justify-content-center">
                    <div class="col-4 border  p-2 mb-2 border-opacity-75">
                        일 최고 기온 (TMX): {{ maxTmp }}°C
                    </div>
                    <div class="col-4 border  p-2 mb-2 border-opacity-50">
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
    const weatherData = store.weatherList;
    const currentTemperature = store.currentTemperature;
    curTmp.value = currentTemperature;
    maxTmp.value = store.maxTemperature;
    pty.value = store.getPTY;
    sky.value = store.SKY;
    // console.log(weatherData);
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
}, { immediate: true });

watch(() => store.weatherList, mapWeatherData, { immediate: true });
watch(() => store.currentTemperature, mapWeatherData, { immediate: true });
watch(() => store.maxTemperature, mapWeatherData, { immediate: true });
watch(() => store.getPTY, mapWeatherData, { immediate: true });
</script>

<style scoped>


.iconSize {
    font-size: 20px;
}
</style>
