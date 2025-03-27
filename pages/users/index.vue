<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsers } from '@/composables/useUsers';

const { users, errorMessage, fetchUsers, loading } = useUsers();

onMounted(fetchUsers);
</script>

<template>
  <div>
    <h1>Users</h1>
    
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading">Loading users...</p>

    <ul v-else-if="users?.data.length">
      <li v-for="user in users.data" :key="user.id">
        <img :src="`http://localhost:9000/my-bucket/${user.imageUrl}`" alt="User Image" width="50" />
        <p>{{ user.name }} ({{ user.email }})</p>
      </li>
    </ul>

    <p v-else>No users found.</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
