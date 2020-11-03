<template>
	<div>
		<v-app-bar
			color="white"
			elevation="0"
		>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon v-text="`mdi-apps`"></v-icon>
			</v-btn>
			<v-btn
				class="ml-3"
				color="primary"
				small
				v-text="`登入`"
				v-if="!activeUser"
				@click="goToLogin"
			></v-btn>

			<v-menu
				offset-y
				origin="right top"
				transition="scale-transition"
				nudge-top="-10"
				v-else
				:close-on-content-click="false"
				max-width="300"
			>
				<template v-slot:activator="{ on }">
					<v-btn
						color="red lighten-1"
						icon
						v-on="on"
					>
						<v-icon
							large
							v-text="`mdi-account-circle`"
						></v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									class="text-center"
									v-text="activeUser.username"
								></v-list-item-title>
								<v-list-item-subtitle
									class="text-center"
									v-text="activeUser.accountId"
								></v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-expansion-panels
							focusable
							flat
						>
							<v-expansion-panel
								v-for="(item, index) in inactiveUsers"
								:key="`ExpansionPanel_${index}`"
							>
								<v-expansion-panel-header class="pt-0 pb-0 pl-0">
									<v-list-item>
										<v-list-item-avatar>
											<v-icon v-text="`mdi-account-circle-outline`"></v-icon>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title v-text="item.username"></v-list-item-title>
											<v-list-item-subtitle v-text="item.accountId"></v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div class="mt-4 text-center">
										<v-btn
											color="primary"
											v-text="`登入`"
											@click="goToVerifyUser(item.accountId, item.username)"
										></v-btn>
										<v-btn
											text
											outlined
											class="ml-4"
											v-text="`移除`"
											@click="removeUser(item.accountId)"
										></v-btn>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
						<v-list-item @click="goToLogin">
							<v-list-item-avatar>
								<v-icon
									style="transform: scaleX(-1);"
									color="grey darken-2"
									v-text="`mdi-account-plus-outline`"
								></v-icon>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-text="`新增其他帳戶`"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item class="justify-center">
							<v-btn
								text
								outlined
								v-text="`登出`"
								@click="goToLogout"
							></v-btn>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
		</v-app-bar>
	</div>
</template>
<script>
export default {
	name: 'Index',
	created() {
		this.getSigninTokens();
	},
	data() {
		return { users: [] };
	},
	methods: {
		goToLogin() {
			if (this.users.length > 0) {
				this.$router.push({ name: 'ChooseUser' });
			} else {
				this.$router.push({ name: 'KeyinUser' });
			}
		},
		goToLogout() {
			// const api = `${process.env.VUE_APP_APIPATH}/users/signout`;
			// this.$http({
			//   method: "POST",
			//   url: api,
			// })
			//   .then((response) => {
			//     if (response.data.success) {
			//       this.getSigninTokens();
			//       console.log("登出成功");
			//     }
			//   })
			//   .catch((error) => {
			//     console.log(error);
			//   });
		},
		goToVerifyUser(accountId, username) {
			this.$router.push({ name: "VerifyUser", query: { accountId, username } });
		},
		removeUser(accountId) {
			console.log(accountId);
			// const api = `${process.env.VUE_APP_APIPATH}/users/signintokens/${accountId}`;
			// this.$http({
			//   method: "PUT",
			//   url: api,
			// })
			//   .then((response) => {
			//     if (response.data.success) {
			//       this.getSigninTokens();
			//       console.log("帳戶移除成功");
			//     }
			//   })
			//   .catch((error) => {
			//     console.log(error);
			//   });
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
	},
	computed: {
		inactiveUsers() {
			return this.users.filter(function (item) {
				return item.active === false;
			});
		},
		activeUser() {
			return this.users.find(function (item) {
				return item.active === true;
			});
		},
	},
};
</script>
