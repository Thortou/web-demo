<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import Footer from "../../modules/website/Footer.vue";
const { push } = useRouter();
const menu = [
  { title: "ໜ້າຫຼັກ", link: "/" },
  { title: "ບໍລິການ", link: "/service" },
  { title: "ກ່ຽວກັບ", link: "/about" },
];
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0; // Fixed after scrolling 100px
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="w-full bg-white shadow">
    <!-- Dynamic Header (fixed when scrolled) -->
    <header 
      :class="{
        'fixed top-0 z-50 w-full bg-white backdrop-blur-sm shadow-lg ': isScrolled,
        'w-full bg-white shadow transition-all duration-300': !isScrolled
      }"
      class="px-4 py-4"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img
            src="/logo.png"
            class="rounded-full ring-2 w-10 h-10 ring-sky-400 object-cover"
            alt="Logo"
          />
          <h1 class="text-xl font-bold text-sky-400">TouMarket</h1>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Desktop Menu -->
          <nav class="hidden md:flex space-x-1">
            <router-link
              v-for="item in menu"
              :key="item.title"
              :to="item.link"
              class="transition px-4 py-2 rounded"
              :class="{
                'bg-sky-400 text-white': $route.path === item.link,
                'text-gray-700 hover:text-white hover:bg-sky-400':
                  $route.path !== item.link,
              }"
            >
              {{ item.title }}
            </router-link>
          </nav>

          <!-- Desktop Login -->
          <div class="button-register flex gap-1 items-center">
            <button
              @click="push('/admin')"
              class="hidden md:inline-block w-[6rem] px-4 py-2 ring-1 ring-slate-200 hover:text-white rounded hover:bg-sky-400 transition"
            >
              Sign in
            </button>
            <p>Or</p>
            <button
              @click="push('/admin')"
              class="hidden md:inline-block w-[6rem] px-4 py-2 ring-1 ring-slate-200 hover:text-white rounded hover:bg-sky-400 transition"
            >
              Sign up
            </button>
          </div>

          <!-- Mobile Hamburger -->
          <button
            class="md:hidden text-gray-700"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      :class="{
        'fixed top-[70px] left-0 right-0 z-40': isScrolled,
        'relative': !isScrolled
      }"
      class="md:hidden px-4 pb-4 space-y-2 bg-white border-t transition-all duration-300"
    >
      <router-link
        v-for="item in menu"
        :key="item.title"
        :to="item.link"
        class="block transition px-4 py-2 rounded"
        :class="{
          'bg-sky-400 text-white': $route.path === item.link,
          'text-gray-700 hover:text-white hover:bg-sky-400':
            $route.path !== item.link,
        }"
      >
        {{ item.title }}
      </router-link>

      <button
        @click="push('/admin')"
        class="block w-full text-left text-gray-700 hover:text-sky-500 transition"
      >
        ແອັດມິນ
      </button>
    </div>
  </div>

  <!-- Spacer for fixed header -->
  <div v-if="isScrolled" class="h-[70px]"></div>
  <div>
    <RouterView />
  </div>
  <Footer/>
</template>

<style scoped>
.text-primary {
  @apply text-blue-600;
}
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>