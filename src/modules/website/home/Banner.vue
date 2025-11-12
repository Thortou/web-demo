<script setup lang="ts">
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { onMounted, ref, nextTick } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = ref<string[]>([]);
const image = ["/banner1.png", "/banner2.png"];

onMounted(async () => {
  slides.value = image;

  await nextTick(); // ✅ Wait until DOM is rendered

  const hero = new Swiper(".hero", {
    loop: true,
    modules: [Navigation, Pagination],
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      bulletClass:
        "inline-block w-3 h-3 rounded-full bg-white/50 hover:bg-white",
      bulletActiveClass: "!bg-white w-[40px]",
      clickable: true,
    },
  });

  setInterval(() => {
    hero.slideNext();
  }, 4000);
});
</script>


<template>
  <!-- Swiper Container -->
  <div class="swiper hero w-full h-[500px] relative">
    <!-- Slides Wrapper -->
    <div class="swiper-wrapper">
      <div
        v-for="(val, index) in slides"
        :key="index"
        class="swiper-slide relative h-[500px] w-full"
      >
        <img :src="val" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gray-800/60"></div>
        <div
          class="container absolute inset-0 mx-auto flex flex-col items-center justify-center gap-2 px-4 text-white"
        >
          <h2 class="text-4xl font-extrabold sm:text-4xl">ຄົ້ນຫາສິ່ງໃໝ່ໆ</h2>
          <p>
            ຍິນດີຕ້ອນຮັບສູ່ເວັບໄຊຂອງພວກເຮົາ! ພວກເຮົາແມ່ນນັກພັດທະນາເວັບແລະລະບົບ
            ທີ່ມີຄວາມຫົວໃຈໃນການສ້າງເຄື່ອງມືທີ່ຊ່ວຍໃຫ້ຊີວິດຂອງຄົນງ່າຍຂຶ້ນ.
            ບໍ່ວ່າຈະເປັນລະບົບຈັດການ, ແອັບພລິເຄຊັນ, ຫຼື API –
            ພວກເຮົາເຮັດໃຫ້ມັນເກີດຂຶ້ນໄດ້.
            ພວກເຮົາແມ່ນ Dev ຜູ້ຫຼັງການສ້າງລະບົບ ແລະ ແອັບພລິເຄຊັນທີ່ເຈົ້າໃຊ້. ເຮົາຮັບຟັງ, ອອກແບບ, ພັດທະນາ ແລະ ສົ່ງມອບດ້ວຍຫົວໃຈ.
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination Bullets -->
    <div
      class="swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-3"
    ></div>
  </div>
</template>
