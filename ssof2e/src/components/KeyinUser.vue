<template>
	<v-form
		ref="form"
		@submit.prevent
	>
		<v-card-text>
			<v-text-field
				ref="eleAccountId"
				label="輸入您的帳號"
				type="text"
				class="font-weight-bold"
				outlined
				clearable
				v-model="myAccountId"
				:rules="usernameRules"
				:counter="usernameLength"
				@keyup.enter.prevent="setTextFieldError(true, '')"
			></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				class="mr-2"
				v-text="`繼續`"
				@click="verifyUser"
			>
			</v-btn>
		</v-card-actions>
	</v-form>
</template>

<script>
// 輸入帳號
export default {
	name: 'KeyinUser',
	props: ['accountId', 'loading'],
	data() {
		return {
			textFieldError: true,
			errorMessages: '',
			usernameLength: 10,
			usernameRules: [
				(v) => !!v || '請輸入帳號',
				(v) => (v && v.length <= this.usernameLength) || '最多10碼',
				() => this.textFieldError || this.errorMessages,
			],
			fakedata: {
				accountId: 'aa1234', //假帳號
				username: 'Maëlyne Roux', //假姓名
			},
		};
	},
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
	computed: {
		myAccountId: {
			get() {
				return this.accountId;
			},
			set(value) {
				this.$emit('update:accountId', value);
			},
		},
	},
	methods: {
		verifyUser() {
			if (this.$refs.form.validate()) {
				const api = `${process.env.VUE_APP_APIPATH}/users/accountid/${this.myAccountId}`;
				this.$http({
					method: "GET",
					url: api,
				})
					.then((response) => {
						if (response.data.success) {
							this.$emit("update:username", response.data.username);
							this.$router.replace({ name: "KeyinPswd" });
						} else {
							this.setTextFieldError(false, response.data.message);
							this.$refs.form.validate();
						}
					})
					.catch((error) => {
						this.setTextFieldError(false, error);
						this.$refs.form.validate();
					});
			}
		},
		setTextFieldError(textFieldError, errorMessages) {
			this.textFieldError = textFieldError;
			this.errorMessages = errorMessages;
		},
	}
}
</script>
