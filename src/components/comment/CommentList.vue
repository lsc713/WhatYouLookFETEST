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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // 날짜 형식화 (YYYY.MM.DD)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0');

  // 시간 형식화 (HH:mm)
  const hours = date.getHours().toString().padStart(2, '0'); // 두 자리로 맞춤
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 두 자리로 맞춤

  return `${year}.${month}.${day} ${hours}:${minutes}`; // "YYYY.MM.DD HH:mm" 형식
};

onMounted(() => {
    userStore.checkLoginState()
    commentStore.getCommentList(props.boardId)
})

</script>

<template>
    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="content-area" style="max-width: 1000px; margin: 0 auto;">
              <div v-if="commentStore.commentList.length > 0">
                <div class="card-body" v-for="comment in commentStore.commentList" :key="comment.id">
                  <div class="d-flex align-items-center text-muted author-info">
                    <img :src="comment.userFilePath" alt="User's Profile" class="author-image" />
                    <div class="author-details">
                      <div>{{ comment.userName }}</div>
                      <div>{{ formatDate(comment.createdAt) }}</div>
                    </div>
                  </div>
                  
                  <template v-if="editingCommentId !== comment.id">
                    <div class="card-content">
                      {{ comment.content }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="card-content">
                    <textarea 
                      v-model="editedContent.content" 
                      class="form-control"
                      rows="2"
                      style="width: 300%;"
                    ></textarea>
                    </div>
                  </template>
              
                  <div class="action-buttons">
                    <template v-if="editingCommentId !== comment.id">
                      <img 
                      class="edit-btn"
                      src="@/assets/edit-btn.png" 
                      alt="수정 버튼" 
                      @click="startEditing(comment.id, comment.content)" 
                      v-if="userStore.isLoggedIn"
                      />
                      <img 
                      class="edit-btn"
                      src="@/assets/edit-btn.png" 
                      alt="수정 버튼" 
                      @click="showLoginAlert" 
                      v-else
                      />
                    </template>
                    <template v-else>
                      <img 
                      class="edit-btn"
                      src="@/assets/check-btn.png" 
                      alt="저장 버튼" 
                      @click="modifyComment(comment.id)" 
                      />
                    </template>
                    <img 
                    class="edit-btn"
                    src="@/assets/delete-btn.png" 
                    alt="삭제 버튼" 
                    @click="removeComment(comment.id)" 
                    v-if="userStore.isLoggedIn"
                    />
                    <img 
                    class="edit-btn"
                    src="@/assets/delete-btn.png" 
                    alt="삭제 버튼" 
                    @click="showLoginAlert" 
                    v-else
                    />
                  </div>
                </div>
              </div>
              <div v-else class="no-comments">
                댓글이 없습니다
              </div>
            </div>
        </div>
      </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-width: 900px;
  border-radius: 8px;
  background-color: #f8f9fa;
  margin-bottom: 10px;
}

.no-comments {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* 필요에 따라 조정 */
  font-size: 1rem; /* 글씨 크기 조정 */
  color: #6c757d; /* 텍스트 색상 (옵션) */
}

.card-body {
  min-height: 80px;
  position: relative;
  display: flex; /* 가로로 정렬 */
  flex-direction: row; /* 한 줄로 배치 */
  align-items: center; /* 세로로 가운데 정렬 */
}

.content-area {
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
}

.card-content {
  padding-left: 25px;
}

.edit-btn {
  cursor: pointer;
  width: 30px;
  height: auto;
  margin-left: 10px;
}

.action-buttons {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  position: absolute;
  right: 10px;
}

.author-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #6c757d; /* text-muted와 같은 색 */
}

.author-details {
  margin-left: 10px; /* 이미지와 텍스트 간의 간격 */
  text-align: left;
}

.author-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%; /* 원형 이미지 */
  margin-right: 10px; /* 이미지와 텍스트 간의 간격 */
}


</style>