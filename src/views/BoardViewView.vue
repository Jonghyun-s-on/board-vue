<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CommentListTable from '@/components/CommentListTable.vue'
// mounted
onMounted(() => {
  searchBoard(route.query.number)
})

// variables
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = useStore()
const board = ref(new Object()) // a selected board
const commentList = ref(new Array()) // selected board's comments
const author = ref(new String()) // comment's author
const password = ref(new String()) // comment's password
const comment = ref(new String()) // comment's comment

// methods
/**
 * search a selected board.
 * 
 * @param {number} num boardNumber
 */
const searchBoard = (num) => {
  let selectedBoard = store.getters.getBoard(num)
  board.value = selectedBoard
  commentList.value = searchComments(num)
}

/**
 * search selected board's comments.
 * 
 * @param {number} num boardNumber
 * @returns {array} comments
 */
const searchComments = (num) => {
  return store.getters.getComments(num)
}

/**
 * move to board write page with params to update the board.
 * 
 * @param {number} num boardNumber
 */
const moveToWrite = (num) => {
  router.push({
    name: 'boardWrite',
    params: { number: num }
  })
}

/**
 * move to board list page.
 */
const moveToList = () => {
  router.push({
    name: 'boardList'
  })
}

/**
 * save a comment.
 * 
 * @param {number} num boardNumber
 */
const saveComment = (num) => {
  if (author.value == '') {
    alert('author empty!')
    proxy.$refs.authorRef.focus() // focus on author input
    return false
  }
  if (comment.value == '') {
    alert('comment empty!')
    proxy.$refs.commentRef.focus() // focus on comment input
    return false
  }
  if (password.value == '') {
    alert('password empty!')
    proxy.$refs.passwordRef.focus() // focus on password input
    return false
  }
  store.dispatch('insertComment', {
    boardNumber: num,
    author: author.value,
    comment: comment.value,
    password: password.value,
  })
  resetCommentInputValues() // reset input values
  commentList.value = searchComments(num)
}

/**
 * reset comment input values.
 */
const resetCommentInputValues = () => {
  author.value = ''
  password.value = ''
  comment.value = ''
}

/**
 * reload comments.
 * 
 * @param {number} num boardNumber
 */
const reloadComments = (num) => {
  commentList.value = searchComments(num)
}

/**
 * remove a selected board.
 */
const removeBoard = (num) => {
  let password = prompt("Please enter the password to delete it.")
  if (password) {
    if (password == board.value.password) {
      store.dispatch('removeComments', {
        boardNumber: num
      })
      store.dispatch('updateBoard', {
        boardNumber: num,
        active: "N",
      })
      alert('deleted successfully.')
      moveToList()
    } else {
      alert('The password does not match.')
    }
  }
}
</script>

<template>
  <div class="mb-5">
    <div class="row">
      <label class="col-2 col-form-label">Author</label>
      <div class="col-2">
        <input type="text" class="form-control-plaintext" v-model="board.author" readonly>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-6 col-sm-2 col-form-label">Created Date</label>
      <div class="col-6 col-sm-2">
        <input type="text" class="form-control-plaintext" v-model="board.createdDate" readonly>
      </div>
      <label class="col-6 col-sm-2 col-form-label">Modified Date</label>
      <div class="col-6 col-sm-2">
        <input type="text" class="form-control-plaintext" v-model="board.modifiedDate" readonly>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input type="text" class="form-control" v-model="board.title" readonly>
    </div>
    <div class="mb-3">
      <label class="form-label">Content</label>
      <textarea class="form-control" rows="3" v-model="board.content" readonly></textarea>
    </div>
    <div class="row">
      <div class="col-3 col-sm-1">
        <button type="button" class="w-100 btn btn-outline-primary"
          @click="moveToWrite(board.boardNumber)">Modify</button>
      </div>
      <div class="col-3 col-sm-1">
        <button type="button" class="w-100 btn btn-outline-danger"
          @click="removeBoard(board.boardNumber)">remove</button>
      </div>
      <div class="col-3 offset-3 col-sm-1 offset-sm-9">
        <button type="button" class="w-100 btn btn-outline-secondary" @click="moveToList">Back</button>
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <p class="h5">Comments</p>
  </div>
  <div class="row mb-5">
    <CommentListTable :commentList="commentList" @reload="reloadComments(board.boardNumber)" />
  </div>
  <div class="row">
    <div class="col-2">
      <div class="mb-3">
        <label class="form-label">Author</label>
        <input type="text" class="form-control" placeholder="Author" v-model="author" ref="authorRef">
      </div>
    </div>
    <div class="col-8">
      <div class="mb-3">
        <label class="form-label">Comment</label>
        <input type="text" class="form-control" placeholder="Please enter your comment here!" v-model="comment"
          ref="commentRef">
      </div>
    </div>
    <div class="col-2">
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password" ref="passwordRef">
      </div>
    </div>
    <div class="row">
      <div class="col-3 col-sm-1">
        <button type="button" class="w-100 btn btn-outline-primary"
          @click="saveComment(board.boardNumber)">Save</button>
      </div>
    </div>
  </div>
</template>
