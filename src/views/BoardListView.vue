<script setup>
import { ref, onMounted } from 'vue'
// import { fetchJsonFile } from '@/util/JsonFileUtil'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BoardListTable from '../components/BoardListTable.vue'
onMounted(() => {
  searchBoardList()
})
const router = useRouter()
const store = useStore()
const boardList = ref(new Array())
const titleKeyword = ref(new String())
const searchBoardList = async () => {
  // boardList.value = await fetchJsonFile('/data/boards.json')
  boardList.value = store.getters.getBoards
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
    <button type="button" class="col-1 btn btn-primary" @click="searchBoardList">Search</button>
  </div>
  <BoardListTable :boardList="boardList" />
  <div class="row">
    <div>
      <button type="button" class="col-1 btn btn-primary" @click="moveToWrite">Write</button>
    </div>
  </div>
</template>
