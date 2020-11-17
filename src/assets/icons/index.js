import Vue from 'vue'
import svgIcon from '@/components/svgIcon.vue';

const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);

Vue.component('svg-icon', svgIcon)//全局注册svg-icon组件