<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { DepartmentStore } from "../store";
import { columns } from "./columns";
import DepartmentModal from "../components/DepartmentModal.vue";
import type { DepartmentEntity } from "../entity/department.entity";
const createModal = ref()
const updateModal = ref()
const router = useRouter();
const { getAll, state, setStateFilter , removed, getOne, singleDepartment } = DepartmentStore();

//open create modal
// openModalCreate now calls the `show` method of the modal
const openModalCreate = () => {
  createModal.value?.show(false); // false = not edit mode
};
  
const openModalUpdate = async (id: string) => {
  // console.log('data:', singleDepartment);
  // await nextTick();
  // // You can either fetch data from API or use existing state
  // await getOne(id)
  if (id) {
    createModal.value?.show(true, id); // true = edit mode
  }
};
 
const page = ref(1);
const pageSize = ref(8);
const search = ref("");

// When table pagination/search changes
const handleTableChange = async (pagination: any) => {
  page.value = pagination.current;
  setStateFilter.page = page.value;
  setStateFilter.limit = pagination.pageSize;
  await getAll();
};

// On search (triggered on enter or button click)
const onSearch = async () => {
  setStateFilter.page = 1;
  setStateFilter.filter = {
    name: search.value || undefined,
  };
  page.value = 1;
  await getAll();
};
onMounted(async () => {
  setStateFilter.page = page.value;
  setStateFilter.limit = pageSize.value;
  await getAll();
});
</script>

<template>
  <div class="p-0">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Departments</h2>
    </div>

    <div class="mb-4 flex gap-2">
      <a-input
        v-model:value="search"
        placeholder="Search by name"
        style="width: 300px"
        allow-clear
        @change="onSearch"
      />
      <a-button type="default" @click="onSearch">Search</a-button>
      <a-button type="default" @click="openModalCreate">
        Add Department
      </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="state.data.props"
      :loading="state.isLoading"
      :pagination="{
        current: page,
        pageSize: pageSize,
        total: state.data.total,
      }"
      rowKey="id"
      bordered
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'actions'">
          <div class="flex gap-2 justify-center">
            <a-button class="text-orange-500" @click="openModalUpdate(record.id)"> edit </a-button>
            <a-button class="text-red-600" @click="removed(record.id)"> delete </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <DepartmentModal ref="createModal"/>
  <DepartmentModal ref="updateModal"/>
</template>

<style scoped lang="scss">
/* Optional styles */
</style>
