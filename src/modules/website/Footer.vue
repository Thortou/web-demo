<script setup lang="ts">
const menu = [
  { title: "ໜ້າຫຼັກ", link: "/" },
  { title: "ບໍລິການ", link: "/service" },
  { title: "ກ່ຽວກັບ", link: "/about" },
];
</script>

<template>
  <footer class="bg-sky-50 text-gray-700 mt-10 border-t">
    <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo + Title -->
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-12 h-12 rounded-full ring-2 ring-sky-400 object-cover" />
        <div>
          <h2 class="text-xl font-bold text-sky-400">ຂໍ້ມູນສ່ວນຕົວ</h2>
          <p class="text-sm">ພັດທະນາເວັບ ແລະ ລະບົບອອນໄລນ໌</p>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold mb-2">ເມນູ</h3>
        <ul class="space-y-1">
          <li v-for="item in menu" :key="item.title">
            <a
              :href="item.link"
              class="hover:text-sky-500 transition"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Social / Contact -->
      <div>
        <h3 class="text-lg font-semibold mb-2">ຕິດຕໍ່</h3>
        <p class="text-sm mb-2">ອີເມວ: thortouherdev@email.com</p>
        <p class="text-sm">ໂທ: +856 20 1234 5678</p>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t text-center py-4 text-sm text-gray-500">
      © {{ new Date().getFullYear() }} ຂໍ້ມູນສ່ວນຕົວ. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
</style>
