import { RouteRecordRaw } from "vue-router";

export enum RouteNames {
    Home = 'home',
    Upload = 'upload',
    Report = 'report'
}

const RoutePathNames = {
    [RouteNames.Home]: '/',
    [RouteNames.Upload]: '/upload',
    [RouteNames.Report]: '/report/:key'
}

export const routes: RouteRecordRaw[] = [
    {
        path: RoutePathNames[RouteNames.Home],
        name: RouteNames.Home,
        component: () => import('./components/home/home.vue')
    } as RouteRecordRaw,
    {
        path: RoutePathNames[RouteNames.Upload],
        name: RouteNames.Upload,
        component: () => import('./components/upload-logs/upload-logs.vue')
    },
    {
        path: RoutePathNames[RouteNames.Report],
        name: RouteNames.Report,
        component: () => import('./components/report/report.vue'),
        props:  route => ({ reportKey: route.params.key })
    } as RouteRecordRaw
];