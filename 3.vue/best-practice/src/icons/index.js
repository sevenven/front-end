import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 图标自动加载
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

Vue.component('svg-icon', SvgIcon)