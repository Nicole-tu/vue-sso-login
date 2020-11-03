<template>
	<v-form
		ref="form"
		@submit.prevent
	>
		<v-card-text>
			<v-text-field
				ref="elePassword"
				label="輸入您的密碼"
				:type="showpswd ? 'text' : 'password'"
				class="font-weight-bold"
				outlined
				clearable
				:rules="passwordRules"
				:counter="passwordLength"
				:append-icon="showpswd ? 'mdi-eye' : 'mdi-eye-off'"
				v-model="myPassword"
				@click:append="showpswd = !showpswd"
				@keyup="setTextFieldError(true, '')"
				@keyup.enter.prevent="verifyPswd"
			></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				class="mr-2"
				v-text="`繼續`"
				@click="verifyPswd"
			></v-btn>
		</v-card-actions>
	</v-form>
</template>

<script>
// 輸入密碼
export default {
	name: 'KeyinPswd',
	props: ['password', 'accountId', 'loading'],
	data() {
		return {
			textFieldError: true,
			errorMessages: "",
			passwordLength: 15,
			showpswd: false,
			passwordRules: [(v) => !!v || '請輸入密碼', () => this.textFieldError || this.errorMessages,],
			fakedata: {
				password: 'aa9876',
			},
		};
	},
	computed: {
		myPassword: {
			get() {
				return this.password;
			},
			set(value) {
				this.$emit('update:password', value);
			},
		},
	},
	watch: {
		loading: {
			handler(newValue) {
				if (newValue) {
					setTimeout(() => {
						this.$emit("update:loading", false);
					}, 1000);
				} else {
					this.$refs.elePassword.focus();
				}
			},
			immediate: true,
		},
	},
	methods: {
		verifyPswd() {
			if (this.$refs.form.validate()) {
				if (this.myPassword === this.fakedata.password) {
					this.$router.push({ name: 'Index' });
				} else {
					this.setTextFieldError(false, '密碼錯誤');
				}
			}
		},
		setTextFieldError(textFieldError, errorMessages) {
			this.textFieldError = textFieldError;
			this.errorMessages = errorMessages;
		},
	},
}
</script>
