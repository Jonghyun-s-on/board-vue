<script setup>
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps(['commentList'])
const emit = defineEmits(["reload"])
const removeComment = (num) => {
  let password = prompt("Please enter the password to delete it.")
  if (password) {
    let selectedComment = store.getters.getComment(num)
    if (password == selectedComment.password) {
      store.dispatch('updateComment', {
        commentNumber: selectedComment.commentNumber,
        active: false,
      })
      alert('deleted successfully.')
      emit('reload')
    } else {
      alert('The password does not match.')
    }
  }
}
</script>

<template>
  <template v-if="props.commentList.length > 0">
    <div v-for="comment of props.commentList" :key="comment.commentNumber" class="row mb-2">
      <div class="col-2">
        <input class="form-control text-center" :value="comment.author" readonly>
      </div>
      <div class="col-7">
        <textarea class="form-control" :value="comment.comment" readonly rows="1"></textarea>
      </div>
      <div class="col-2">
        <input class="form-control" :value="comment.createdDate" readonly>
      </div>
      <div class="col-1">
        <div class="row">
          <button type="button" class="btn btn-outline-danger" @click="removeComment(comment.commentNumber)"><i
              class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="text-center">
      Please leave the first comment!
    </div>
  </template>
</template>
