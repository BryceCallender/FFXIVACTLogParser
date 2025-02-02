/// <reference types="@vue-macros/reactivity-transform/macros-global" />
/// <reference types="@vue-macros/define-models/macros-global" />
/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'primevue/*' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}