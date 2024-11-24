<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board'
import { useBoardImageStore } from '@/stores/boardImage'
import BoardImageUploader from '@/components/board/BoardImageUploader.vue'

const boardStore = useBoardStore()
const boardImageStore = useBoardImageStore();
const router = useRouter()

const images = ref([]);

const modifyBoard = async function () {
  try {
    if (images.value.length > 0) {
      await boardImageStore.uploadBoardImage(boardStore.board.id, images.value);
      alert('이미지 업로드 성공');
    }
    await boardStore.modifyBoard(boardStore.board.id);
    router.push(`/board/${boardStore.board.id}`);
  } catch (error) {
    console.error('게시글 수정 또는 이미지 업로드 실패', error);
    alert('수정 또는 이미지 업로드에 실패했습니다');
  }
};

const backButton = function () {
    router.go(-1);
}

const removeImage = function (imageId) {
  boardImageStore.removeBoardImage(boardStore.board.id, imageId);
};

onMounted(() => {
  boardImageStore.getBoardImageList(boardStore.board.id);
});
</script>

<template>
    <div class="container py-5">
        <div class="card shadow-sm mx-auto" style="max-width: 400px; min-height: 450px;">
            <div class="card-header text-center" style="background-color: rgba(143, 255, 248, 0.6);">
                <h4 style="color: #08635d;">게시글 수정</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="modifyBoard">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목" v-model="boardStore.board.title">
                        <label for="title">제목</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea 
                            class="form-control" 
                            id="content" 
                            placeholder="내용" 
                            v-model="boardStore.board.content" 
                            style="height: 200px;"></textarea>
                        <label for="content">내용</label>
                    </div>

                    <div class="image-gallery mb-3">
                        <div
                        v-for="boardImage in boardImageStore.boardImageList"
                        :key="boardImage.id"
                        class="image-container"
                        >
                        <img
                            :src="boardImage.filePath"
                            class="img-thumbnail mb-3"
                            alt="게시글 이미지"
                        />
                        <button type="button" class="btn btn-danger btn-sm rounded-circle position-absolute" @click="removeImage(boardImage.id)">
                            X
                        </button>

                        </div>
                    </div>

                    <div class="mb-3">
                        <BoardImageUploader :images="images" />
                    </div>

                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn" style="background-color: rgba(143, 255, 248, 0.6); color: #08635d; width: 100%;">수정</button>
                    </div>
                </form>
                <br/>
                <button class="btn btn-secondary w-100" @click="backButton">뒤로</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    width: 100%;
    font-size: 1rem;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.image-container {
  position: relative;
  width: 100px; /* 일정한 크기 */
  height: 100px; /* 일정한 크기 */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 10;
} */

.btn-danger {
  position: absolute;
  top: 5%;
  right: 5%;
  width: 25px;
  height: 25px;
  font-size: 1rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.card {
  width: 100%;
  min-height: 450px;
}

/* 뒤로가기 버튼 스타일 */
button.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    font-weight: bold;
}

</style>