// https://nuxt.com/docs/api/configuration/nuxt-config
if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn(
    "Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!",
  );
  process.env.NUXT_AUTH_PASSWORD = "secretsecretsecretsecretsecretsecretsecret";
}

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },
  extends: ["./auth"],
});
