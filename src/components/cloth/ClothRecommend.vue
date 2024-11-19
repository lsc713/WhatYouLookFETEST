<template>
    <div class="clothes-recommend">
        <h3>오늘의 옷 추천</h3>
        <div v-if="clothStore.clothes.tops.length > 0">
            <div class="row">
                <div class="col-3">
                    <h4>상의</h4>
                    <ul class="list-unstyled">
                        <li v-for="top in tops" :key="top.id">
                            {{ top.cloth_name }}
                        </li>
                    </ul>
                </div>
                <div class="col-3">
                    <h4>하의</h4>
                    <ul class="list-unstyled">
                        <li v-for="bottom in bottoms" :key="bottom.id">
                            {{ bottom.cloth_name }}
                        </li>
                    </ul>
                </div>
                <div class="col-3">
                    <h4>외투</h4>
                    <ul class="list-unstyled">
                        <li v-for="outer in outers" :key="outer.id">
                            {{ outer.cloth_name }}
                        </li>
                    </ul>
                </div>
                <div class="col-3">
                    <h4>신발</h4>
                    <ul class="list-unstyled">
                        <li v-for="shoe in shoes" :key="shoe.id">
                            {{ shoe.cloth_name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else>
            <p>추천할 옷이 없습니다.</p>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useClothStore } from '@/stores/cloth';
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
const clothStore = useClothStore();

const getClothList = (temperature) => {
    if (temperature !== null) {
        clothStore.getClothesRecommendation(temperature);
    }
}


watch(() => weatherStore.currentTemperature, (newTemp) => {
    if (newTemp !== null) {
        getClothList(newTemp);
    }
});

const tops = computed(() => {
    // clothStore.clothes가 유효한지 먼저 체크하고, 그 후 필터링합니다.
    return clothStore.clothes.tops;
});

const bottoms = computed(() => {
    return clothStore.clothes.bottoms;
        
});

const outers = computed(() => {
    return clothStore.clothes.outers;
        
});
const shoes = computed(() => {
    return clothStore.clothes.shoes;
        
});
</script>
