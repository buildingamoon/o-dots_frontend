import { messageReducer, messageReviver } from './utils/messagePayload';
import path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' }
    }
  },

  css: ['~/assets/css/style.css'],

  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', type: 'text/javascript', defer: true },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', type: 'text/javascript', defer: true },
    { src: '/path/to/script.js', type: 'text/javascript', defer: true },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js' }
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.APIBASE,
      stripePubishKey: process.env.STRIPE_PUBLISHABLE_KEY,
      stripeTestKey: process.env.STRIPE_TEST_KEY
    }
  },

  payload: {
    reducers: {
      Message: messageReducer,
    },
    revivers: {
      Message: messageReviver,
    }
  },

  modules: ['nuxt-emoji-picker'],
  
  render: {
    csp: {
      policies: {
        'default-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
        'img-src': ["'self'", "data:", "blob:", "*"],
        'media-src': ["'self'", "data:", "blob:", "*"],
        'trusted-types': ["'self'"],
      }
    }
  },

  build: {
    extend(config, ctx) {
      if (ctx.isServer) {
        config.target = 'node'
        config.output = {
          path: path.resolve(__dirname, '.output/server'),
          filename: 'index.mjs',
        };
      } else {
        config.output = {
          path: path.resolve(__dirname, '.output/public/_nuxt'),
        };
      }
    }
  },

  nitro: {
    output: {
      dir: '.output',
      publicDir: '.output/public',
      serverDir: '.output/server',
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        name: 'Home',
        component: resolve(__dirname, 'pages/index.vue'),
      });
      routes.push({
        path: '/users/signin',
        name: 'SignIn',
        component: resolve(__dirname, 'pages/users/signin.vue'),
      });
      routes.push({
        path: '/:catchAll(.*)*', // Catch-all route for undefined paths
        component: resolve(__dirname, 'pages/404.vue'),
      });
    },
  }
});
