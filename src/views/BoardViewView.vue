<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchJsonFile } from '@/util/JsonFileUtil'
onMounted(() => {
  searchBoard()
})
const route = useRoute()
const router = useRouter()
const board = ref(new Object())
const modify = ref(false)
let originBoard = new Object()
// const props = defineProps(['number']) // be active when 'props: true' on router/index.js
const searchBoard = async () => {
  const boardList = await fetchJsonFile('/data/boards.json')
  boardList.forEach(b => {
    if (b.number == route.query.number) {
      originBoard = Object.assign(new Object(), b)//deep copy
      board.value = b
    }
  })
}
const saveBoard = () => {
  alert('saved successfully!')
  router.go(-1)
}
const resetBoard = () => {
  board.value = Object.assign(new Object(), originBoard)//deep copy
  modify.value = false
}

</script>

<template>
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
  </div>
  <div class="mb-3">
    <label class="form-label">Title</label>
    <input type="text" class="form-control" v-model="board.title" :readonly="!modify">
  </div>
  <div class="mb-3">
    <label class="form-label">Content</label>
    <textarea class="form-control" rows="3" v-model="board.content" :readonly="!modify"></textarea>
  </div>
  <div class="row">
    <div v-if="!modify">
      <button type="button" class="col-1 btn btn-primary" @click="() => { modify = !modify }">Modify</button>
    </div>
    <div v-else>
      <button type="button" class="col-1 btn btn-primary mr-4" @click="saveBoard">Save</button>
      <button type="button" class="col-1 btn btn-danger" @click="resetBoard">Cancel</button>
    </div>
  </div>
</template>
<style scoped>
  .mr-4 {
    margin-right: 4px;
  }
</style>
