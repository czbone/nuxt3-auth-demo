<template>
  <div>
    <h1 class="text-xl">ページ: <strong>index</strong></h1>
    <div class="flex justify-center mt-4">
      <div v-if="currentUser" >
        <h2 class="text-xl"><strong>{{ currentUser.name }}({{ currentUser.email }})</strong> サインイン中</h2>
      </div>
      <div v-else >
        <div class="max-w-sm rounded overflow-hidden border border-gray-200">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">サインイン情報</div>
            <dl class="flex flex-wrap">
              <dt class="w-[25%]">ユーザ: </dt><dd class="w-[75%]"><strong>admin@example.com</strong></dd>
              <dt class="w-[25%]">パスワード: </dt><dd class="w-[75%]"><strong>password</strong></dd>
            </dl>
            <dl class="flex flex-wrap mt-2">
              <dt class="w-[25%]">ユーザ: </dt><dd class="w-[75%]"><strong>user@example.com</strong></dd>
              <dt class="w-[25%]">パスワード: </dt><dd class="w-[75%]"><strong>password</strong></dd>
            </dl>
          </div>
        </div>
      </div>
      <SigninForm @success="onSigninSuccess" />
    </div>
  </div>
</template>
<script setup lang="ts">
const currentUser = useAuthUser()
const isAdmin = useAdmin()

async function onSigninSuccess() {
  const redirect = isAdmin.value ? '/admin' : '/'
  location.href = redirect
}
</script>
