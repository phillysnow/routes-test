const pkg = require('./package')
const Prismic = require('prismic-javascript')
const PrismicConfig = require('./prismic.config')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ],
    script: [
      { innerHTML: '{ window.prismic = { endpoint: "' + PrismicConfig.apiEndpoint + '"} }' },
      { src: '//static.cdn.prismic.io/prismic.min.js' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/link-resolver.js',
    '~/plugins/html-serializer.js',
    '~/plugins/prismic-vue.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  generate: {
    // fallback: true,
    routes: async function() {
      const routes = []
      await Prismic.getApi(PrismicConfig.apiEndpoint)
        .then(function(api) {
          return api.query('', { pageSize: 100 }) // An empty query will return all the documents
        })
        .then(response => {
          // response is the response object, response.results holds the documents
          response.results.map(doc => {
            let url = ''
            if (doc.type == 'homepage') {
              url = `/`
            } else if (doc.type == 'page') {
              url = `/${doc.type.replace('_', '/')}/${doc.uid}`
            } else {
              url = '/'
            }
            routes.push(url)
          })
        })
      
      routes.push({ route: '/preview' })
      
      return routes
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
