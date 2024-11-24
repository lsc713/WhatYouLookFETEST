<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from '@/stores/user'
import { useBoardStore } from "@/stores/board";
import { useCommentStore } from '@/stores/comment'
import { useBoardImageStore } from '@/stores/boardImage'
import CommentList from '@/components/comment/CommentList.vue'
import CommentCreate from '@/components/comment/CommentCreate.vue'

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const boardStore = useBoardStore();
const boardImageStore = useBoardImageStore()
const commentStore = useCommentStore()

const boardId = route.params.boardId

const modifyBoard = function () {
    router.push({ name: "boardUpdate" });
};

const removeBoard = function () {
    boardStore.removeBoard(boardId)
};

const handleAddComment = function () {
  commentStore.getCommentList(boardId)
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
    boardStore.getBoard(boardId)
    boardImageStore.getBoardImageList(boardId)
    commentStore.getCommentList(boardId)
})
</script>

<template>
    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="content-area" style="max-width: 1000px; margin: 0 auto;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <!-- 왼쪽: 프로필, 닉네임, 생성일, 조회수 -->
                        <div class="d-flex align-items-center text-muted author-info">
                        <img :src="boardStore.board.userFilePath" alt="User's Profile" class="author-image" />
                        <div class="author-details">
                            <div>{{ boardStore.board.userName }}</div>
                            <div>{{ formatDate(boardStore.board.createdAt) }}</div>
                            <div class="viewCnt">
                            <img src="@/assets/eye-icon.png" />
                            <span>{{ boardStore.board.viewCnt }}</span>
                            </div>
                        </div>
                        </div>

                        <!-- 오른쪽: 수정, 삭제 버튼 아이콘 -->
                        <div class="action-buttons">
                        <img 
                            class="edit-btn"
                            src="@/assets/edit-btn.png" 
                            alt="수정 버튼" 
                            @click="modifyBoard" 
                            v-if="userStore.isLoggedIn"
                        />
                        <img 
                            class="edit-btn"
                            src="@/assets/edit-btn.png" 
                            alt="수정 버튼" 
                            @click="showLoginAlert" 
                            v-else
                        />
                        <img 
                            class="edit-btn"
                            src="@/assets/delete-btn.png" 
                            alt="삭제 버튼" 
                            @click="removeBoard" 
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

                    <hr />

                    <div class="image-gallery mb-3">
                        <img
                            v-for="boardImage in boardImageStore.boardImageList"
                            :key="boardImage.id"
                            :src="boardImage.filePath"
                            class="img-thumbnail mb-3"
                            alt="게시글 이미지"
                        />
                    </div>

                    <p class="card-text">
                        {{ boardStore.board.content }}
                    </p>
                </div>
            </div>
        </div>

        <div class="comment-section">
            <CommentList :boardId="boardId" @commentAdded="handleAddComment" />
            <CommentCreate :boardId="boardId" @commentAdded="handleAddComment"/>
        </div>
    </div>
</template>

<style scoped>
.card-body {
  min-height: 150px;
  position: relative;
}

.edit-btn {
  cursor: pointer;
  width: 50px;
  height: auto;
  margin-left: 10px;
}

.action-buttons {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* .viewCnt 컨테이너 스타일 */
.viewCnt {
  display: flex; /* 이미지와 텍스트를 가로로 정렬 */
  align-items: center; /* 이미지와 텍스트를 수직 가운데 정렬 */
  margin-top : 5px;
  gap: 2px; /* 이미지와 텍스트 사이 여백 */
}

/* 이미지 크기 조정 */
.viewCnt img {
  width: 20px; /* 이미지 가로 크기 */
  height: 20px; /* 이미지 세로 크기 */
  object-fit: contain; /* 이미지 비율 유지하며 크기 조정 */
}

/* 텍스트 스타일 */
.viewCnt span {
  font-weight: bold; /* 텍스트 굵게 */
  font-size: 0.8rem; /* 텍스트 크기 (필요시 조정) */
  color: #333; /* 텍스트 색상 (필요시 조정) */
}

.author-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #6c757d; /* text-muted와 같은 색 */
}

.author-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%; /* 원형 이미지 */
}

.author-details {
  margin-left: 10px; /* 이미지와 텍스트 간의 간격 */
  text-align: left;
}

.content-area {
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.img-thumbnail {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-section {
    margin-top: 30px;
}
</style>