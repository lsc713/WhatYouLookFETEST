<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import UserProfileUploader from '@/components/user/UserProfileUploader.vue'
import { useProfileImageStore } from '@/stores/profileImage';

const router = useRouter()
const userStore = useUserStore();
const profileUploader = useProfileImageStore();

const image = ref(null)
const fileInput = ref(null)

const modifyUser = async function () {
  try {
    if (image.value) {
      await profileUploader.updateProfileImage(image.value)
      alert('프로필 이미지 업로드 성공')
    }

    await userStore.modifyUser(userStore.loginUser)
  } catch (error) {
    console.error('회원 수정 또는 이미지 업로드 실패', error)
    alert('회원 수정에 실패했습니다.')
  }
}

const backButton = function () {
    router.go(-1);
}

const handleImageClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

onMounted(() => {
    userStore.errorMessage = ''
})

</script>

<template>
    <div class="container py-5">
        <div class="card shadow-sm mx-auto" style="max-width: 400px;">
            <div class="card-header text-center bg-primary text-white">
                <h4>회원수정</h4>
            </div>
            <div class="card-body">
                <div v-if="userStore.errorMessage" class="alert alert-danger text-center" role="alert">
                    {{ userStore.errorMessage }}
                </div>
                <form @submit.prevent="modifyUser">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="accountId" placeholder="아이디" readonly v-model="userStore.loginUser.accountId">
                        <label for="accountId">아이디</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="비밀번호" v-model="userStore.loginUser.password">
                        <label for="password">비밀번호</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="nickname" placeholder="닉네임" v-model="userStore.loginUser.nickname">
                        <label for="nickname">닉네임</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="birthDate" placeholder="생년월일" v-model="userStore.loginUser.birthDate">
                        <label for="birthDate">생년월일</label>
                    </div>
                    <div class="mb-3">
                        <img
                        :src="userStore.loginUser.filePath"
                        class="img-thumbnail mb-3"
                        alt="프로필 이미지"
                        @click="handleImageClick"
                        />
                        <UserProfileUploader :image="image" @update:image="image = $event" />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary w-100">수정</button>
                    </div>
                </form>
                <br/>
                <button class="btn btn-primary w-100" @click="backButton">뒤로</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-header {
    font-size: 1.25rem;
    font-weight: bold;
}

.list-group-item {
    font-size: 1rem;
}

button {
    width: 100%;
    font-size: 1rem;
}
</style>