<template>
    <a
      href="#"
      ref="scrollUp"
      class="scrollup fixed bottom-5 right-5 z-10 inline-flex items-center justify-center rounded-full bg-sky-500 p-3 text-white shadow-xl transition-all hover:bg-sky-600 hover:scale-105"
      aria-label="Scroll to top"
      @click.prevent="scrollToTop"
    >
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 19V6m0 0l-6 6m6-6l6 6"
        />
      </svg>
    </a>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const scrollUp = ref<HTMLElement | null>(null);
  
  const handleScroll = () => {
    if (!scrollUp.value) return;
    if (window.scrollY >= 350) {
      scrollUp.value.classList.add('show-scroll');
    } else {
      scrollUp.value.classList.remove('show-scroll');
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .scrollup {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  .scrollup.show-scroll {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  </style>
  