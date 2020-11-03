<template>
	<v-container class="fill-height">
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="8"
				md="4"
			>
				<v-card
					class="elevation-8"
					:loading="card.loading"
				>
					<div class="pt-12 pb-12 pl-6 pr-6">
						<v-img
							height="60"
							contain
							src="../assets/logo.png"
						></v-img>
						<v-card-title
							v-text="card.cardTitle"
							class="font-weight-black justify-center"
						></v-card-title>
						<v-card-subtitle
							v-if="!card.chipShow"
							v-text="card.cardSubTitle"
							class="font-weight-black text-center mt-0 pa-3"
							style="margin-bottom: 2px;"
						></v-card-subtitle>
						<v-row
							v-else
							justify="center"
							align="center"
						>
							<v-chip
								class="ma-2"
								outlined
								:to="{ name: 'KeyinUser' }"
							>
								<v-icon
									left
									color="grey darken-2"
									v-text="`mdi-account-circle`"
								></v-icon>
								{{ user.username }} - {{ user.accountId }}
								<v-icon
									right
									v-text="`mdi-chevron-down`"
								></v-icon>
							</v-chip>
						</v-row>
						<transition :name="transitionName">
							<router-view
								:username.sync="user.username"
								:account-id.sync="user.accountId"
								:password.sync="user.password"
								:remove-mode.sync="card.removeMode"
								:loading.sync="card.loading"
							></router-view>
						</transition>
						<v-overlay
							:absolute="card.overlay.absolute"
							:opacity="card.overlay.opacity"
							:value="card.loading"
							:color="card.overlay.color"
						>
						</v-overlay>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
//                         / 使用其他帳號
//           / 是 - 選擇帳號 - 移除帳號
//          /              \ 輸入密碼 - 導回頁面
// 是否登入過
//          \              / 輸入密碼 - 導回頁面
//           \ 否 - 輸入帳號 - 忘記密碼 - email驗證

export default {
	name: 'Login',
	props: ['accountId', 'username'],
	data() {
		return {
			card: {
				cardTitle: '',
				cardSubTitle: '',
				removeMode: false,
				chipShow: false,
				loading: false,
				overlay: {
					absolute: true,
					opacity: 0.3,
					color: '#FFF',
				},
			},
			user: {
				username: '',
				accountId: '',
				password: '',
			},
			transitionName: '',
		};
	},
	methods: {
		setCard(title, subTitle, chipShow) {
			this.card.cardTitle = title;
			this.card.cardSubTitle = subTitle;
			this.card.chipShow = chipShow;
		},
	},
	watch: {
		accountId: {
			handler(newValue) {
				if (newValue) {
					this.user.accountId = newValue;
				}
			},
			immediate: true,
		},
		username: {
			handler(newValue) {
				if (newValue) {
					this.user.username = newValue;
				}
			},
			immediate: true,
		},
		$route: {
			handler(to, from) {
				this.setCard('', '');
				switch (to.name) {
					case 'KeyinUser':
						this.setCard('登入', '使用您的 Vue SSO 帳戶');
						if (from && from.name === 'ChooseUser') {
							this.transitionName = 'slide-left';
						}
						break;
					case 'ChooseUser':
						this.setCard("選擇帳戶");
						break;
					case 'KeyinPswd':
						this.setCard('歡迎使用', '', true); //輸入密碼頁加上第3個參數
						if (this.user.accountId === '') {
							this.$router.push({ name: 'KeyinUser' });
						}
						this.setCard('歡迎使用', '', true);
						this.user.password = '';
						this.transitionName = 'slide-left';
						break;
					case 'VerifyUser':
						this.setCard('請驗證您的身分', this.user.accountId);
						break;
				}
			},
			immediate: true,// 監聽事件初始化時就觸發事件
		},
		'card.removeMode': {
			handler(newValue) {
				if (newValue) {
					this.setCard('移除帳戶', '從這個瀏覽器中移除');
				} else {
					this.setCard('選擇帳戶');
				}
			},
		},
	},
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition: 0.5s;
}
.slide-left-enter,
.slide-right-leave-to {
	opacity: 0;
	transform: translate(100%);
	position: absolute;
}
.slide-right-enter,
.slide-left-leave-to {
	opacity: 0;
	transform: translate(-100%);
	position: absolute;
}
</style>
