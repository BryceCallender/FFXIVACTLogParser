import './assets/main.scss';
import './extensions/number-extensions';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './app.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import { definePreset } from '@primevue/themes';
import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './app.routes';

const presetTheme = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}'
      }
  },
});

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(pinia)
  .use(router)
  .use(ToastService)
  .use(PrimeVue, {
    // Default theme configuration
    theme: {
      preset: presetTheme,
      options: {
        darkModeSelector: true,
      }
    }
  })
  .mount('#app');
