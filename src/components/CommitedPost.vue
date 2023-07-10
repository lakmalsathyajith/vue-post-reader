<!-- eslint-disable max-len -->
<template>
  <div class="animate-bounce-slow border-b-2 bg-white rounded shadow-md p-4 flex items-center justify-between">
    <div>
      <p class="text-gray-700">{{ committedPost.metaData }}</p>
    </div>
    <button @click="restoreState" class="text-[#334B3F] bg-[#2DFF7E] hover:bg-[#2DFF7E]/90 font-bold py-2 px-4 rounded">
      Time travel
    </button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'committed-post-component',
  props: {
    committedPost: {
      type: Object,
      required: true,
    },
    restoreState: {
      type: Function,
    },
  },
};
</script>
