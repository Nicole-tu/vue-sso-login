<template>
	<div>
		<v-card-text>
			<template v-for="(item, index) in users">
				<v-list-item :key="`account_${item.accountId}`">
					<v-list-item-avatar>
						<v-icon
							class="grey lighten-1 white--text"
							v-text="`mdi-account`"
						></v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title
							class="font-weight-black"
							v-text="`${item.username}`"
						></v-list-item-title>
						<v-list-item-subtitle v-text="`${item.accountId}`"></v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-icon v-if="removeMode">
						<v-icon
							color="red"
							v-text="`mdi-minus-circle-outline`"
						></v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-divider :key="`d${index}`"></v-divider>
			</template>
			<v-list-item to="KeyinUser">
				<v-list-item-avatar>
					<v-icon
						color="gray"
						v-text="`mdi-account-circle-outline`"
					> </v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="`使用其他帳戶`"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item
				v-if="!removeMode"
				@click="() => this.$emit('update:removeMode', true)"
			>
				<v-list-item-avatar>
					<v-icon
						color="gray"
						style="transform: scaleX(-1);"
						v-text="`mdi-account-minus-outline`"
					>
					</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="`移除帳戶`"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider v-if="!removeMode"></v-divider>
			<v-card-actions>
				<v-btn
					color="primary"
					class="mt-4"
					text
					v-if="removeMode"
					v-text="`完成`"
					@click="() => this.$emit('update:removeMode', false)"
				>
				</v-btn>
			</v-card-actions>
		</v-card-text>
		<v-dialog
			v-model="dialogShow"
			max-width="320"
		>
			<v-card>
				<v-card-title v-text="`要移除帳戶嗎?`"></v-card-title>
				<v-card-text v-text="`你將無法繼續在這個瀏覽器中使用 ${clickUsername} - ${clickAccountId} 存取各項 Vue SSO 服務。請在你準備好再次使用帳戶時登入。`">
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						text
						@click="dialogShow = false"
						v-text="`取消`"
					></v-btn>
					<v-btn
						color="primary"
						text
						@click="removeUser"
						v-text="`是, 我要移除`"
					></v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
// 選擇帳號
export default {
	name: 'ChooseUser',
	props: ['removeMode', 'loading'],
	created() {
		this.getSigninTokens();
	},
	data() {
		return {
			dialogShow: false,
			clickAccountId: '',
			clickUsername: '',
			users: [],
		};
	},
	watch: {
		loading: {
			handler(newValue) {
				if (newValue) {
					setTimeout(() => {
						this.$emit('update:loading', false);
					}, 500);
				} else {
					this.$refs.eleAccountId.focus();
				}
			},
			immediate: true,
		},
	},
	methods: {
		confirmRemove(accountId, username) {
			this.clickAccountId = accountId;
			this.clickUsername = username;
			this.dialogShow = true;
		},
		getSigninTokens() {
			// const api = `${process.env.VUE_APP_APIPATH}/users/signintokens`;
			// this.$http({
			//   method: "GET",
			//   url: api,
			// })
			//   .then((response) => {
			//     if (response.data.success) {
			//       this.users = response.data.users;
			//     }
			//   })
			//   .catch((error) => {
			//     console.log(error);
			//   });
		},
		goToKeyinPswd(accountId, username) {
			this.$router.push({ name: 'KeyinPswd', query: { accountId, username } });
		},
		removeUser(accountId) {
			console.log('remove', accountId)
			// const api = `${process.env.VUE_APP_APIPATH}/users/signintokens/${this.clickAccountId}`;
			// this.$http({
			//   method: "PUT",
			//   url: api,
			// })
			//   .then((response) => {
			//     if (response.data.success) {
			//       this.getSigninTokens();
			//       this.dialogShow = false;
			//       console.log('帳戶移除成功');
			//     }
			//   })
			//   .catch((error) => {
			//     console.log(error);
			//   });
		},
	},
}
</script>
