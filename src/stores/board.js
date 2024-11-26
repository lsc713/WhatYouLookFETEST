import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `${import.meta.env.VITE_APP_API_URL}/api/boards`

export const useBoardStore = defineStore('boardStore', () => {

  const boardList = ref([])
  const board = ref({})
  const isSearching = ref(false)
  const searchCondition = ref({
    key: "content",     // 일단 content 검색으로 고정
    word: "",
    orderBy: "none",    // 사용 X
    orderByDir: "asc",  // 사용 X
})

  const getBoardList = function () {
    if (isSearching.value) return

    axios.get(REST_BOARD_API)
      .then((response) => {
        boardList.value = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const searchBoard = function () {
    isSearching.value = true

    axios.get(`${REST_BOARD_API}/search`, {
      params: searchCondition.value
    })
      .then((response) => {
        boardList.value = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const resetSearch = function () {
    isSearching.value = false;
    searchCondition.value.word = "";
    getBoardList();
  };

  const getBoard = function (boardId) {
    axios.get(`${REST_BOARD_API}/${boardId}`)
      .then((response) => {
        board.value = response.data
      })
      .catch((error) => {
        console.log(error)
        router.push({ name: 'home' })
      })
  }

const createBoard = async function (board) {
  try {
    const response = await axios.post(REST_BOARD_API, board, {
      headers: {
        'access-token': sessionStorage.getItem('access-token'),
      },
    });
    console.log('업로드 성공', response);
    return response.data;
  } catch (error) {
    console.error('게시글 업로드 실패:', error);
    throw error;
  }
};

  const modifyBoard = async function (boardId) {
    try {
      await axios.put(`${REST_BOARD_API}/${boardId}`, board.value, {
        headers: {
          'access-token': sessionStorage.getItem('access-token')
        }
      });
    } catch (error) {
      console.error('게시글 수정 실패', error);
      throw error;
    }
  };

  const removeBoard = function (boardId) {
    axios.delete(`${REST_BOARD_API}/${boardId}`, {
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then(() => {
        alert('게시글이 삭제 되었습니다')
        router.push({ name: 'boardList' })
      })
      .catch((error) => {
        console.log(error)
        alert('게시글 삭제 중 문제가 발생했습니다')
        router.push(`/board/${boardId}`)
      })
  }

  return {
    boardList, board, searchCondition, isSearching,
    getBoardList, searchBoard, resetSearch, getBoard, createBoard, modifyBoard, removeBoard,
  }
})