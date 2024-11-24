<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}년 ${month}월 ${day}일`  // "YYYY-MM-DD" 형식
}

onMounted(() => {
    userStore.getUser()
    userStore.getFortune()
})

const currentDate = formatDate(new Date());
</script>

<template>
  <div class="zodiac-container">
    <h1 class="title">오늘의 운세</h1>
    
    <!-- 운세 카드 -->
    <div class="card shadow-sm">
      <div class="card-header">
        <p class="header-text">{{ currentDate }}</p>
      </div>
      <div class="card-body">
        <p class="fortune-intro">
          {{ userStore.fortune.zodiacSign }}를 가지고 태어난 {{ userStore.loginUser.nickname }} 님<br>
          오늘의 운세를 알려드리겠습니다
        </p>
        <p class="fortune-text">{{ userStore.fortune.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
.zodiac-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25vh;
  background: linear-gradient(to bottom, #f0f8ff, #ffe4e1);
  font-family: "Arial", sans-serif;
  padding: 20px;
  border-radius: 20px; /* 모서리를 둥글게 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가로 입체감 */
}

/* 제목 스타일 */
.title {
  font-size: 3rem;
  color: #ff1493;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 20, 147, 0.7);
  animation: sparkle 1.5s ease-in-out infinite;
}

/* 카드 스타일 */
.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}

/* 카드 헤더 스타일 */
.card-header {
  background: #ffebcd;
  padding: 10px 15px;
  border-radius: 8px 8px 0 0;
}

.header-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #8b0000;
  margin: 0;
}

/* 카드 본문 스타일 */
.card-body {
  padding: 20px;
}

.fortune-intro {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.fortune-text {
  font-size: 1.5rem;
  color: #8b0000;
  font-weight: bold;
  animation: sparkle 1.5s ease-in-out infinite;
}

/* 반짝이는 텍스트 애니메이션 */
@keyframes sparkle {
  0% {
    text-shadow: 0 0 5px rgba(255, 20, 147, 0.8), 0 0 10px rgba(255, 20, 147, 0.6);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 20, 147, 1), 0 0 30px rgba(255, 20, 147, 0.6);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 20, 147, 0.8), 0 0 10px rgba(255, 20, 147, 0.6);
  }
}
</style>
