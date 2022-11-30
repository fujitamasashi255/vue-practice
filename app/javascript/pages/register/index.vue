<template>
  <div>
    <h2>ユーザー登録</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form id="register-form" @submit.prevent="handleSubmit(onSubmit)">
        <div>
          <label for="name">ユーザー名</label>
          <ValidationProvider name="ユーザー名" rules="required" v-slot="{ errors }">
            <input id="name" type="text" v-model="user.name"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="email">メールアドレス</label>
          <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors }">
            <input id="email" type="email" v-model="user.email"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="password">パスワード</label>
          <ValidationProvider name="パスワード" rules="required" v-slot="{ errors }" vid="confirmation">
            <input id="password" type="password" v-model="user.password"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="password-confirmation">パスワード（確認）</label>
          <ValidationProvider name="パスワード（確認）" rules="required|min:3|confirmed:confirmation" v-slot="{ errors }">
            <input id="password-confirmation" type="password" v-model="user.password_confirmation"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: function(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['createUser']),
    onSubmit(){
      this.createUser(this.user)
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>