<template>
    <div class="zodiac-container">
      <h1 class="title">오늘의 운세</h1>
      
      <!-- 별자리 선택 드롭다운 -->
      <div class="zodiac-selector">
        <label for="zodiac">별자리를 선택하세요:</label>
        <select v-model="selectedZodiac" id="zodiac">
          <option value="aries">양자리</option>
          <option value="taurus">황소자리</option>
          <option value="gemini">쌍둥이자리</option>
          <option value="cancer">게자리</option>
          <option value="leo">사자자리</option>
          <option value="virgo">처녀자리</option>
          <option value="libra">천칭자리</option>
          <option value="scorpio">전갈자리</option>
          <option value="sagittarius">사수자리</option>
          <option value="capricorn">염소자리</option>
          <option value="aquarius">물병자리</option>
          <option value="pisces">물고기자리</option>
        </select>
      </div>
  
      <!-- 운세 표시 -->
      <div class="fortune" v-if="zodiacFortune">
        <p class="fortune-text">{{ zodiacFortune }}</p>
      </div>
  
      <!-- 날짜 표시 -->
      <div class="footer">
        <p>오늘의 운세: {{ formattedDate }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedZodiac: "aries", // 기본 값은 양자리
        fortunes: {
          aries: "오늘은 시작이 중요한 날! 새로운 도전이 기다리고 있어요.",
          taurus: "편안한 하루를 보내세요. 주변 사람들과의 대화가 도움이 될 거예요.",
          gemini: "소통이 핵심입니다. 다른 사람들의 의견을 듣고 조화롭게 행동하세요.",
          cancer: "감정이 중요한 날입니다. 다른 사람들과의 감정적인 연결을 시도하세요.",
          leo: "자신감을 가지세요. 오늘은 당신의 날입니다.",
          virgo: "조금 더 세밀하게 계획하고 준비하는 것이 좋습니다.",
          libra: "균형을 찾는 하루입니다. 타협을 통해 문제를 해결할 수 있어요.",
          scorpio: "강한 의지가 필요한 날입니다. 어려운 상황에서도 끈기를 발휘하세요.",
          sagittarius: "모험심을 발휘해보세요. 새로운 경험이 기다리고 있어요.",
          capricorn: "침착하게 하루를 보내세요. 노력한 만큼 좋은 결과가 있을 거예요.",
          aquarius: "창의적인 아이디어가 떠오르는 날입니다. 자유롭게 생각해보세요.",
          pisces: "직관이 중요한 날입니다. 내면의 소리에 귀 기울여 보세요.",
        },
        formattedDate: new Date().toLocaleDateString(),
      };
    },
    computed: {
      zodiacFortune() {
        return this.fortunes[this.selectedZodiac];
      },
    },
  };
  </script>
  
  <style scoped>
  .zodiac-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f0f8ff;
    font-family: "Arial", sans-serif;
  }
  
  .title {
    font-size: 3rem;
    color: #ff1493;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  
  .zodiac-selector {
    margin-bottom: 2rem;
  }
  
  #zodiac {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .fortune {
    background-color: #ffebcd;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  .fortune-text {
    font-size: 1.25rem;
    color: #8b0000;
    font-weight: bold;
    line-height: 1.5;
  }
  
  .footer {
    margin-top: 20px;
    font-size: 1rem;
    color: #333;
    opacity: 0.7;
  }
  
  .fortune-text {
    position: relative;
    animation: sparkle 1s ease-in-out infinite;
  }
  
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
  