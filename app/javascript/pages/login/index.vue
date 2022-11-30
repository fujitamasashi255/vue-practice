<template>
  <div>
    <h2>ログイン</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form id="login-form" @submit.prevent="handleSubmit(onSubmit)">
        <div>
          <label for="email">メールアドレス</label>
          <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors }">
            <input id="email" type="email" v-model="user.email"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="password">パスワード</label>
          <ValidationProvider name="パスワード" rules="required|min:3" v-slot="{ errors }">
            <input id="password" type="password" v-model="user.password"/>
            <span class="error-message">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <button type="submit">ログイン</button>
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
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['login']),
    onSubmit(){
      this.login(this.user)
    },
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>