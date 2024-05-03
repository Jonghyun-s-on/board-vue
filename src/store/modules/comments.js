import { formatDate } from '@/util/dateUtil'

const commentStore = {
  state: {
    comments: [
      {
        "commentNumber": 1,
        "boardNumber": 1,
        "comment": "안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다. 안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다. 안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다.",
        "author": "홍길동",
        "password": "1234",
        "createdDate": "2024-01-01 00:00:00",
        "modifiedDate": "2024-01-01 00:00:00",
        "active": true,
      },
      {
        "commentNumber": 2,
        "boardNumber": 1,
        "comment": "안녕하세요. 이 글은 첫 번째 게시글의 두 번째 댓글입니다.",
        "author": "바보",
        "password": "1234",
        "createdDate": "2024-01-01 00:00:00",
        "modifiedDate": "2024-01-01 00:00:00",
        "active": true,
      }
    ],
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments
    }
  },
  getters: {
    getComments: (state) => (number) => {
      return state.comments.filter(c => c.active && c.boardNumber == number)
    },
    getComment: (state) => (number) => {
      let comment = new Object()
      let filteredComment = state.comments.filter(c => c.active && c.commentNumber == number)
      if (filteredComment.length > 0) {
        comment = filteredComment[0]
      }
      return comment
    }
  },
  actions: {
    insertComment({ state, commit }, data) {
      let newComments = new Array()
      let commentNumber = 1
      if (state.comments.length > 0) {
        let latestComment = state.comments[state.comments.length - 1]
        commentNumber = latestComment.commentNumber + 1
        newComments = state.comments
      }
      newComments.push({
        "commentNumber": commentNumber,
        "boardNumber": data.boardNumber,
        "comment": data.comment,
        "author": data.author,
        "password": data.password,
        "createdDate": formatDate(new Date()),
        "modifiedDate": formatDate(new Date()),
        "active": true,
      })
      commit('setComments', newComments)
    },
    updateComment({ state, commit }, data) {
      for (let c of state.comments) {
        if (c.commentNumber == data.commentNumber) {
          c.active = data.active
          c.modifiedDate = formatDate(new Date())
        }
      }
      commit('setComments', state.comments)
    }
  }
}
export default commentStore