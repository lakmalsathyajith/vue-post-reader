<!-- eslint-disable max-len -->
<template>
  <div class="animate-bounce-slow text-left mb-5 bg-white rounded shadow-md p-4 pt-0 pb-0 flex items-center justify-between min-h-[80px]">
            <div>
              <p class="text-gray-700"><strong>{{post.index}}</strong>. {{post.title}}</p>
            </div>
              <div class="flex align-center flex-col justify-center h-[60px] " :class="{'justify-between' : !!sortUp && !!sortDown }">
                <ChevronUpIcon
                  v-if="sortUp"
                  class="h-4 w-4 ml-3 cursor-pointer hover:opacity-60 dark:hover:opacity-5"
                  @click="sortUp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#6151AC"
                    class="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ChevronUpIcon>
                <ChevronDownIcon
                  class="h-4 w-4 ml-3 cursor-pointer hover:opacity-60 dark:hover:opacity-5"
                  @click="sortDown"
                  v-if="sortDown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#6151AC"
                    class="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ChevronDownIcon>
              </div>
          </div>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'post-component',
  props: {
    post: {
      type: Object,
      required: true,
    },
    sortUp: {
      type: Function,
    },
    sortDown: {
      type: Function,
    },
  },
};

</script>
