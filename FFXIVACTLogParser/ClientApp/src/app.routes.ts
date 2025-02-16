import { RouteRecordRaw } from "vue-router";
import { routes as ReportRoutes } from './components/report/report.routes';

export enum RouteNames {
    Home = 'home',
    Upload = 'upload',
    Report = 'report'
}

const RoutePathNames = {
    [RouteNames.Home]: '/',
    [RouteNames.Upload]: '/upload',
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
    ...ReportRoutes
];