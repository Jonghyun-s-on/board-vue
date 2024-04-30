<script setup>
import { defineProps } from 'vue'
const props = defineProps(['boardList'])
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
      <tr v-for="board of props.boardList" :key="board">
        <th scope="row">{{ board.number }}</th>
        <td>{{ board.title }}</td>
        <td>{{ board.author }}</td>
        <td>{{ board.createdDate }}</td>
      </tr>
    </tbody>
  </table>
</template>