<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BoardListTable from '../components/BoardListTable.vue'
// mounted
onMounted(() => {
  searchBoardList()
})

// variables
const router = useRouter()
const store = useStore()
const titleKeyword = ref(new String()) // input value
const boardList = ref(new Array())

// methods
/**
 * search boards.
 */
const searchBoardList = () => {
  boardList.value = store.getters.getBoards.filter(b => b.title.includes(titleKeyword.value))
}

/**
 * move to board write page.
 */
const moveToWrite = () => {
  router.push({
    name: 'boardWrite'
  })
}
</script>

<template>
  <div class="row mb-3">
    <div class="col-1">
      <label class="col-form-label">
        Title
      </label>
    </div>
    <div class="col-10">
      <input type="text" class="form-control" placeholder="Please enter your keyword(s) to search."
        v-model="titleKeyword">
    </div>
    <div class="col-1">
      <button type="button" class="w-100 btn btn-outline-primary" @click="searchBoardList">Search</button>
    </div>
  </div>
  <BoardListTable :boardList="boardList" />
  <div class="row">
    <div class="col-1">
      <button type="button" class="w-100 btn btn-outline-primary" @click="moveToWrite">Write</button>
    </div>
  </div>
</template>
