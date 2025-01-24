// https://nuxt.com/docs/api/configuration/nuxt-config

if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
  process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
}

export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      name: 'nuxt-session',
      password: process.env.NUXT_AUTH_PASSWORD || '7001',
    },
  },
  nitro: {
    storage: {
      '.data:auth': { driver: 'fs', base: './.data/auth' },
    },
  },
})
