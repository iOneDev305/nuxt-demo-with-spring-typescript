import { ref } from 'vue';
import { apiService } from '@/utils/apiService';
import type { UsersResponse, User } from '@/types/userTypes';

export function useUsers() {
  const users = ref<UsersResponse | null>(null);
  const userDetail = ref<User | null>(null); // Store a single user's detail
  const errorMessage = ref<string | null>(null);
  const loading = ref<boolean>(false);

  // Fetch all users
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

  // Fetch user details by ID
  const fetchUserDetail = async (id: number) => {
    loading.value = true;
    try {
      const response = await apiService<{ success: boolean; data: User; message?: string }>(
        `/api/users/view/${id}`,
        'GET'
      );
      if (response.success) {
        userDetail.value = response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch user details');
      }
    } catch (error: any) {
      errorMessage.value = error.message || 'Error fetching user details';
    } finally {
      loading.value = false;
    }
  };

  return { users, userDetail, errorMessage, fetchUsers, fetchUserDetail, loading };
}
