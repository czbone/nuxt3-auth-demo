export default defineNuxtRouteMiddleware((to, from) => {
	const isAdmin = useAdmin()

	// 管理権限なしで/adminにアクセスがあった場合はルートに遷移
	if ((to.name === 'admin' || !to.path.indexOf('/admin/')) && !isAdmin.value) {
		return navigateTo('/')
	}
})
