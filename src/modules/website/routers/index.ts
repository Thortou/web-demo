// import { roleGuard } from "@/common/guards/role.guard";
// import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const websiteRoute: RouteRecordRaw[] = [

  {
    path: "/", // <-- add the leading slash!
    name: "home",
    component: () => import("../home/HomeIndex.vue"),
  },
  {
    path: "service", // <-- add the leading slash!
    name: "service",
    component: () => import("../services/ServiceIndex.vue"),
  },
  {
    path: "about", // <-- add the leading slash!
    name: "about",
    component: () => import("../abount/AboutIndex.vue"),
  },
];

