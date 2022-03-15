import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { RouterLink } from 'vue-router'

let wrapper;

describe('Home', () => {

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      stubs: {
        RouterLink: true
      }
    });
  })

  it('renders books link', () => {
    const linkWrapper = wrapper.find('[to="/books"]');

    expect(linkWrapper.exists()).toBeTruthy();
  });
})
