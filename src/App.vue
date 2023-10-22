<script setup>
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'
import {ref, onMounted} from "vue";

axios.defaults.withCredentials = true;

const form = ref({
  email: '',
  password: ''
});

const user = ref();

async function onLogin() {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  await axios.post("http://localhost:8000/login", {
    email: form.value.email,
    password: form.value.password,
  })

  // Fetch user data after login
  await fetchUserData();
  console.log('User logged in');
}


async function onLogout() {
  await axios.post("http://localhost:8000/logout");

  // Clear the user data
  user.value = null;
  console.log('User logged out!');
}

async function fetchUserData() {
  try {
    let { data } = await axios.get("http://localhost:8000/api/user");
    user.value = data;
  } catch (error) {
    if (error.response.status !== 401) {
      // Handle other errors
      console.error("Error fetching user data:", error);
    }
  }
}

 onMounted(async () => {
   // Fetch user data on component mount
   await fetchUserData();
 });

</script>

<template>
  <main>
    {{ user }}

    <form @submit.prevent="onLogin">
      <input type="text" v-model="form.email" placeholder="email">
      <input type="text" v-model="form.password" placeholder="password">
      <button type="submit">login</button>
    </form>

    <button @click="onLogout">Logout</button>
  </main>
</template>

<style scoped>
</style>
