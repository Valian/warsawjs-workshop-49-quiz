import { createApp } from 'vue'
import store from './store'
import router from './router';
import App from './App.vue'
import Loading from './components/Loading.vue'
import {currencyFilter, loadingMixin} from './utils'
import 'font-awesome/fonts/fontawesome-webfont.woff2';

const app = createApp(App)

app.use(store)
app.use(router)
app.mixin(loadingMixin)
app.component('o-loading', Loading)

app.config.globalProperties.$filters = {currency: currencyFilter}

app.mount('#app')
