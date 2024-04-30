<script setup>
import { ref, onMounted } from 'vue'
import { fetchJsonFile } from '@/util/JsonFileUtil'
import { useRouter } from 'vue-router'
import BoardListTable from '../components/BoardListTable.vue'
onMounted(() => {
  searchBoardList()
})
const router = useRouter()
const boardList = ref(new Array())
const titleKeyword = ref(new String())
const searchBoardList = async () => {
  boardList.value = await fetchJsonFile('/data/boards.json')
}
const moveToWrite = () => {
  router.push({
    name: 'boardWrite'
  })
}
</script>

<template>
  <div class="row mb-3">
    <label class="col-1 col-form-label">
      Title
    </label>
    <div class="col-10">
      <input type="text" class="form-control" placeholder="Please enter your keyword(s) to search."
        v-model="titleKeyword">
    </div>
    <div class="col-1">
      <button type="button" class="btn btn-primary" @click="searchBoardList">Search</button>
    </div>
  </div>
  <BoardListTable :boardList="boardList" />
  <div class="row">
    <div class="col-1">
      <button type="button" class="btn btn-primary" @click="moveToWrite">Write</button>
    </div>
  </div>
</template>
