import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const REST_USER_API = `${process.env.VUE_APP_API_URL}/api/users`

export const useProfileImageStore = defineStore('profileImageStore', () => {

    const profileImage = ref({})

    const updateProfileImage = async function (image) {
        const formData = new FormData()
        formData.append('file', image)

        try {
            const response = await axios.put(`${REST_USER_API}/profile/update`, formData, {
                headers: {
                    'access-token': sessionStorage.getItem('access-token'),
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('이미지 업로드 성공', response.data)
        } catch (error) {
            console.error('이미지 업로드 실패', error)
            throw error
        }
    }

    // const resetProfileImage = function () {
    //     axios.put(`${REST_USER_API}/profile/reset`, {
    //         headers: {
    //             'access-token': sessionStorage.getItem('access-token'),
    //         }
    //     })
    //     .then(() => {
    //         console.log('이미지 초기화 성공')
    //     })
    //     .catch((error) => {
    //         console.log('이미지 초기화 실패', error)
    //     })
    // }

    return {
        profileImage,
        updateProfileImage,
        // resetProfileImage,
  }
})