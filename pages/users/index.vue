<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsers } from '@/composables/useUsers';
import { useRouter } from 'vue-router';

const { users, errorMessage, fetchUsers, loading } = useUsers();
const router = useRouter();

onMounted(fetchUsers);

// Navigate to user detail page
const goToUserDetail = (id: number) => {
  router.push(`/users/${id}`);
};
</script>

<template>
  <div>
    <h1>Users</h1>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading">Loading users...</p>

    <table v-else-if="users?.data?.length">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.data" :key="user.id" @click="goToUserDetail(user.id)" class="clickable">
          <td>
            <img :src="`http://localhost:9000/my-bucket/${user.imageUrl}`" alt="User Image" width="50" />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No users found.</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background-color: #f5f5f5;
}
</style>
