import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "notyf/notyf.min.css";
import './assets/main.css';

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router";

// Route Components
import MainPage from "./pages/MainPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Main",
            component: MainPage
        },
        {
            path: "/login",
            name: "Login",
            component: LoginPage
        },
        {
            path: "/profile",
            name: "Profile",
            component: ProfilePage
        }
    ]
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
