import { formatDate } from '@/util/dateUtil'

const boardStore = {
  state: {
    boards: [
      {
        "boardNumber": "1",
        "title": "첫 번째 게시글입니다.",
        "content": "안녕하세요. 이 글은 첫 번째 게시글입니다.",
        "author": "손종현",
        "password": "1234",
        "createdDate": "2024-01-01 00:00:00",
        "modifiedDate": "2024-01-01 00:00:00",
        "active": true,
      }
    ],
  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    }
  },
  getters: {
    getBoards(state) {
      return state.boards.filter(b => b.active)
    },
    getBoard: (state) => (number) => {
      let board = new Object()
      let filteredBoard = state.boards.filter(b => b.active && b.boardNumber == number)
      if (filteredBoard.length > 0) {
        board = filteredBoard[0]
      }
      return board
    }
  },
  actions: {
    insertBoard({ state, commit }, data) {
      let newBoards = new Array()
      let boardNumber = 1
      if (state.boards.length > 0) {
        let latestBoard = state.boards[state.boards.length - 1]
        boardNumber = Number(latestBoard.boardNumber) + 1
        newBoards = state.boards
      }
      newBoards.push({
        "boardNumber": boardNumber,
        "title": data.title,
        "content": data.content,
        "author": data.author,
        "password": data.password,
        "createdDate": formatDate(new Date()),
        "modifiedDate": formatDate(new Date()),
        "active": true,
      })
      commit('setBoards', newBoards)
    },
    updateBoard({ state, commit }, data) {
      for (let b of state.boards) {
        if (b.boardNumber == data.boardNumber) {
          b.author = data.author
          b.password = data.password
          b.title = data.title
          b.content = data.content
          b.modifiedDate = formatDate(new Date())
        }
      }
      commit('setBoards', state.boards)
    }
  }
}
export default boardStore