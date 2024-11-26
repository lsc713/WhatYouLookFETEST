import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `${import.meta.env.VUE_APP_API_URL}/api/boards`

export const useBoardImageStore = defineStore('boardImageStore', () => {

  const boardImageThumbList = ref([])
  const boardImageList = ref([])

  const getBoardImageThumbsList = function () {
    axios.get(`${REST_BOARD_API}/thumbs`)
      .then((response) => {
        boardImageThumbList.value = response.data
      })
      .catch((error) => {
        console.log(error)
        router.push({ name: 'boardList' })
      })
  }

  const getBoardImageList = function (boardId) {
    axios.get(`${REST_BOARD_API}/${boardId}/images`)
      .then((response) => {
        boardImageList.value = response.data
      })
      .catch((error) => {
        console.log(error)
        router.push({ name: 'boardList' })
      })
  }

const uploadBoardImage = async function (boardId, images) {
  const formData = new FormData();
  
  Array.from(images).forEach((image) => formData.append('files', image));

  try {
    const response = await axios.post(`${REST_BOARD_API}/${boardId}/images`, formData, {
      headers: {
        'access-token': sessionStorage.getItem('access-token'),
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('이미지 업로드 성공');
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패', error);
    throw error;
  }
};

  const removeBoardImage = function (boardId, imageId) {
    axios.delete(`${REST_BOARD_API}/${boardId}/images/${imageId}`, {
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then(() => {
        alert('이미지가 삭제 되었습니다')
        getBoardImageList(boardId)
      })
      .catch((error) => {
        console.log(error)
        alert('이미지 삭제 중 문제가 발생했습니다')
        router.push(`/board/${boardId}`)
      })
  }

  return {
    boardImageThumbList, boardImageList,
    getBoardImageThumbsList, getBoardImageList, uploadBoardImage, removeBoardImage,
  }
})