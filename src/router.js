import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '',
            redirect: '/portfolio'
        },
        {
            path: '/neutec',
            component: () => import('@/views/neutec/index.vue'),
            children: [
                { 
                    path: '',
                    redirect: '/neutec/demo'
                },
                {
                    path: '/neutec/demo',
                    component: () => import('@/views/neutec/demo.vue')
                },
                {
                    path: '/neutec/advanced_demo',
                    component: () => import('@/views/neutec/advanced_demo.vue')
                },
                {
                    path: '/neutec/canvas_demo',
                    component: () => import('@/views/neutec/canvas_demo.vue')
                },
                {
                    path: '/neutec/composition_demo',
                    component: () => import('@/views/neutec/composition_demo.vue')
                },
            ]
        },
        {
            path: '/portfolio',
            component: () => import('@/views/portfolio/index.vue'),
            children: [
                { 
                    path: '',
                    redirect: '/portfolio/home'
                },
                {
                    path: '/portfolio/home',
                    component: () => import('@/views/portfolio/home.vue')
                }
            ]
        }
    ]
})
