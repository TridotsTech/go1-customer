import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
  FeatherIcon,
} from 'frappe-ui'

let globalComponents = {
  Button,
  // TextInput,
  // Input,
  // FormControl,
  // ErrorMessage,
  // Dialog,
  // Alert,
  // Badge,
  FeatherIcon,
}

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
for (let key in globalComponents) {
  app.component(key, globalComponents[key])
}

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')
