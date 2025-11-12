import { defineStore } from "pinia";
import { container } from "tsyringe";
import { DepartmentServices } from "../services/department.service";
import { reactive, ref } from "vue";
import type { IGPaginate, IGPaginated } from "../../../common/paginated.interface";
import type { DepartmentEntity, DepartmentFilterType } from "../entity/department.entity";
import type { IGState } from "../../../common/state.interface";

export const DepartmentStore = defineStore("department-store", () => {
  const service = container.resolve<DepartmentServices>(DepartmentServices);

  const state = reactive<IGState<IGPaginated<DepartmentEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<IGPaginate<Pick<DepartmentEntity, DepartmentFilterType>>>({
    page: 1,
    limit: 10,
    filter: {},
  });
  const singleDepartment = ref<DepartmentEntity | null>(null); 
  async function getAll() {
    state.isLoading = true;
    const results = await service.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results.status === "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
    }

    state.isLoading = false;
  }

  async function getOne(id: string) {
    state.isLoading = true;
    const result = await service.getOne(id);
    if (result && result.status === "success") {
      singleDepartment.value = result.data || null;
      
    } else {
      singleDepartment.value = null;
    }
    state.isLoading = false;
  }

  async function removed(id: string) {
    state.btnLoading = true;
     await service.deleted(id);

      await getAll(); // Refresh list after deletion
    // if (result && result.status === "success") {
    // }

    state.btnLoading = false;
  }
  async function created(input: DepartmentEntity) {
    state.btnLoading = true;
     await service.created(input);

      await getAll(); 
    state.btnLoading = false;
  }
  async function updated(id:string, input: DepartmentEntity) {
    state.btnLoading = true;
     await service.updated(id, input);

      await getAll(); 
    state.btnLoading = false;
  }

  return {
    getAll,
    removed,
    state,
    setStateFilter,
    getOne,
    singleDepartment, created, updated
  };
});
