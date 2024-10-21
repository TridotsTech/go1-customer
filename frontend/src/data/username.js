import { ref, onMounted } from 'vue';
import { createResource } from 'frappe-ui';

const users = createResource({
  url: 'go1_customer.go1_customer.api.api.get_username',
  cache: ['full_name'],
  auto: true
});

export async function getUsername() {
  const username = ref('');

  onMounted(async () => {
    await users.loaded;

    if (users.data && users.data.length > 0) {
      username.value = users.data[0].full_name;
    } else {
      console.error('No data available or data is empty');
    }
  });

  return {
    username
  };
}
