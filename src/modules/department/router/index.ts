// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const departmentRoute: RouteRecordRaw[] = [
  {
    path: "/admin/department", // <-- add the leading slash!
    name: "department",
    component: () => import("../views/DepartmentView.vue"),
    meta: {
      label: ["ຈັດການຜູ້ໃຊ້"],
    },
  },
];

