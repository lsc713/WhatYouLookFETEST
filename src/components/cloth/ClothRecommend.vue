<template>
    <div>
      <!-- 옷 추천 정보 표시 -->
      <div v-if="clothStore.clothes.length > 0" class="homeText">
        <h3 class="text-center homeText">오늘의 옷 추천</h3>
        <hr>
        <div class="container text-center background-image">
          <div class="row justify-content-start">
            <!-- 옷 추천 항목을 순회하여 표시 -->
            <div class="col-4 border p-2 mb-2 border-opacity-75" v-for="image in images" :key="image.id">
              <!-- <h5>{{ image.originalName }}</h5> -->
              <img :src="getImageUrl(image.uniqueName)" alt="Image" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- 옷 추천이 없을 때 로딩 화면 표시 -->
      <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <hr>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import { useClothStore } from '@/stores/cloth';
  import { useWeatherStore } from '@/stores/weather';
  
  const clothStore = useClothStore();
  const weatherStore = useWeatherStore();
  
  // 날씨 온도 정보가 변할 때 옷 추천을 가져오는 함수
  const getClothList = (temperature) => {
    if (temperature !== null) {
        
      clothStore.getClothesRecommendation(temperature);
    }
  };
  
  // 옷 목록을 computed로 가져옵니다
  const images = computed(() => {
    return clothStore.clothes;
  });
  
    // 날씨가 변경될 때 기온이 null이 아닐 경우에만 getClothList를 호출
    watch(() => weatherStore.currentTemperature, (newTemp, oldTemp) => {
    if (newTemp !== oldTemp && newTemp !== null) {
        // 기온이 null이 아니고 변경되었을 때 옷 추천 요청
        getClothList(newTemp);
    }
    }, { immediate: true });
  
  // 이미지를 가져오는 함수
  const getImageUrl = (uniqueName) => {
    const baseUrl = import.meta.env.VITE_S3_BASE_URL;
    // console.log(`${baseUrl}${uniqueName}`)
    return `${baseUrl}${uniqueName}`; // 완전한 이미지 URL 반환
  };
  </script>
  
  <style scoped>
 .homeText{
    font-weight: bold; /* 텍스트 굵게 */
  font-size: 1.5rem; /* 텍스트 크기 (필요시 조정) */
  color: #555555; /* 텍스트 색상 (필요시 조정) */
}
  </style>
  