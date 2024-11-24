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
  <div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="form-control"
      @change="handleFileChange"
    />
    <div v-if="props.image" class="mt-3">
      <h5>선택된 이미지</h5>
      {{ props.image.name }}
    </div>
  </div>
</template>

<style scoped>

</style>