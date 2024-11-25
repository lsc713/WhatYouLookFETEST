<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const fileInput = ref(null)

const handleFileChange = (event) => {
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    props.images.push(files[i])
  }
}

</script>

<template>
  <div class="form">
    <h2 class="form-title">Upload your files</h2>
    <div class="drop-container">
      <span class="drop-title">Drop files here</span>
      or
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        id="file-input"
        @change="handleFileChange"
      />
    </div>

    <div v-if="props.images.length" class="mt-3">
        <div class="image-preview-container">
          <div v-for="(image, index) in props.images" :key="index">
            <p>{{ image.name }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* Form 스타일 */
.form {
  background-color: #fff;
  box-shadow: 0 10px 60px rgb(218, 229, 255);
  border: 1px solid rgb(159, 159, 160);
  border-radius: 20px;
  padding: 2rem .7rem .7rem .7rem;
  text-align: center;
  font-size: 1.125rem;
  min-width: 600px;
  margin: 0 auto;
}

.form-title {
  color: #000000;
  font-size: 1.8rem;
  font-weight: 500;
}

.drop-container {
  background-color: #fff;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 2.1875rem;
  border-radius: 10px;
  border: 2px dashed rgb(171, 202, 255);
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
  background: rgba(0, 140, 255, 0.164);
  border-color: rgba(17, 17, 17, 0.616);
}

.drop-title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}

#file-input {
  width: 350px;
  max-width: 100%;
  color: #444;
  padding: 2px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(8, 8, 8, 0.288);
}

#file-input::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

#file-input::file-selector-button:hover {
  background: #0d45a5;
}

/* 이미지 미리보기 */
.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.image-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.image-preview p {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #444;
}
</style>