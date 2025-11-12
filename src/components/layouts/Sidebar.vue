<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  // BankOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
// import { GET_ROLES } from "@/common/utils/const";
// import { GET_PERMISSIONS } from "../../common/utils/const";
// import { checkPermissions } from "@/common/utils/check-permission.utils";
const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>([]);

const routeToKeyMap: Record<string, string> = {
  home: "1",
  department: "2",
};

watchEffect(() => {
  const routeName = route.name as string;
  selectedKeys.value = [routeToKeyMap[routeName] || "1"];
});

const pushRouter = (routeName: string) => {
  router.push({ name: routeName });
};
const goToRoute = async (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    class="sidebar-menu h-screen overflow-y-scroll scrollbar-hide"
  >
    <div class="flex items-center gap-3 px-4 py-4 min-w-0">
      <img
        src="/logo.png"
        alt="Logo"
        class="w-10 h-10 md:w-14 md:h-14 object-contain rounded"
      />
      <h1
        class="text-lg md:text-lg font-bold text-slate-700 hidden sm:block truncate"
      >
        TouMarket
      </h1>
    </div>
    <a-menu-item key="1" class="menu" @click="goToRoute('deshboard')">
      <home-outlined class="menu-icon" />
      <span>ໜ້າຫຼັກ</span>
    </a-menu-item>
    <a-menu-item key="7" class="menu" @click="pushRouter('department')">
      <shopping-cart-outlined class="menu-icon" />
      <span>department</span>
    </a-menu-item>
  </a-menu>
</template>


<style lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8125rem 0.5rem 0.8125rem 1rem;
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);

  img {
    width: 4rem;
    height: 4rem;
    margin-right: 0.8rem;
    margin-left: 0.25rem;
    object-fit: contain;
    border-radius: 5px;
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>