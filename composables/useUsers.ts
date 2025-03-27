import { ref } from 'vue';
import { apiService } from '@/utils/apiService';
import type { UsersResponse } from '@/types/userTypes';

export function useUsers() {
  const users = ref<UsersResponse | null>(null);
  const errorMessage = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await apiService<UsersResponse>('/api/users', 'GET');
      if (response.success) {
        users.value = response;        
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      errorMessage.value = error.message || 'Failed to fetch users';
    } finally {
      loading.value = false;
    }
  };

  return { users, errorMessage, fetchUsers, loading };
}
