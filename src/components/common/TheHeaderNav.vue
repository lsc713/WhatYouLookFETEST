<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" :to="{name: 'home'}">
                <img src="@/assets/WhatsYouLookTXT.png" alt="로고" style="height: 45px;"/>
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <RouterLink class="nav-link " aria-current="page" to="/">Weather</RouterLink>
                </li>
                <li class="nav-item">
                <RouterLink class="nav-link " :to="{name: 'boardList'}" @click.prevent="resetSearch">Board</RouterLink>
                </li>
                <li class="nav-item">
                <RouterLink class="nav-link" :to="{name: 'userLogin'}" v-if="!userStore.isLoggedIn">Login</RouterLink>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link" @click="logout" v-if="userStore.isLoggedIn">Logout</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" @click.prevent="handleDropdownClick" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    UserOnly
                </a>
                <ul class="dropdown-menu" v-if="userStore.isLoggedIn">
                    <li><RouterLink class="dropdown-item" :to="{name: 'todayFortune'}">TodayFortune</RouterLink></li>
                    <li><RouterLink class="dropdown-item" :to="{name: 'userDetail'}">UserInfo</RouterLink></li>
                    <li><hr class="dropdown-divider" v-if="userStore.isAdmin"></li>
                    <!-- <li><RouterLink class="dropdown-item" :to="{name: 'userAdmin'}" v-if="userStore.isAdmin">Admin</RouterLink></li> -->
                    <li><RouterLink class="dropdown-item" to="/upload" v-if="userStore.isAdmin">FileUpload</RouterLink></li>
                </ul>
                </li>
                <!-- <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
            <form class="d-flex align-items-center" role="search" @submit.prevent="searchBoard">
                <input 
                    v-model="boardStore.searchCondition.word" 
                    class="form-control me-2 search-input" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    @keyup.enter="searchBoard"
                >
                <img 
                    src="@/assets/search-btn.png" 
                    alt="검색 버튼" 
                    @click.prevent="searchBoard" 
                    class="search-btn"
                />
            </form>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from "vue-router";
import { RouterLink } from 'vue-router';
import '@/assets/styles/main.scss'

import { useUserStore } from '@/stores/user'
import { useBoardStore } from "@/stores/board";

const router = useRouter();
const userStore = useUserStore();
const boardStore = useBoardStore();

const logout = function () { 
    userStore.logout()
}

const handleDropdownClick = () => {
  if (!userStore.isLoggedIn) {
    alert('로그인이 필요합니다');
  }
};

const resetSearch = function () {
    boardStore.resetSearch()
}

const searchBoard = function () {
  if (boardStore.searchCondition.word.trim() === "") {
    alert("검색어를 입력하세요.");
    return;
  }
  boardStore.searchBoard()
  router.push({ name: "boardList" })
};

onMounted(() => {
    userStore.checkLoginState()
})
</script>

<style >
/* 전역 스타일로 body에 대한 스타일을 정의 */
.navbar {
    --rg-gradient-a-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-a-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-b-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-b-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-c-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-c-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    background: var(--rg-gradient-c-25);
    transition: background 0.5s ease-in-out; /* 배경색 전환 시 부드럽게 변화하도록 설정 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자를 추가하여 깊이감 부여 */
    display: flex;
    align-items: center;
    justify-content: space-between; /* 좌우 정렬을 통해 로고와 메뉴가 양쪽 끝에 위치하도록 */
    padding: 1rem; /* 적절한 여백 추가 */
    margin: 0px;
    border-radius: 3%;
    position: sticky; /* 스크롤 시 상단에 고정 */
    top: 0;
    z-index: 1000; /* 다른 요소들 위에 배치 */
    height: 60px; /* 고정된 높이 설정 */
    opacity: 0.9; /* 불투명도를 약간 줄여 배경이 살짝 보이게 */
}

.navbar:hover {
    background: var(--rg-gradient-a-pressed); /* 호버 상태에서 밝기와 대비를 높여서 시각적으로 피드백 제공 */
}

.navbar:active {
    background: var(--rg-gradient-b-pressed); /* 활성 상태에서 조금 더 어두운 그라데이션으로 변경 */
}

.navbar a {
    color: #2c2c2c; /* 텍스트 색상을 어두운 회색으로 변경 (수정) */
    text-decoration: none; /* 밑줄 제거 */
    padding: 0.5rem 1rem;
    font-size: 1.3rem; /* 글자 크기 증가 (수정) */
    font-weight: bold; /* 볼드체로 설정 (수정) */
    transition: color 0.3s ease, transform 0.3s ease; /* 텍스트 색상이 부드럽게 변하도록 설정 */
}

.navbar a:hover {
    color: #9a840a; /* 링크에 호버 시 색상 변경 */
    transform: scale(1.05); /* 살짝 확대 효과 */
}

.search-input {
  width: 200px; /* 검색창 크기 지정 */
  height: 40px; /* 높이 일치 */
  padding: 0.5rem; /* 내부 여백 */
}

.search-btn {
  cursor: pointer;
  width: 40px; /* 버튼 크기 조정 */
  height: 40px; /* 버튼 크기 조정 */
  margin-left: 8px; /* 버튼과 입력창 간의 간격 추가 */
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column; /* 작은 화면에서는 세로 방향으로 정렬 */
        align-items: center;
    }
}
</style>