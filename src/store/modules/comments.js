import { formatDate } from '@/util/dateUtil'

const commentStore = {
  state: {
    comments: [
      {
        "commentNumber": "1",
        "boardNumber": "1",
        "comment": "안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다. 안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다. 안녕하세요. 이 글은 첫 번째 게시글의 첫 번째 댓글입니다.",
        "author": "홍길동",
        "password": "1234",
        "createdDate": "2024-01-01 00:00:00",
        "modifiedDate": "2024-01-01 00:00:00",
        "active": true,
      },
      {
        "commentNumber": "2",
        "boardNumber": "1",
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
  },
  actions: {
    insertComment({ state, commit }, data) {
      let newComments = new Array()
      let commentNumber = 1
      if (state.comments.length > 0) {
        let latestComment = state.comments[state.comments.length - 1]
        commentNumber = Number(latestComment.commentNumber) + 1
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
    updateComment() {

    }
  }
}
export default commentStore