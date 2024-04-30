<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = ref(new String())
const content = ref(new String())
const saveBoard = () => {
  if (title.value == '') {
    alert('title empty!')
    return false
  }
  if (content.value == '') {
    alert('content empty!')
    return false
  }
  alert('saved successfully!')
  router.go(-1)
}
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Title</label>
    <input type="text" class="form-control" v-model="title">
  </div>
  <div class="mb-3">
    <label class="form-label">Content</label>
    <textarea class="form-control" rows="3" v-model="content"></textarea>
  </div>
  <div class="row">
    <div>
      <button type="button" class="col-1 btn btn-primary" @click="saveBoard">Save</button>
    </div>
  </div>
</template>
