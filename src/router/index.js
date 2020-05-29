import Vue from "vue";
import VueRouter from "vue-router";
import TodoApp from "../views/TodoApp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TodoApp",
    component: TodoApp,
    meta: {
      title: 'About Page - Example App',
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
