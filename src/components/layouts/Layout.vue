<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        background: '#fff',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }"
    >
      <SideBar />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <div
        :style="{
          position: 'fixed',
          top: 0,
          right: 0,
          left: collapsed ? '80px' : '200px',
          zIndex: 999,
          background: '#fff',
          transition: 'left 0.2s',
        }"
      >
        <Navbar @toggle-sidebar="() => (collapsed = !collapsed)" />
        <!-- <a-breadcrumb
          :style="{ 
            padding: '10px', 
            background: '#fff', 
            minHeight: '10px',
            borderBottom: '1px solid #f0f0f0'
          }"
        >
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
            :style="{ fontSize: '16px', fontWeight: '500' }"
          >
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb> -->
      </div>

      <a-layout-content
      class="rounded"
        :style="{
          margin: '10px 10px',
          padding: '20px',
          background: '#fff',
          minHeight: '280px',
          marginTop: '75px', // Adjust based on your navbar + breadcrumb height
        }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

const collapsed = ref(false);
const breadcrumbItems = ref<string[]>([]);
const route = useRoute();

function getBreadcrumbItems() {
  breadcrumbItems.value = [];
  route.matched.forEach((matched, idx) => {
    if (idx !== 0) {
      const labels = (matched.meta.label || []) as string[];
      labels.forEach((item) => {
        breadcrumbItems.value.push(item);
      });
    }
  });
}

// ✅ Watch route changes instead of using onBeforeRouteUpdate
watch(
  () => route.fullPath,
  () => {
    getBreadcrumbItems();
  },
  { immediate: true }
);
</script>

<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

// Additional styles for smooth transitions
.ant-layout-sider {
  transition: all 0.2s;
}

// Ensure content doesn't overlap with fixed elements
body {
  overflow-x: hidden;
}
</style>