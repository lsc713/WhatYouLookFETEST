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

const editingCommentId = ref(null)
const editedContent = ref({
    content: '',
})

const userStore = useUserStore();
const commentStore = useCommentStore()

const removeComment = function (commentId) {
    commentStore.removeComment(props.boardId, commentId)
    window.location.reload()
}

const modifyComment = function (commentId) {
  if (editedContent.value.content.trim()) {
    commentStore.modifyComment(props.boardId, commentId, editedContent.value)
    editingCommentId.value = null
    editedContent.value.content = ''
    window.location.reload()
  }
}

const startEditing = function (commentId, content) {
  editingCommentId.value = commentId
  editedContent.value.content = content
}

const showLoginAlert = function () {
  alert('로그인이 필요합니다')
}

onMounted(() => {
    userStore.checkLoginState()
    commentStore.getCommentList(props.boardId)
})

</script>

<template>
  <div class="container">
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th>내용</th>
          <th>작성자</th>
          <th>등록일</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in commentStore.commentList" :key="comment.id">
          <td>
            <template v-if="editingCommentId !== comment.id">
              {{ comment.content }}
            </template>
            <template v-else>
              <input 
                v-model="editedContent.content" 
                type="text" 
                class="form-control"
              />
            </template>
          </td>
          <td>
            <!-- 이미지와 작성자 이름 함께 표시 -->
            <div class="d-flex align-items-center justify-content-center">
              <img :src="comment.userFilePath" alt="User's Profile" class="author-image" />
              <span>{{ comment.userName }}</span>
            </div>
          </td>
          <td>{{ comment.createdAt }}</td>
          <td>
            <template v-if="editingCommentId !== comment.id">
              <button 
                class="mx-3 btn btn-outline-warning" 
                @click="startEditing(comment.id, comment.content)" 
                v-if="userStore.isLoggedIn"
              >
                수정
              </button>
              <button 
                class="mx-3 btn btn-outline-warning" 
                @click="showLoginAlert" 
                v-else
              >
                수정
              </button>
            </template>
            <template v-else>
              <button 
                class="mx-3 btn btn-outline-success" 
                @click="modifyComment(comment.id)"
              >
                저장
              </button>
            </template>
          </td>
          <td>
            <button 
              class="mx-3 btn btn-outline-danger" 
              @click="removeComment(comment.id)" 
              v-if="userStore.isLoggedIn"
            >
              X
            </button>
            <button 
              class="mx-3 btn btn-outline-danger" 
              @click="showLoginAlert" 
              v-else
            >
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.author-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%; /* 원형 이미지 */
  margin-right: 10px; /* 이미지와 텍스트 간의 간격 */
}

</style>