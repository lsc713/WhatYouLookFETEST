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
                    <div class="mb-3 d-flex justify-content-between align-items-center">
                        <h4 class="card-title">{{ boardStore.board.title }}
                            <span class="badge bg-danger">{{ boardStore.board.viewCnt }}</span>
                        </h4>
                        <div class="d-flex justify-content-end author-info">
                        <img :src="boardStore.board.userFilePath" alt="User's Profile" class="author-image" />
                        <h6 class="card-subtitle mx-3 text-body-secondary">{{ boardStore.board.userName }}</h6>
                        <h6 class="card-subtitle text-body-secondary">{{ boardStore.board.createdAt }}</h6>
                        </div>
                    </div>

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
                    <div class="d-flex justify-content-center">
                    <button 
                        class="mx-3 btn btn-outline-success" 
                        @click="modifyBoard" 
                        v-if="userStore.isLoggedIn"
                    >
                        수정
                    </button>
                    <button 
                        class="mx-3 btn btn-outline-success" 
                        @click="showLoginAlert" 
                        v-else
                    >
                        수정
                    </button>

                    <button 
                        class="mx-3 btn btn-outline-danger" 
                        @click="removeBoard" 
                        v-if="userStore.isLoggedIn"
                    >
                        삭제
                    </button>
                    <button 
                        class="mx-3 btn btn-outline-danger" 
                        @click="showLoginAlert" 
                        v-else
                    >
                        삭제
                    </button>
                    </div>
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

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
}

.author-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.author-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%; /* 원형 이미지 */
  margin-right: 10px; /* 이미지와 텍스트 간의 간격 */
}

.author-info .card-subtitle {
  color: #6c757d; /* text-muted와 같은 색 */
  margin-left: 10px; /* 텍스트 간의 간격 */
}

.comment-section {
    margin-top: 30px;
}
</style>