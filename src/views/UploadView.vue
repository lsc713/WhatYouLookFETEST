<template>
  <div>
    <h2>파일 업로드</h2>
    <input type="file" @change="handleFileUpload" />
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
      uploadStatus: ''
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

      this.uploadStatus = '업로드 중...';

      const formData = new FormData();
      formData.append('file', this.file); // 파일만 전송

      try {
        const response = await axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.uploadStatus = response.data;
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
