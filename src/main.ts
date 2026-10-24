import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(PrimeVue, {
    license: 'eyJpZCI6IjM4MTM1Mjg1LTBjNGEtNDZlMS1iMDE5LTFmY2UxNTU4MjYzYSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTI4NDEwNDUsImV4cCI6MTgyNDM3NzA0NX0.QiHTNABg1-bwhaBOwMlaGR8AoE4E1fuc_Urxf1Z4c77cZFPopNm9rm7GiIV2tCWiZ5H3xsQud4p4NMFahS9GAQ',
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
});
app.use(ConfirmationService);

app.mount('#app');