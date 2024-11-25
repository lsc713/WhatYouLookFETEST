<script setup>
import { ref } from 'vue'

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:image'])

const fileInput = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('update:image', file) 
  }
}

</script>

<template>
  <div class="file-upload-container">
    <div class="file-upload">
      <input
        class="file-input"
        id="fileInput"
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileChange"
      />
      <i class="upload-icon">📁</i>
      <div v-if="props.image" class="mt-3">
        <div class="image-preview-container">
          <p>{{ image.name }}</p>
        </div>
      </div>
      <label v-else class="file-label" for="fileInput">
        <p>Drop or Drag</p>
      </label>
    </div>
  </div>

</template>

<style scoped>
.file-upload-container {
  width: 120%;
  max-width: 500px;
}

.file-upload {
  position: relative;
  border: 2px dashed #b8bcbf;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  transition: background-color 0.3s ease-in-out;
}

.file-upload:hover {
  background-color: #e2e6ea;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-icon {
  font-size: 50px;
  color: #007bff;
  margin-bottom: 10px;
}

.file-upload p {
  margin: 0;
  font-size: 16px;
  color: #6c757d;
}

.file-upload.dragover {
  background-color: #007bff;
  color: white;
}
</style>