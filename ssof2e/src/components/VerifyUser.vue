<template>
	<div>
		<v-card-text v-text="
        `為確保您的帳戶安全，Vue SSO必須驗證您的身分。請重新登入，以便繼續使用這項服務。`
      ">
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				class="mr-2"
				:to="{ name: 'KeyinPswd' }"
				v-text="`繼續`"
			>
			</v-btn>
		</v-card-actions>
	</div>
</template>

<script>
// 驗證身份
export default {
	name: 'VerifyUser',
	props: ['loading'],
	watch: {
		loading: {
			handler(newValue) {
				if (newValue) {
					setTimeout(() => {
						this.$emit('update:loading', false);
					}, 1000);
				} else {
					this.$refs.eleAccountId.focus();
				}
			},
			immediate: true,
		},
	},

}
</script>
