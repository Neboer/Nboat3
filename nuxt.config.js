import config from 'config'
import ConfigWebpackPlugin from 'config-webpack'
import axios from 'axios'
import url_join from 'url-join'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nboat3',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-clipboard',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: config.get('addr.name'),
    exclude: ['/create', '/edit_homepage', '/list', '/wall'],
    routes: async () => {
      return (await axios.get(url_join(config.get('addr.ssr_prefix'), '_seo'))).data
    }
  },
  serverMiddleware: {
    '/api': '~/backend'
  },
  axios: {
    baseURL: config.get('addr.ssr_prefix'),
    browserBaseURL: `${config.get('addr.name')}/api`
  },
  loading: false,
  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [new ConfigWebpackPlugin()]
  },
  moment: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn']
  },
  server: {
    port: config.get('addr.local_listen_port'),
    host: config.get('addr.local_listen_host')
  }
}
