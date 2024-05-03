<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// mounted
onMounted(() => {
  if (props.number) {
    setBoard() // when modification mode
  }
})

// variables
const props = defineProps(['number'])
const { proxy } = getCurrentInstance()
const router = useRouter()
const store = useStore()
const author = ref(new String()) // board's author
const password = ref(new String()) // board's password
const title = ref(new String()) // board's title
const content = ref(new String()) // board's content

// methods
/**
 * save a board.
 */
const saveBoard = () => {
  if (author.value == '') {
    alert('author empty!')
    proxy.$refs.authorRef.focus() // focus on author input
    return false
  }
  if (password.value == '') {
    alert('password empty!')
    proxy.$refs.passwordRef.focus() // focus on password input
    return false
  }
  if (title.value == '') {
    alert('title empty!')
    proxy.$refs.titleRef.focus() // focus on title input
    return false
  }
  if (content.value == '') {
    alert('content empty!')
    proxy.$refs.contentRef.focus() // focus on content input
    return false
  }
  let action = props.number ? 'updateBoard' : 'insertBoard'
  // store.commit('setBoards') // access an mutation in store
  store.dispatch(action, {
    boardNumber: props.number,
    author: author.value,
    password: password.value,
    title: title.value,
    content: content.value
  }) // access an action in store
  alert('saved successfully!')
  moveBack()
}

/**
 * move to previous page.
 */
const moveBack = () => {
  router.go(-1)
}

/**
 * set a seleted board on inputs
 */
const setBoard = () => {
  let board = store.getters.getBoard(props.number)
  author.value = board.author
  title.value = board.title
  content.value = board.content
}
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Author</label>
    <input type="text" class="form-control" v-model="author" :readonly="props.number" ref="authorRef">
  </div>
  <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" v-model="password" ref="passwordRef">
  </div>
  <div class="mb-3">
    <label class="form-label">Title</label>
    <input type="text" class="form-control" v-model="title" ref="titleRef">
  </div>
  <div class="mb-3">
    <label class="form-label">Content</label>
    <textarea class="form-control" rows="3" v-model="content" ref="contentRef"></textarea>
  </div>
  <div class="row">
    <div>
      <button type="button" class="col-1 btn btn-primary" @click="saveBoard">Save</button>
      <button type="button" class="col-1 offset-10 btn btn-danger" @click="moveBack">Back</button>
    </div>
  </div>
</template>
