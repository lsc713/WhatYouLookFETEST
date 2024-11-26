<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import { useBoardImageStore } from '@/stores/boardImage'
import BoardImageUploader from '@/components/board/BoardImageUploader.vue';

const router = useRouter()
const boardStore = useBoardStore()
const boardImageStore = useBoardImageStore()

const board = ref({
    title: '',
    content: '',
})

const images = ref([])

const createBoard = async function () {
    try {
        const createdBoard = await boardStore.createBoard(board.value)
        const boardId = createdBoard.id;

        if (images.value.length > 0) {
            await boardImageStore.uploadBoardImage(boardId, images.value)
        }

        router.push(`/board/${boardId}`)
    } catch (error) {
        console.log(error)
        router.push({ name: 'boardList' })
    }
}

</script>

<template>
    <div class="container py-5">
        <div class="card shadow-sm mx-auto">
            <div class="card-header text-center" style="background-color: rgba(143, 255, 248, 0.6);">
                <h4 style="color: #08635d;">게시글 등록</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="createBoard">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목" v-model="board.title">
                        <label for="title">제목</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea 
                            class="form-control" 
                            id="content" 
                            placeholder="내용" 
                            v-model="board.content" 
                            style="height: 200px;"></textarea>
                        <label for="content">내용</label>
                    </div>

                    <div class="mb-3">
                        <BoardImageUploader :images="images" />
                    </div>

                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn" style="background-color: rgba(143, 255, 248, 0.6); color: #08635d; width: 100%;">등록</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-header {
    font-size: 1.25rem;
    font-weight: bold;
    background-color: rgba(143, 255, 248, 0.6); /* 배경색 */
}

.container {
    width: 100%;
    min-height: 300px;
    min-width: 1000px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
}

.card {
  width: 100%;
}

button {
    background-color: rgba(143, 255, 248, 0.6); /* 버튼 배경색 */
    color: #08635d; /* 버튼 글자색 */
    border: none; /* 기본 버튼 테두리 제거 */
    font-weight: bold; /* 버튼 글자 굵게 */
}
</style>