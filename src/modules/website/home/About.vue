<script setup lang="ts">
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { onMounted, ref, nextTick } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = ref<string[]>([]);
const image = ["/ai1.jpeg", "/ai2.jpeg"];
const images = [
  "/education1.jpeg",
  "/education2.jpeg",
  "/education3.jpeg",
  "/education4.jpeg",
]; 
const items = [
  "ເພື່ອພັດທະນາຄວາມຮູ້ ແລະ ທັກສະ",
  "ເພື່ອສ້າງຄົນດີ ແລະ ຄົນມີປັນຍາໃນສັງຄົມ",
  "ພັດທະນາເສດຖະກິດ ແລະ ປະເທດ",
  "ສ້າງຄວາມເທົ່າເທັມ ໃນການໄດ້ຮັບໂອກາດ",
];
const items2 = [
  "ພັດທະນາຄວາມຄິດວິເຄາະ",
  "ສ້າງໂອກາດໃນການທຳວຽກ",
  "ເພີ່ມຄຸນຄ່າຂອງຊີວິດ ສ້າງສັງຄົມທີ່ເຂົ້າໃຈ ແລະ ສົນທະນາກັນໄດ້",
];
const ai = [
  "ຕັ້ງເປົ້າໝາຍຊັດເຈນ: ເຊັ່ນ ໃຊ້ AI ຊ່ວຍຂຽນ, ແປ, ວາງແຜນ",
  "ໃສ່ຄຳສັ່ງທີ່ຊັດເຈນ: ຢ່າງເຊັ່ນ: 'ຂຽນບົດຄວາມກ່ຽວກັບການສຶກສາ 500 ຄໍາ' ",
  "ທົດລອງ ແລະ ປັບປຸງ: ສອບຜົນທີ່ໄດ້ ແລ້ວປັບປຸງຄຳສັ່ງ",
  "ສອບທານຄວາມແມ່ນຍຳ: ບາງເທື່ອ AI ກໍ່ຜິດພາດໄດ້",
];
onMounted(async () => {
  slides.value = image;

  await nextTick(); // ✅ Wait until DOM is rendered

  const aiSlider = new Swiper(".aiSlider", {
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
    aiSlider.slideNext();
  }, 4000);
});
</script>

<template>
  <div class="about p-4 mt-4">
    <div class="title">
      <h4 class="font-bold text-lg mb-4">ການສຶກສາສິ່ງໃໝ່</h4>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Text Section -->
        <div class="md:w-1/2">
          <p class="text-justify text-gray-600">
            ແມ່ນການຮຽນຮູ້ ແລະ ການຖ່າຍທອດຄວາມຮູ້, ທັກສະ, ຄ່ານິຍົມ ແລະ ທັດສະນະຄຕິ
            ໃຫ້ແກ່ຄົນອື່ນ. ຂໍ້ມູນເຫຼົ່ານີ້ຖືກຂະຫຍາຍຜ່ານການຮຽນຮູ້, ການສອນ ແລະ
            ການຄົ້ນຄວ້າ.
          </p>
          <div class="propose mt-2">
            <h4 class="mb-2 font-bold">ຈຸດປະສົງການສຶກສາ</h4>
            <div v-for="text in items" :key="text">
              <p class="text-gray-600">. {{ text }}</p>
            </div>
          </div>
          <div class="propose mt-2">
            <h4 class="mb-2 font-bold">ຄຸນປະໂຫຍດຂອງການສຶກສາ</h4>
            <div v-for="text in items2" :key="text">
              <p class="text-gray-600">. {{ text }}</p>
            </div>
          </div>
        </div>

        <!-- Image Grid Section -->
        <div class="md:w-1/2 grid grid-cols-2 gap-4">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            alt="Education image"
            class="w-full h-40 object-cover rounded shadow"
          />
        </div>
      </div>
    </div>
    <div class="use-ai p-4">
      <h4 class="text-lg font-bold">
        ແນວທາງການນຳໃຊ້ AI (Artificial Intelligence - ປັນຍາປະດິດ)
      </h4>

      <div class="description mt-4 flex flex-col md:flex-row gap-6">
        <!-- Image Section -->
        <div
          class="image-ai swiper aiSlider relative w-full md:w-[40rem] h-60 md:h-[20rem] ring bg-gray-100 rounded"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(val, index) in slides"
              :key="index"
              class="swiper-slide relative h-[500px] w-full"
            >
            <img :src="val" class="h-full w-full object-cover" />
          </div>
          </div>
        </div>

        <!-- Detail Section -->
        <div class="detail w-full">
          <p class="text-gray-600 mt-2">
            ການສ້າງເຄື່ອງຈັກ ຫຼື ຊອບແວ ໃຫ້ສາມາດຄິດ, ຮຽນ, ຕັດສິນໃຈ ແລະ
            ເຮັດວຽກໄດ້ແບບຄົນ. ຕົວຢ່າງ: ChatGPT, Siri, Google Assistant,
            ລະບົບແນະນໍາ YouTube, Facebook, TikTok
          </p>

          <h4 class="mt-4 font-semibold">💡 ຄວາມສຳຄັນຂອງ AI:</h4>
          <div v-for="(data, index) in ai" :key="index" class="how-to mt-1">
            <p class="text-gray-600">{{ index + 1 }}. {{ data }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- Pagination Bullets -->
   <div
      class="swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-3"
    ></div>
</template>
