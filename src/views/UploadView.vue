<template>
  <div>
    <h2>파일 업로드</h2>
    <input type="file" @change="handleFileUpload" />
    <label for="minTMP">최소 온도</label>
    <input type="number" v-model="minTMP" id="minTMP" />
    <label for="maxTMP">최대 온도</label>
    <input type="number" v-model="maxTMP" id="maxTMP" />
    <button @click="uploadFile" :disabled="!file">업로드</button>
    <p v-if="uploadStatus">{{ uploadStatus }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      uploadStatus: '',
      minTMP: '', // 최소 온도
      maxTMP: ''  // 최대 온도
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 파일 선택
    },
    async uploadFile() {
      if (!this.file) {
        this.uploadStatus = '파일을 선택해주세요.';
        return;
      }
      if (!this.minTMP || !this.maxTMP) {
        this.uploadStatus = '최소 온도와 최대 온도를 입력해주세요.';
        return;
      }

      this.uploadStatus = '업로드 중...';

      const formData = new FormData();
      formData.append('file', this.file);  // 파일 추가
      formData.append('minTMP', this.minTMP);  // 최소 온도 추가
      formData.append('maxTMP', this.maxTMP);  // 최대 온도 추가

      try {
        // 파일과 온도 데이터를 함께 서버에 전송
        const response = await axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.uploadStatus = response.data; // 성공 메시지 출력
      } catch (error) {
        this.uploadStatus = '파일 업로드 실패';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
button {
  margin-top: 10px;
}
</style>
