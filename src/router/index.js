import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CalendarApp from "../views/About.vue";
import Timeline from "../views/Timeline.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/calendarapp",
    name: "CalendarApp",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CalendarApp
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
