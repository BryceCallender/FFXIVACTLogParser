import './assets/main.css';

import { createApp } from 'vue';
import App from './app.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createApp(App)
  .use(PrimeVue, {
    // Default theme configuration
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: true,
      }
    }
  })
  .mount('#app');
