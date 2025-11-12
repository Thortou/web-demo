<script setup lang="ts">
import { ref } from "vue";
import InputPrice from "./input/InputPrice.vue";
import InputText from "./input/InputText.vue";
const price = ref(0);
const username = ref('');
console.log('adminDashboard');
</script>

<template>
 <div class="dashboard">
  <h1 class="font-bold text-4xl text-slate-600"> Welcom to ERP</h1>
 </div>

 <div class="p-4 max-w-sm mx-auto">
    <label class="block mb-1 text-gray-700">Price</label>
    <InputPrice v-model="price" placeholder="Enter price" />
    <p class="mt-2 text-sm text-gray-500">Raw value: {{ price }}</p>
  </div>
  <div class="p-4 max-w-md mx-auto">
    <InputText v-model="username" label="ຊື່" placeholder="ປ້ອນຊື່" />
    <InputText v-model="username" label="ອີເມວ" placeholder="email@gmail.com" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
