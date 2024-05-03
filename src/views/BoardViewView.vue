<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CommentListTable from '@/components/CommentListTable.vue'
// import { fetchJsonFile } from '@/util/JsonFileUtil'
onMounted(() => {
  searchBoard(route.query.number)
})
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = useStore()
const board = ref(new Object())
const commentList = ref(new Array())
const author = ref(new String())
const comment = ref(new String())
const password = ref(new String())
// let originBoard = new Object()
// const props = defineProps(['number']) // be active when 'props: true' on router/index.js
// const searchBoard = async () => {
//   const boardList = await fetchJsonFile('/data/boards.json')
//   boardList.forEach(b => {
//     if (b.number == route.query.number) {
//       originBoard = Object.assign(new Object(), b) // deep copy
//       board.value = b
//     }
//   })
// }
const searchBoard = (num) => {
  let selectedBoard = store.getters.getBoard(num)
  board.value = selectedBoard
  commentList.value = searchComments(num)
}

const searchComments = (num) => {
  return store.getters.getComments(num)
}

const moveToWrite = (num) => {
  router.push({
    name: 'boardWrite',
    params: { number: num }
  })
}

const moveBack = () => {
  router.go(-1)
}

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
  commentList.value = searchComments(num)
}
const reloadComments = (num) => {
  commentList.value = searchComments(num)
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
      <label class="col-2 col-form-label">Created Date</label>
      <div class="col-2">
        <input type="text" class="form-control-plaintext" v-model="board.createdDate" readonly>
      </div>
      <label class="col-2 col-form-label">Modified Date</label>
      <div class="col-2">
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
      <div>
        <button type="button" class="col-1 btn btn-primary" @click="moveToWrite(board.boardNumber)">Modify</button>
        <button type="button" class="col-1 offset-10 btn btn-danger" @click="moveBack">Back</button>
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
      <div>
        <button type="button" class="col-1 btn btn-primary" @click="saveComment(board.boardNumber)">Save</button>
      </div>
    </div>
  </div>
</template>
