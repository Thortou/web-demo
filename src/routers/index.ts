import { createRouter, createWebHistory } from "vue-router";
import { departmentRoute } from "../modules/department/router";
import { websiteRoute } from "../modules/website/routers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: "/", // <-- add the leading slash!
        component: () => import("../components/layouts/WebsiteLayout.vue"),
        children: [
          ...websiteRoute
        ],
        // beforeEnter: roleGuard,
      },
    {
        path: "/admin", // <-- add the leading slash!
        name: 'admin',
        component: () => import("../components/layouts/Layout.vue"),
        children: [
          {
            path: "/admin",
            name: "deshboard",
            component: () => import("../components/HelloWorld.vue"),
            meta: {
              label: ["ໜ້າຫຼັກ"],
            },
          },
          ...departmentRoute,
        ],
        meta: {
          label: ["ຈັດການຜູ້ໃຊ້"],
        },
        // beforeEnter: roleGuard,
      },
  ]
});

export default router;
