<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
import './assets/style/main.css'

export default {
	name: 'App',
	data: () => ({
		//
	}),
	watch: {
		$route: {
			handler() {
				const api = `${process.env.VUE_APP_APIPATH}/users/checkstatus`;
				this.$http({
					method: 'POST',
					url: api,
				})
					.then((response) => {
						if (response.data.success) {
							console.log('驗證成功');
						} else {
							console.log(response.data.message);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			immediate: true,
		},
	},
}
</script>
