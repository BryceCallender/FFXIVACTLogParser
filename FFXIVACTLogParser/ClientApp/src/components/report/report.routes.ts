import { RouteRecordRaw } from "vue-router";

export enum RouteNames {
    Default = 'report-default',
    Fight = 'report-fight'
}

const RoutePathNames = {
    [RouteNames.Default]: '/report/:key',
    [RouteNames.Fight]: '/report/:key/:fight'
}

export const routes: RouteRecordRaw[] = [
    {
        path: RoutePathNames[RouteNames.Default],
        name: RouteNames.Default,
        component: () => import('./report.vue'),
        props: route => ({ reportKey: route.params.key })
    } as RouteRecordRaw,
    {
        path: RoutePathNames[RouteNames.Fight],
        name: RouteNames.Fight,
        component: () => import('./module/fight/fight.vue'),
        props: route => ({ reportKey: route.params.key, fight: route.params.fight })
    } as RouteRecordRaw,
];