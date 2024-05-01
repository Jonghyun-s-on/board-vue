<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { fetchJsonFile } from '@/util/JsonFileUtil'
onMounted(() => {
  searchBoard()
})
const router = useRouter()
const route = useRoute()
const store = useStore()
const board = ref(new Object())
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
const searchBoard = async () => {
  let selectedBoard = store.getters.getBoard(route.query.number)
  if (Object.keys(selectedBoard).length > 0) {
    board.value = selectedBoard
  } else {
    alert('not exists!')
    moveBack()
  }
}
const moveToWrite = () => {
  router.push({
    name: 'boardWrite',
    params: { number: route.query.number }
  })
}
const moveBack = () => {
  router.go(-1)
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
    <input type="text" class="form-control" v-model="board.title" readonly>
  </div>
  <div class="mb-3">
    <label class="form-label">Content</label>
    <textarea class="form-control" rows="3" v-model="board.content" readonly></textarea>
  </div>
  <div class="row">
    <div>
      <button type="button" class="col-1 btn btn-primary" @click="moveToWrite">Modify</button>
      <button type="button" class="col-1 offset-10 btn btn-danger" @click="moveBack">Back</button>
    </div>
  </div>
</template>
