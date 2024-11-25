<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCommentStore } from '@/stores/comment'

const props = defineProps({
  boardId: {
    type: String,
    required: true
  }
})

const emit = defineEmits()

const commentContent = ref('')

const userStore = useUserStore();
const commentStore = useCommentStore()

const addComment = function () {
  const newComment = { content: commentContent.value }
  commentStore.addComment(props.boardId, newComment)
  commentContent.value = ''
  emit('commentAdded')
  window.location.reload()
}

onMounted(() => {
    userStore.checkLoginState()
})

</script>

<template>
  <div class="comment-create">
    <div v-if="userStore.isLoggedIn">
      <textarea 
        v-model="commentContent" 
        placeholder="댓글을 작성하세요..." 
        class="form-control"
        @keyup.enter="addComment"
      ></textarea>
    </div>

    <div v-else>
      <textarea 
        placeholder="로그인이 필요합니다." 
        class="form-control" 
        disabled
      ></textarea>
    </div>
  </div>
</template>

<style scoped>

</style>