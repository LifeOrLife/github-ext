import { createApp } from "vue"
import Background from './Background.vue'

const con = document.createElement('div')
createApp(Background).mount(con)

document.body.appendChild(con)
console.log(23333)