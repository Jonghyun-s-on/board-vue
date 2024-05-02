<script setup>
// import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['boardList'])
const moveToView = (num) => {
  router.push({
    name: 'boardView',
    // params: { number: num } // can't be used with path
    query: { number: num } // by query string
  })
}
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Created Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="board of props.boardList" :key="board.number" @click="moveToView(board.boardNumber)">
        <th scope="row">{{ board.boardNumber }}</th>
        <td>{{ board.title }}</td>
        <td>{{ board.author }}</td>
        <td>{{ board.createdDate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
tbody>tr {
  cursor: pointer
}
</style>
