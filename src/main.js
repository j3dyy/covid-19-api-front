import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createI18n } from 'vue-i18n'
import messages from './localization/messages.json'
import router from "./router.js";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import setupInterceptors from "./services/setupInterceptors.js";

let app  = createApp(App)

setupInterceptors(store)

const i18n = createI18n({
    locale: 'ka',
    fallbackLocale: 'en',
    messages,
})

library.add(fas)

app
    .use(router)
    .use(store)
    .use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

