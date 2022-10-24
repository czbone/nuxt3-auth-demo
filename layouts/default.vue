<template>
<div>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl">名称未設定</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li :class="{'font-bold': route.name == 'index'}"><a href="/">ホーム</a></li>
        <li :class="{'font-bold': route.name == 'admin'}"><a href="/admin">管理画面</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a v-if="user" class="btn" @click="signout">サインアウト</a>
      <a v-else class="btn" @click="signin">サインイン</a>
    </div>
  </div>
  <div class="container mx-auto p-6">
    <slot />
  </div>
</div>
</template>
<script setup lang="ts">
const user = useAuthUser()
const route = useRoute()
</script>
<script lang="ts">
export default {
  methods: {
    signin () {
      const { open } = useSigninDialog()
      open()
    },
    async signout () {
      const { logout } = useAuth()

      await logout()
      await navigateTo('/')
    },
  },
}
</script>