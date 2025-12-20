import {createRouter, createWebHistory} from 'vue-router'
import index from '../components/index.vue'
import java from "../components/java.vue";

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: '/java',
        name: 'java',
        component: java,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router