import type { AuthSession } from '~~/auth/server/utils/session'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (nuxtApp.payload.error) {
    return {}
  }

  const { data: session, refresh: updateSession }
   = await useFetch<AuthSession>('/api/auth/session')

  const loggedIn = computed(() => !!session.value?.email)

  const redirectTo = useState('authRedirect')

  addRouteMiddleware(
    'auth',
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        redirectTo.value = to.path
        return '/login'
      }
    },
    { global: true },
  )

  const currentRoute = useRoute()

  if (import.meta.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo('/login')
      }
    })
  }

  if (loggedIn.value && currentRoute.path === '/login') {
    await navigateTo(redirectTo.value || '/')
  }

  return {
    provide: {
      auth: {
        loggedIn,
        session,
        redirectTo,
        updateSession,
      },
    },
  }
})
