<template>
  <div class="home-container">
    <h2>HomeView</h2>
    <Weather></Weather>
    <ClothRecommend></ClothRecommend>
  </div>
</template>

<script setup>
import ClothRecommend from '@/components/cloth/ClothRecommend.vue';
import Weather from '@/components/weather/Weather.vue';
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

Weather, ClothRecommend {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; // 각 컴포넌트 간 간격 조정
  padding: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
}

.spinner-border {
  margin: auto;
  display: block;
  width: 3rem;
  height: 3rem;
}


</style>
