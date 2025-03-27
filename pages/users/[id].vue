<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '@/utils/apiService';
import type { User } from '@/types/userTypes';

const route = useRoute();
const user = ref<User | null>(null);
const errorMessage = ref<string | null>(null);
const loading = ref<boolean>(false);

const fetchUserDetail = async () => {
    loading.value = true;
    try {
        const userId = route.params.id;
        const response = await apiService<{ success: boolean; data: User }>(`/api/users/view/${userId}`, 'GET');

        if (response.success) {
            user.value = response.data;
        } else {
            throw new Error("User not found");
        }
    } catch (error: any) {
        errorMessage.value = error.message || 'Failed to load user details';
    } finally {
        loading.value = false;
    }
};

onMounted(fetchUserDetail);
</script>

<template>
    <div>
        <h1>User Details</h1>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="loading">Loading user details...</p>

        <div v-else-if="user">
            <img :src="`http://localhost:9000/my-bucket/${user.imageUrl}`" alt="User Image" width="100" />
            <h2>{{ user.name }}</h2>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Username:</strong> {{ user.username }}</p>
        </div>

        <p v-else>User not found.</p>
    </div>
</template>

<style scoped>
.error {
    color: red;
    font-weight: bold;
}

h1 {
    margin-bottom: 10px;
}

img {
    border-radius: 10px;
    margin-bottom: 10px;
}

div {
    text-align: center;
    padding: 20px;
}
</style>
