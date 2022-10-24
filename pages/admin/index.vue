<template>
  <div>
    <h1 class="text-xl">ページ: <strong>admin/index</strong></h1>
    <div class="flex justify-center mt-4">
      <div v-if="data">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>名前</th>
              <th>Eメール</th>
              <th>権限</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item['name']">
              <th>{{ item['id'] }}</th>
              <td>{{ item['name'] }}</td>
              <td>{{ item['email'] }}</td>
              <td>{{ item['role'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="error">データ取得エラー: {{ fetchError }}</div>
	    <div v-else>データ取得中...</div>
    </div>
  </div>
</template>
<script setup lang="ts">
// データ取得
const { data, error } = await useFetch("/api/admin/users", {
  headers: useRequestHeaders(['cookie'])  // クッキーを付加しないとユーザ認証が通らない
})
let fetchError
if (error.value) fetchError = useState('error', () => error.value.toString())
</script>