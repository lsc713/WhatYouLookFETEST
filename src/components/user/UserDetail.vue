<script setup>
import { onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'

const router = useRouter();
const userStore = useUserStore();

const modifyUser = function () { 
    router.push({name: 'userUpdate'})
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`  // "YYYY-MM-DD" 형식
}

onMounted(() => {
    userStore.errorMessage = ''
    userStore.getUser()
})

</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <div class="card shadow-sm" style="width: 30rem; border-radius: 12px; overflow: hidden;">
                <div class="card-header custom-bg text-white text-center">
                    <h4 class="card-title m-0">마이페이지</h4>
                </div>
                <div class="card-body">
                    <div class="mb-4">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-center align-items-center">
                                <img
                                  v-if="userStore.loginUser.filePath"
                                  :src="userStore.loginUser.filePath"
                                  alt="Profile Image"
                                  class="img-thumbnail mb-3 profile-img"
                                />
                                <img
                                    src="@/assets/no-image-500.png"
                                    v-else
                                    class="img-thumbnail mb-3 profile-img"
                                />
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>아이디</span>
                                <strong>{{ userStore.loginUser.accountId }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>계정등급</span>
                                <strong>{{ userStore.loginUser.type }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>닉네임</span>
                                <strong>{{ userStore.loginUser.nickname }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>별자리</span>
                                <strong>{{ userStore.loginUser.zodiacSign }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>생년월일</span>
                                <strong>{{ userStore.loginUser.birthDate }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>가입일</span>
                                <strong>{{ formatDate(userStore.loginUser.createdAt) }}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-success" @click="modifyUser">회원정보 수정</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    color: #08635d;
    font-weight: bold;
}

.card-header {
    font-size: 1.25rem;
    font-weight: bold;
    background-color: rgba(143, 255, 248, 0.6);
}

.custom-bg {
    background-color: rgba(143, 255, 248, 0.6);
}

.list-group-item {
    font-size: 1rem;
}

button {
    width: 100%;
    font-size: 1rem;
}

/* 프로필 이미지 스타일 */
.profile-img {
    max-width: 150px;
    height: auto;
    border-radius: 50%; /* 이미지 둥글게 */
    border: 3px solid #ddd; /* 테두리 추가 */
}

/* 가입일의 날짜 형식 */
strong {
    font-weight: 600;
}

.list-group-item span {
    font-weight: 500;
}

/* 버튼 스타일 */
button {
    width: 100%;
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 1.5em;
}
</style>