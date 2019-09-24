require('dotenv').config();
const GOOGLE_API_CONFIG = require('./plugins/google-api/config');

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Todo Calendar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },

  /*
  ** Build configuration
  */
  buildModules: ['@nuxt/typescript-build'],

  plugins: [
    '@/plugins/google-api',
  ],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  auth: {
    strategies: {
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        scope: [
          'openid',
          'profile',
          'email',
          ...GOOGLE_API_CONFIG.SCOPES,
        ],
      },
    }
  },
};
