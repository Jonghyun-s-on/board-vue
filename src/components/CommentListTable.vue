<script setup>
const props = defineProps(['commentList'])
</script>

<template>
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
        <div class="col-6">
          <button type="button" class="btn btn-outline-primary"><i class="bi bi-pencil"></i></button>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
