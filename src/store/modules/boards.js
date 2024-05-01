import { formatDate } from '@/util/dateUtil'

const boardStore = {
  state: {
    boards: [
      {
        "number": "1",
        "title": "첫 번째 게시글입니다.",
        "content": "안녕하세요. 이 글은 첫 번째 게시글입니다.",
        "author": "손종현",
        "password": "1234",
        "createdDate": "2024-01-01 00:00:00",
        "active": true,
      }
    ],
  },
  mutations: {
    setBoard(state, boards) {
      state.boards.push(boards)
    }
  },
  getters: {
    getBoards(state) {
      return state.boards.filter(b => b.active)
    },
    getBoard: (state) => (number) => {
      let board = new Object()
      let filteredBoard = state.boards.filter(b => b.active && b.number == number)
      if (filteredBoard.length > 0) {
        board = filteredBoard[0]
      }
      return board
    }
  },
  actions: {
    insertBoard({ state, commit }, data) {
      let boardNumber = 1
      // let boards = new Array()
      if (state.boards.length > 0) {
        let latestBoard = state.boards[state.boards.length - 1]
        boardNumber = Number(latestBoard.number) + 1
      }

      commit('setBoard', {
        "number": boardNumber,
        "title": data.title,
        "content": data.content,
        "author": data.author,
        "password": data.password,
        "createdDate": formatDate(new Date()),
        "active": true,
      })
    }
  }
}
export default boardStore