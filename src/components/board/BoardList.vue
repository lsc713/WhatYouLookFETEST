<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'
import { useBoardStore } from '@/stores/board'
import { useBoardImageStore } from '@/stores/boardImage'

const router = useRouter();
const userStore = useUserStore();
const boardStore = useBoardStore()
const boardImageStore = useBoardImageStore()

const colsPerRow = ref(4)
const currentPage = ref(1)
const perPage = 8
const pageCount = computed(() => {
    return Math.ceil(boardStore.boardList.length / perPage)
})
const clickPage = function (page) {
    currentPage.value = page
}
const currentPageBoardList = computed(() => {
    return boardStore.boardList.slice((currentPage.value-1)*perPage, currentPage.value*perPage)
})

const emptySlots = computed(() => {
  const totalCards = colsPerRow.value * 2; // 항상 4x2 (8개) 기준으로 계산
  return totalCards - currentPageBoardList.value.length;
});

const updateColsPerRow = () => {
  if (window.innerWidth >= 992) {
    colsPerRow.value = 4;  // 가장 큰 화면에서는 4개 (4x2)
  } else {
    colsPerRow.value = 2;  // 작은 화면에서는 2개 (2x4)
  }
};

const thumbnailMap = ref({})
watch(() => boardImageStore.boardImageThumbList, (newList) => {
    thumbnailMap.value = newList.reduce((map, image) => {
        map[image.boardId] = image.filePath;
        return map;
    }, {});
    console.log("Updated Thumbnail Map:", thumbnailMap.value);
    console.log("Thumb List:", boardImageStore.boardImageThumbList);
}, { immediate: true });

const createBoard = function () {
    router.push({ name: "boardCreate" });
};

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
    updateColsPerRow(); // 초기 설정
    window.addEventListener('resize', updateColsPerRow); // 화면 크기 변경 대응

    if (!boardStore.isSearching) {
      boardStore.getBoardList();
      boardImageStore.getBoardImageThumbsList()
    }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColsPerRow); // 리스너 제거
});
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-end mt-3">
      <img 
        src="@/assets/edit-btn.png" 
        alt="등록 버튼" 
        @click="createBoard" 
        v-if="userStore.isLoggedIn"
        class="edit-btn"
      />
      <img 
        src="@/assets/edit-btn.png" 
        alt="등록 버튼" 
        @click="showLoginAlert" 
        v-else
        class="edit-btn"
      />
    </div>

    <div v-if="!currentPageBoardList.length">
      <p class="text-center fw-bold fs-5">검색 결과가 없습니다.</p>
    </div>
    <div class="row row-cols-2 row-cols-lg-4 g-4">
      <div class="col" v-for="board in currentPageBoardList" :key="board.id">
        <div class="card h-100">
          <RouterLink :to="`/board/${board.id}`">
            <img
              v-if="thumbnailMap[board.id]"
              :src="thumbnailMap[board.id]"
              class="card-img-top"
              alt="게시글 썸네일"
            />
            <img
              v-else
              src="@/assets/no-image-500.png"
              class="card-img-top"
              alt="이미지 없음"
            />
          </RouterLink>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <RouterLink :to="`/board/${board.id}`" class="card-title-link">
                <h5 class="card-title mb-0">{{ board.title }}</h5>
              </RouterLink>
            </div>
            <hr />
            <div class="d-flex align-items-center text-muted author-info">
              <img :src="board.userFilePath" alt="User's Profile" class="author-image" />
              <div class="author-details">
                <div>{{ board.userName }}</div>
                <div>{{ formatDate(board.createdAt) }}</div>
                <div class="viewCnt">
                  <img src="@/assets/eye-icon.png">
                  <span>{{ board.viewCnt }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="n in emptySlots" :key="'empty-slot-' + n" class="col">
        <div class="card invisible"></div>
      </div>
    </div>
    <nav v-if="currentPageBoardList.length" aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center mt-4">
        <li class="page-item">
          <a
            class="page-link"
            @click.prevent="currentPage--"
            :class="{ disabled: currentPage <= 1 }"
            href="#"
            >&lt;</a
          >
        </li>
        <li
          class="page-item"
          :class="{ active: currentPage == page }"
          v-for="page in pageCount"
          :key="page"
        >
          <a href="#" class="page-link" @click.prevent="clickPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            @click.prevent="currentPage++"
            :class="{ disabled: currentPage >= pageCount }"
            href="#"
            >&gt;</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 250px;
  width: 100%;
  cursor: pointer;
}

.card {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body {
  min-height: 150px;
}

.card-title-link {
  text-decoration: none;
  color: inherit;
}

.card-title-link:hover {
  color: #007bff;
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

.pagination .page-item .page-link {
  color: #08635d;
  border: 1px solid #08635d; /* 버튼 테두리 색상 */
}

.pagination .page-item .page-link:hover {
  background-color: rgba(143, 255, 248, 0.6); /* 호버 시 배경색 */
  color: #fff; /* 텍스트 색상 흰색 */
}

.pagination .page-item.disabled .page-link {
  color: #d1d1d1; /* 비활성화된 버튼 색상 */
  border-color: #d1d1d1; /* 비활성화된 버튼 테두리 색상 */
}

.pagination .page-item.active .page-link {
  background-color: #08635d; /* 활성화된 페이지 버튼 색상 */
  color: #fff; /* 활성화된 페이지의 텍스트 색상 */
}

.text-muted {
  font-size: 0.875rem;
}

.row {
  min-height: calc(250px * 3 + 20px * 2); /* 3행 카드의 높이를 유지 */
}

.row-cols-2 > .col,
.row-cols-lg-4 > .col {
  margin-bottom: 20px;
}

.edit-btn {
  cursor: pointer;
  width: 50px; /* 이미지 크기 조정 */
  height: auto;
}

.mt-3 {
  margin-bottom: 10px; /* 버튼과 다음 요소 사이의 간격을 늘림 */
}

.invisible {
  visibility: hidden;
}
</style>