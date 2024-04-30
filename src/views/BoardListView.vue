<script setup>
import { ref } from 'vue'
import BoardListTable from '../components/BoardListTable.vue'
import boards from '@/data/boards.json'
const boardList = ref(new Array())
const searchBoardList = () => {
  boardList.value = boards
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
    <button></button>
  </div>
</template>
