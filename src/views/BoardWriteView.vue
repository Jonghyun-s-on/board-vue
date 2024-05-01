<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// variables
const { proxy } = getCurrentInstance()
const router = useRouter()
const store = useStore()
const author = ref(new String())
const password = ref(new String())
const title = ref(new String())
const content = ref(new String())

// methods
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
  // store.commit('setBoard') // access an mutation in store
  store.dispatch('insertBoard', {
    author: author.value,
    password: password.value,
    title: title.value,
    content: content.value
  }) // access an action
  alert('saved successfully!')
  moveBack()
}
const moveBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Author</label>
    <input type="text" class="form-control" v-model="author" ref="authorRef">
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
