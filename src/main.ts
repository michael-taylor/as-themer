import { createApp } from 'vue'

// Fonts
import 'unfonts.css'
import '@mdi/font/css/materialdesignicons.min.css'

// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'system',
    },
})

createApp(App).use(vuetify).mount('#app')
