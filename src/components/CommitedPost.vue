<!-- eslint-disable max-len -->
<template>
  <div
    class="animate-bounce-slow bg-white mb-[1px] rounded shadow-md p-4 flex items-center justify-between"
  >
    <div>
      <p class="text-gray-700">{{ committedPost.metaData }}</p>
    </div>
    <button
      @click="restoreState"
      class="text-reset-button-text bg-reset-button hover:bg-reset-button/90 font-bold py-2 px-4 rounded"
    >
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
      type: Function || undefined,
    },
  },
};
</script>
