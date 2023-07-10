<template>
  <div class="h-screen bg-[#F4F4F4] container mx-auto p-4 pt-10 container-backdrop">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 relative">
      <div>
        <div class="mb-4 pl-1 pt-3 text-left font-bold text-white">
          <h2>Sortable Post List</h2>
        </div>
        <div class="flex flex-col">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <PostComponent v-for="(post, index) in posts"
                :key="post.id"
                :post="post"
                :sortUp="index ? () => sortUp(post.index, index) : undefined"
                :sortDown="index < posts.length-1 ? () => sortDown(post.index, index) : undefined"
                 />
        </div>
      </div>
      <div>
        <div class="bg-white rounded shadow-md text-left justify-between">
          <div class="mb-4 pl-4 pt-3 font-bold">List of actions committed</div>
          <div class="bg-[#F4F4F4] p-4">
            <div>
              <CommittedPostComponent
                v-for="(history, i) in postHistory"
                :key="history.metaData"
                :committedPost="history"
                :restoreState="() => restoreState(i)"
                /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, onMounted,
} from 'vue';
import { HistoryElement, Post } from '@/types/interfaces';
import PostComponent from './Post.vue';
import CommittedPostComponent from './CommitedPost.vue';
import store from '../store';
import subscribers from '../store/subscriber';

/**
 * Encapsulates the logic when user entered the application.
 */
export default defineComponent({
  name: 'home-component',
  components: {
    PostComponent,
    CommittedPostComponent,
  },
  setup() {
    // Take the given post up by one level
    const sortUp = (originalIndex:number, index:number) => {
      store.dispatch('reOrderPosts', { originalIndex, index });
    };

    // Take the given post down by one level
    const sortDown = (originalIndex:number, index:number) => {
      store.dispatch('reOrderPosts', { originalIndex, index, upShift: false });
    };

    // Restore the post list from history element.
    const restoreState = (index:number) => {
      store.dispatch('restoreHistoryElement', index);
    };

    // Take the first number of posts which is stored in the store.
    const randomPosts = computed(():Post[] => {
      const { state: { posts = [] } = {} } = store;
      return posts;
    });

    // Get the list of history elements
    const postHistory = computed(():HistoryElement[] => {
      const { state: { committedPosts = [] } = {} } = store;
      return committedPosts;
    });

    onMounted(() => {
      store.dispatch('getPosts');
    });

    // Subscribe for selected mutations to create relevant history element.
    store.subscribe(subscribers.historySubscriber);

    return {
      sortUp,
      sortDown,
      restoreState,
      posts: randomPosts,
      postHistory,
    };
  },
});
</script>

<style scoped lang="scss">

.container-backdrop {
  position: relative;
  overflow: hidden;
}
.container-backdrop:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom:0;
  top: 0;
  width: 100%;
  height: 200%;
  background-color: rgba(79, 64, 161);
  -webkit-transform: rotate(83deg);
  -moz-transform: rotate(83deg);
  transform: rotate(83deg);
  transform-origin: top right;
  @media only screen and (max-width: 1000px)  {
    -webkit-transform: rotate(75deg);
    -moz-transform: rotate(75deg);
    transform: rotate(75deg);
  }
  @media only screen and (max-width: 600px)  {
    -webkit-transform: rotate(68deg);
    -moz-transform: rotate(68deg);
    transform: rotate(68deg);
  }
}
</style>
