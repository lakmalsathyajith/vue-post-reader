/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import { mount, shallowMount } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import PostComponent from '@/components/Post.vue';
import CommittedPostComponent from '@/components/CommitedPost.vue';

const posts = [
  {
    userId: 1,
    id: 1,
    title: 'title 1',
    body: 'quia et suscipit\nsuscipit recusandae ',
    index: 1,
  },
  {
    userId: 1,
    id: 2,
    title: 'title 2',
    body: 'est rerum tempore vitae\nsequi sint nihila',
    index: 2,
  },
  {
    userId: 1,
    id: 3,
    title: 'title 3',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis',
    index: 3,
  },
  {
    userId: 1,
    id: 4,
    title: 'title 4',
    body: 'ullam et saepe reiciendis voluptatem ',
    index: 4,
  },
  {
    userId: 1,
    id: 5,
    title: 'title 5',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut ',
    index: 5,
  },
  {
    userId: 1,
    id: 6,
    title: 'title 6',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut ',
    index: 6,
  },
  {
    userId: 1,
    id: 7,
    title: 'title 7',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut ',
    index: 7,
  },
  {
    userId: 1,
    id: 8,
    title: 'title 8',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut ',
    index: 8,
  },
];

jest.mock('axios', () => {
  const mAxiosInstance = { get: async () => ({ data: posts }) };
  return {
    create: jest.fn(() => mAxiosInstance),
  };
});

describe('Home.vue', () => {
  it('renders home component post list heading.', () => {
    const msg = 'Sortable Post List';
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch(msg);
  });
  it('renders home component committed post list heading.', () => {
    const msg = 'List of actions committed';
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).toMatch(msg);
  });
  it('renders home component with 5 posts.', () => {
    const wrapper = mount(Home);
    expect(wrapper.findAllComponents(PostComponent)).toHaveLength(5);
  });

  it('renders home component with 2 history elements.', async () => {
    const wrapper = mount(Home);
    const postComponents = wrapper.findAllComponents(PostComponent);
    let index = 0;
    for (const postComponent of postComponents) {
      await (async () => {
        if (index === 3) {
          const sortDownButton = postComponent.find('.sort-down');
          await sortDownButton.trigger('click');
        }
        if (index === 4) {
          const sortUpButton = postComponent.find('.sort-up');
          await sortUpButton.trigger('click');
        }
      })();

      index += 1;
    }
    expect(wrapper.findAllComponents(CommittedPostComponent)).toHaveLength(2);
  });
  it('renders home component have no committed posts, when oldest history item is clicked.', async () => {
    const wrapper = mount(Home);
    const postComponents = wrapper.findAllComponents(PostComponent);
    let index = 0;
    for (const postComponent of postComponents) {
      await (async () => {
        if (index === 3) {
          const sortDownButton = postComponent.find('.sort-down');
          await sortDownButton.trigger('click');
        }
        if (index === 4) {
          const sortUpButton = postComponent.find('.sort-up');
          await sortUpButton.trigger('click');
        }
      })();

      index++;
    }
    const committedPostComponents = wrapper.findAllComponents(CommittedPostComponent);
    const lastCommittedPostComponent = committedPostComponents[committedPostComponents.length - 1];
    const lastCommittedPostComponentButton = lastCommittedPostComponent.find('button');
    await lastCommittedPostComponentButton.trigger('click');
    expect(wrapper.findAllComponents(CommittedPostComponent)).toHaveLength(0);
  });
  it('renders home component posts are in original order, when oldest history item is clicked.', async () => {
    const wrapper = mount(Home);
    const postComponents = wrapper.findAllComponents(PostComponent);

    const originalOrder = postComponents.map((post) => post.find('p').text());
    let index = 0;
    for (const postComponent of postComponents) {
      await (async () => {
        if (index === 3) {
          const sortDownButton = postComponent.find('.sort-down');
          await sortDownButton.trigger('click');
        }
        if (index === 4) {
          const sortUpButton = postComponent.find('.sort-up');
          await sortUpButton.trigger('click');
        }
      })();

      index++;
    }
    const committedPostComponents = wrapper.findAllComponents(CommittedPostComponent);
    const lastCommittedPostComponent = committedPostComponents[committedPostComponents.length - 1];
    const lastCommittedPostComponentButton = lastCommittedPostComponent.find('button');
    await lastCommittedPostComponentButton.trigger('click');

    const postComponentsAfterRestore = wrapper.findAllComponents(PostComponent);
    const postComponentsAfterRestoreOrder = postComponentsAfterRestore.map((post) => post.find('p').text());

    expect(originalOrder).toEqual(postComponentsAfterRestoreOrder);
  });

  it('renders home component posts are in original order, when a time travel is clicked.', async () => {
    const wrapper = mount(Home);
    const postComponents = wrapper.findAllComponents(PostComponent);

    let originalOrder;
    let index = 0;
    for (const postComponent of postComponents) {
      await (async () => {
        if (index < 3) {
          const sortDownButton = postComponent.find('.sort-down');
          await sortDownButton.trigger('click');
        } else {
          const sortUpButton = postComponent.find('.sort-up');
          await sortUpButton.trigger('click');
        }
        if (index === 2) {
          originalOrder = wrapper.findAllComponents(PostComponent).map((post) => post.find('p').text());
        }
      })();

      index++;
    }

    const committedPostComponents = wrapper.findAllComponents(CommittedPostComponent);
    const lastCommittedPostComponentButton = committedPostComponents[3].find('button');
    await lastCommittedPostComponentButton.trigger('click');
    const postComponentsAfterRestore = wrapper.findAllComponents(PostComponent);
    const postComponentsAfterRestoreOrder = postComponentsAfterRestore.map((post) => post.find('p').text());

    expect(originalOrder).toEqual(postComponentsAfterRestoreOrder);
  });
});
