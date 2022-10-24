import type { Ref } from 'vue'
export const signinDialogOpen = (showDialog: Ref<boolean>) => () => showDialog.value = true
export const signinDialogClose = (showDialog: Ref<boolean>) => () => showDialog.value = false
export const signinDialogToggle = (showDialog: Ref<boolean>) => () => showDialog.value = !showDialog.value

export const useSigninDialog = () => {
  // コンポーネント間で値を共有
  const showDialog = useState('showDialog', () => (false))

  return {
    isOpen: readonly(showDialog),
    open: signinDialogOpen(showDialog),
    close: signinDialogClose(showDialog),
    toggle: signinDialogToggle(showDialog),
  }
}