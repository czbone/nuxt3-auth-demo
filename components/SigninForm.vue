<template>
  <div class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" :class="{ 'modal-open': isOpen }"
    tabindex="-1" aria-labelledby="signinDialogLabel" aria-hidden="true">
    <div class="modal-dialog relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 id="signinDialogLabel" class="text-xl font-medium leading-normal text-gray-800">サインイン</h5>
        </div>
        <Form v-slot="{ errors }" :validation-schema="schema" @submit="validate">
          <div class="modal-body relative p-4">
            <div v-if="errorMessage" class="alert alert-error shadow-lg mb-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{ errorMessage }}</span>
            </div>
            <!-- Email input -->
            <div class="mb-6">
              <Field v-model="form.email" name="email" type="text" placeholder="Eメール" class="input input-bordered rounded-lg w-full max-w-xs" />
              <small class="block mt-1 text-xs text-red-600">{{ errors.email }}</small>
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <Field v-model="form.password" name="password" placeholder="パスワード" class="input input-bordered rounded-lg w-full max-w-xs"
              :type="showPassword ? 'text' : 'password'" />
              <small class="block mt-1 text-xs text-red-600">{{ errors.password }}</small>
            </div>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="submit"
              class="btn px-7 py-3 ml-3 rounded-lg"
              :disabled="loading">
              サインイン
            </button>
            <button
              type="button"
              class="btn btn-ghost px-7 py-3 ml-3 rounded-lg"
              :disabled="loading"
              data-bs-dismiss="modal"
              @click="closeDialog">
              キャンセル
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { configure, Field, Form } from 'vee-validate';
import * as Yup from 'yup';

const emit = defineEmits(['success'])
const { login } = useAuth()
const { isOpen, close } = useSigninDialog()
let loading = false
let errorMessage = ''
let showPassword = false  // パスワード表示切り替え用
let form = {
              email: '',
              password: '',
            }

const onSignin = async () => {
  try {
    errorMessage = ''
    loading = true

    // ログイン処理
    // 認証失敗(レスポンスコード200以外)の場合は例外を発生し、catch側へ遷移
    await login(form.email, form.password, false)

    // ダイアログ閉じる
    close()

    // ログイン後の画面へ遷移
    emit('success')
  } catch (error: any) {
    errorMessage = '認証に失敗しました'
  } finally {
    loading = false
  }
}

const validate = async () => {
  loading = true
  await onSignin()
  loading = false
}

const closeDialog = () => {
  close()
}

// バリデーション実行のトリガーを設定
configure({
  validateOnBlur: true, // blurイベントで検証をトリガーする必要がある場合、デフォルトはtrue
  validateOnChange: true, // changeイベントで検証をトリガーする必要がある場合、デフォルトはtrue
  validateOnInput: true, // inputイベントで検証をトリガーする必要がある場合、デフォルトはfalse
  validateOnModelUpdate: true, // update:modelValue（v-model）イベントで検証をトリガーする必要がある場合、デフォルトはtrue
})

const schema = Yup.object().shape({
  email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
  password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
})

// Eventリスナーの登録
onMounted(() => {
  // ESCキーでダイアログを閉じる
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27) {
      close()
    }
  })
})

</script>