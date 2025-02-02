import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('./components/home/home.vue')
    } as RouteRecordRaw,
    {
        path: '/upload',
        component: () => import('./components/upload-logs/upload-logs.vue')
    },
    {
        path: '/report/:key',
        component: () => import('./components/report/report.vue'),
        props:  route => ({ reportKey: route.params.key })
    } as RouteRecordRaw
];